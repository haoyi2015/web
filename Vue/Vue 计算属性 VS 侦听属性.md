# Vue 计算属性 VS 侦听属性

1.computed计算属性

> 计算属性是基于它们的依赖进行缓存的，只有在相关依赖有发生变化时才会重新求值

官网栗子：
```
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
<script>
    var vm = new Vue({
      el: '#example',
      data: {
        message: 'Hello'
      },
      computed: {
        // 计算属性的 getter
        reversedMessage: function () {
          // `this` 指向 vm 实例
          return this.message.split('').reverse().join('')
        }
      }
    })
</script>
```
2.watch侦听属性

> 是用侦听和响应Vue实例上的相关数据变化

栗子：
```
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
</script>
```

> 示例中，使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的


3.computed和watch用法异同

 1. 相同： computed和watch都起到监听/依赖一个数据，并进行处理的作用
 2. 异同：它们其实都是vue对监听器的实现，只不过computed主要用于对同步数据的处理，watch则主要用于观测某个值的变化去完成一段开销较大的复杂业务逻辑。能用computed的时候优先用computed，避免了多个数据影响其中某个数据时多次调用watch的尴尬情况

4.watch的高级用法（handler方法和immediate属性）
```
<div id="demo">{{ fullName }}</div>
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      console.log('第一次没有执行～')
      this.fullName = val + ' ' + this.lastName
    }
  }
})
```

> 什么代码初始化的时候watch是不会执行的。看上边的例子，只要当firstName的值改变的时候才会执行监听计算

如果需要上面代码初始化执行就需要用到handler和immediate
```
watch: {
    firstName: {
      handler(val) {
        console.log('第一次执行了～')
        this.fullName = val + ' ' + this.lastName
      },
      // 代表在watch里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
}
注释
immediate:true代表如果在 wacth 里声明了 firstName 之后，就会立即先去执行里面的handler方法
```
5.watch的高级用法（deep属性）

```
<div id="app">
  <div>obj.a: {{obj.a}}</div>
  <input type="text" v-model="obj.a">
</div>
var vm = new Vue({
  el: '#app',
  data: {
    obj: {
    	a: 1
    }
  },
  watch: {
    obj: {
      handler(val) {
       console.log('obj.a changed')
      },
      immediate: true,
      // deep: true // 深度侦听
    }
  }
})
改变obj.a值但结果并未打印log，因为obj是对象，不能侦听多层对象值的变化更新，此时就需要深度监听deep属性（vue不能检测对象属性的添加和删除）
```

**computed的本质 —— computed watch**


## computed工作原理

1、computed 也是响应式的
2、computed 如何控制缓存
3、依赖的 data 改变了，computed 如何更新


（1）在Vue实例initSate的时候computed会创建自己的watcher，并且设置watcher.dirty=true，当用到computed能够计算得到新的值

（2）当依赖数据有变化时，实例会通知computed，让其重新计算

（3）computed计算完成之后会把watcher.dirty = false，这样就使得在还需要用到的地方读取的时缓存值

computed和data差不多，其实都是数据


注意

**computed是通过watcher.dirty控制是否需要读取缓存**

**computed会让【data依赖】来收集【依赖computed的watcher】从而data的变化就会通知到computed和依赖computed的地方**

## watch工作原理

1.监听的数据改变的时，watch 如何工作

watch在初始化的时候就会读取监听的数据值，而此时这个监听的数据就会收集到watch的watcher里面

设置immediate时候watch如何工作

> 当你设置了immediate=true，watch会在初始化时就会触发，而且会调一次你设置监听的回调

2.设置了 deep 时， watch 如何工作

> 深度监听也就是当你监听的时一个对象而非一个值的时候用deep

```
栗子：
var inner = { first:1111 }
var test={    name:inner  }

Object.defineProperty(test,"name",{
    get(){         
        console.log("name get被触发")         
        return inner
    },
    set(){        
        console.log("name set被触发")
    }
})
```
没设置deep：
读取了监听的 data 的属性，watch 的 watcher 被收集在 这个属性的 收集器中

设置了deep值：
1，读取了监听的 data 的属性，watch 的 watcher 被收集在 这个属性的 收集器中
2，会对每一个属性进行递归读取每一个属性，所以每个属性和对象值都会收集到watch的watcher