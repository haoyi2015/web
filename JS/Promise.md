# JavaScript里面的Promise

开篇先来一个异步执行的小栗子：
```
console.log("1");
setTimeout(function() {
console.log("2")
}, 0);
setTimeout(function() {
console.log("3")
}, 0);
setTimeout(function() {
console.log("4")
}, 0);
console.log("5");
// 1 5 2 3 4
```
话不多说在来个普通回调
```
function fn(age,fn1){
	if(typeof fn1 == 'function'){
		fn1()
	}
}
fn(100,function(){
	console.log('回调函数')
})
```
多个请求并发
```
function a(){
    b()
}
function b(){
    c()
}
function c()
a()
```

> promise是异步编程解决方案，从语法上来讲是一个对象。
Promise有三种状态：
pending（等待），fulfiled（成功），rejected（失败）。状态一旦改变就不会再变，创建Promise实列后，状态会立即执行

+ 一. 可以解决那些问题？
1.回调多个层级
2.可支持多个笔法请求
3.异步问题，但不是说Promise时异步的

+ 二. Promise语法

> Promise是一个构造函数，本身有all，reject（拒绝），resolve（解析）几个方法，其在原型上有then，catch
构造函数： 浏览器控制台输出 
Promise
ƒ Promise() { [native code] }
原型：浏览器控制台输出
Promise.prototype
Promise {Symbol(Symbol.toStringTag): "Promise", constructor: ƒ, then: ƒ, catch: ƒ, finally: ƒ}

既然说是构造函数，那我可以用new 来实列化Promise

```
resolve用法：
let ps = new Promise((resolve,reject) =>{
    console.log(1111111111)
    setTimeout(() =>{
        console.log('setTimeout')
        resolve('回来了')
    },1000)
})
ps.then((res) =>{
	console.log(res)
})

reject用法：
let ps = new Promise((resolve,reject) =>{
    console.log(1111111111)
    let num = Math.ceil(Math.random()*10)
    setTimeout(() =>{
        console.log('setTimeout')
        if(num <=5 ){
            resolve('满足条件')   
        }else {
            reject('不满足条件')
        }
    },1000)
})
ps.then((res) =>{
	console.log(res)
}).catch((err) =>{
    console.log(err)
})
```

> resolve，reject不可少的参数，成功和失败的回调

假如在开发中出现下列情况
```
ps.then((res) => {
    console.log(res)
    console.log(nums)
}).catch((err) =>{
    console.log('err',err)
})
// 此时代码执行结果如下
err ReferenceError: nums is not defined
    at Promise.html:65
    
就是说进到catch方法里面去了，就算是有错误的代码也不会报错了，这与我们的try/catch语句有相同的功能
而且把错误信息回传
```

多个并行执行
```
let a = new Promise((resolve,reject)=>{})
let b = new Promise((resolve,reject)=>{})
let b = new Promise((resolve,reject)=>{})

可以用all
let ps = Promise.all(['a','b','c'])
ps.then((res) =>{
    // 三个都成功则成功
}).catch((err) =>{
    // 只要有失败，则失败 
})
```

> all的用法：谁跑的慢，以谁为准执行回调。all接收一个数组参数，里面的值最终都算返回Promise对象
使用场景游戏类的素材比较多的应用，打开时预加载需要的资源

```
let a = new Promise((resolve,reject)=>{})
let b = new Promise((resolve,reject)=>{})
let b = new Promise((resolve,reject)=>{})

可以用all
let ps = Promise.race(['a','b','c'])
ps.then((res) =>{
    
}).catch((err) =>{
    
})
```

> race谁先执行玩，以谁为准执行回调

Promise简单实现
```
//定义三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function myPromise(fn){
	let _this = this
	this.status = 'panding' // 默认状态
	this.value = undefined // 默认值
	this.error = null // 错误信息

	// 支持单个调用
	_this.onFulfilled = null; //成功的回调函数
	_this.onRejected = null; //失败的回调函数
	
	_this.status = PENDING; // 默认状态

	// 支持链式操作，也就是多个then
	_this.onFulfilledCallBacks = []
	_this.onRejectedCallBacks = []

	// 成功处理
	function resolve (data) {
		// 加如状态
		if(_this.status == PENDING){
			// 支持同步方法
			setTimeout(()=>{
				_this.value = data
				_this.status == FULFILLED
				// 支持单个调用
				//_this.onFulfilled(data)

				// 支持多个then调用(改造成数组调用)
				_this.onFulfilledCallBacks.forEach((callback) =>{
					callback(_this.value)
				})
			})
		}
	}

	// 失败处理
	function reject (error) {
		// 加如状态
		if(_this.status == PENDING){
			// 支持同步方法
			setTimeout(()=>{
				_this.error = error
				_this.status = REJECTED
				// 支持单个调用
				//_this.onRejected(error)

				// 支持多个then调用(改造成数组调用)
				_this.onRejectedCallBacks.forEach((callback) =>{
					callback(_this.error)
				})
			})
		}
	}
	return fn(resolve,reject)
}
//挂载then方法
myPromise.prototype.then = function(onFulfilled,onRejected) {
	console.log(this)
	// 对状态进行判断
	if(this.status == PENDING){
		// 单个调用
		//this.onFulfilled = onFulfilled
		//this.onRejected = onRejected

		// 支持多个then调用(改造成数组)
		this.onFulfilledCallBacks.push(onFulfilled)
		this.onRejectedCallBacks.push(onRejected)
	}else if(this.status == FULFILLED){
		// 成功回调
		onFulfilled(this.value)
	}else{
		// 失败回调
		onRejected(this.error)
	}
	return this
}
var pm = new myPromise((resolve,reject) =>{
	console.log(1090)
	resolve('自定义成功')
})
// 多个调用
pm.then((res)=>{
	console.log('zouni',res)
}).then((res)=>{
	console.log('zouni----111',res)
})
```

注意点：

 + 1. Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的

 ```
const promise = new Promise((resolve, reject) => {
        console.log(1)
        resolve()
        console.log(2)
})
promise.then(() => {
        console.log(3)
})
console.log(4)

// 1 2 4 3
 ```

+ 2.promise 有 3 种状态：pending、fulfilled 或 rejected。状态改变只能是 pending->fulfilled 或者 pending->rejected，状态一旦改变则不能再变。上面 promise2 并不是 promise1，而是返回的一个新的 Promise 实例
```
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)
```
+ 3.构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用，呼应代码二结论：promise 状态一旦改变则不能再变
```
const promise = new Promise((resolve, reject) => {
  resolve('success1')
  reject('error')
  resolve('success2')
})

promise
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
```
+ 4.then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获，需要改成其中一种 需要reject
+ 5.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环
+ 6.then 或者 .catch 的参数期望是函数