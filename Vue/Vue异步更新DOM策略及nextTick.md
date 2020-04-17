# Vue异步更新DOM策略及nextTick

有这样一个需求，通过ref来获取<div></div>的文本值

框框开始一顿敲如下
```
<div id="app">
	<div>
	    <div ref="text">{{ msg }}</div>
	    <button @click="handleClick">改变值</button>
	</div>
</div>
<script type="text/javascript">
	const app=new Vue({
	  el: '#app',
	  data(){
	  	return{
	  		msg: '初始值'
	  	}
	  },
	  methods:{
	  	handleClick(){
	  		this.msg = '开始赋值'
	  		console.log(this.$refs.text.innerText)
	  	}
	  }
	});
</script>
```
写好代码开始执行，发现控制台输出的是【初始值】而非【开始赋值】，蛋蛋的忧伤~~~~
然鹅百般不得不得其解？？？？
回头查看了了Vue————API文档  **Vue 在更新 DOM 时是异步执行的**，Vue在监听到数据变化时就会开启一个队列任务[Vue异步更新Dom][1]
 还是读的不清不楚的，没太明白？？？ 
 

> 翻了下Vue源码发现watch的实现，有某个数属性值发生变化时，它的setter函数会通知Dep事件，然后Dep会去调用它管理的所有watch对象，从而触发watch的update更新

```
//update方法
update () {
    /* istanbul ignore else */
    if (this.lazy) {
        this.dirty = true
    } else if (this.sync) {
        /*同步则执行run直接渲染视图*/
        this.run()
    } else {
        /*异步推送到观察者队列中，下一个tick时调用。*/
        queueWatcher(this)
    }
}
```
queueWatcher()

```
 /*将一个观察者对象push进观察者队列，在队列中已经存在相同的id则该观察者对象将被跳过，除非它是在队列被刷新时推送*/
export function queueWatcher (watcher: Watcher) {
  /*获取watcher的id*/
  const id = watcher.id
  /*检验id是否存在，已经存在则直接跳过，不存在则标记哈希表has，用于下次检验*/
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      /*如果没有flush掉，直接push到队列中即可*/
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i >= 0 && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
```
queueWatcher的源码我们发现，Watch对象并不是立即更新视图，而是被push进了一个队列queue，此时状态处于waiting的状态，这时候会继续会有Watch对象被push进这个队列queue，等到下一个tick运行时，这些Watch对象才会被遍历取出，更新视图

nextTick函数

```
/**
 * Defer a task to execute it asynchronously.
 */
export const nextTick = (function () {
  const callbacks = []
  let pending = false
  let timerFunc

  function nextTickHandler () {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve()
    var logError = err => { console.error(err) }
    timerFunc = () => {
      p.then(nextTickHandler).catch(logError)
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) setTimeout(noop)
    }
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    var counter = 1
    var observer = new MutationObserver(nextTickHandler)
    var textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
      characterData: true
    })
    timerFunc = () => {
      counter = (counter + 1) % 2
      textNode.data = String(counter)
    }
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = () => {
      setTimeout(nextTickHandler, 0)
    }
  }

  return function queueNextTick (cb?: Function, ctx?: Object) {
    let _resolve
    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx)
        } catch (e) {
          handleError(e, ctx, 'nextTick')
        }
      } else if (_resolve) {
        _resolve(ctx)
      }
    })
    if (!pending) {
      pending = true
      timerFunc()
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        _resolve = resolve
      })
    }
  }
})()
```

callbacks 用来存储需要执行的所有回调

pending 标志是否正在执行的回调函数

timerFunc 触发执行回调函数

nextTickHandler 用来执行callbacks存储的回调函数

timerFun有三种形式：
Promise
setTimeout
MutationObserver

前两个都是异步操作，异步任务。会在异步任务以及更新DOM的异步任务之后回调具体的函数

[关于MutationObserver][2]
MutationObserver是用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知

源码中 var observer = new MutationObserver(nextTickHandler)
通过给MutationObserver构造函数传入回调函数，此回调函数就会在实例化监听到变化的时候触发

有了回调还需要告诉它是那一个具体DOM

    var textNode = document.createTextNode(String(counter))
        observer.observe(textNode, {
          characterData: true
        })
这样就执行完了一个异步操作


  [1]: https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97
  [2]: https://javascript.ruanyifeng.com/dom/mutationobserver.html