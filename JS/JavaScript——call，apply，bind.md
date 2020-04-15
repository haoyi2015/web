# JavaScript——call，apply，bind

与this相关

---

> 三者的根本作用就是改变函数运行时的this指向

栗子：
```
普通函数：

function fun(){
    console.log(this) // this 指向window
}
fun()

嵌套函数：

function fun1(){
    function fun2(){
        console.log(this)//window
    }
    fun2()
}
fun1()

对象里面加函数：

var ops = {
    name: '一个栗子',
    fun: function() {
        console.log(this) // this指向ops对象
        console.log(this.name) // 一个栗子
    }
}
ops.fun()

变量赋值函数：

var name = "一个栗子"
var ops = {
    name:"二个栗子",
    fun:function(){
        console.log(this.name) // this指向window
    }
}
var fn = ops.fun
fn() //一个栗子

回调函数：

var name = "一个栗子"
function fun(fn){ // 参数赋值
    fn()
    console.log(name) //"一个栗子"
}
fun(fun1)

function fun1(){
    var name = "二个栗子"
}

注解：
//参数的隐性赋值
var fn = undefined // 默认
fn = fun1 当调用fun函数时fn被赋值为fun1
fn() // 此时this指向window
```

+ 1，call

> call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数
call(指向的值,第二第三第 n 个参数全都用逗号分隔)

```
function fun(){
    console.log(this) // this 指向obj
}

var obj = { name: '一个栗子' }
fun.call(obj) // 改变this指向
```
+ 2.apply
> apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数
apply(指向的值,[第二,第三,第 n 个参数])  第二个参数需要放在数组里面

```
function fun(){
    console.log(this) // this 指向obj
}

var obj = { name: '一个栗子' }
fun.apply(obj) // 改变this指向
```
+ 3.bind

> bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
bind(指向的值)

```
function fun(){
    console.log(this) // this 指向obj
}

var obj = { name: '一个栗子' }
fun.bind(obj)() // 改变this指向
```
+ 4.三则之间的区别

> call和apply 改变了函数的this上下文之后便立即执行函数，而bind则是返回改变了上下文后的一个新函数
call/apply立即执行，bind需要手动执行

```
栗子：求各自的最大值
var arr = [1, 5, 3, 6, 100]
//用apply接收数组，取出最大值
Math.max.apply(Math, arr)
//call接收若干个参数 取出最大值
Math.max.call(Math, 1, 5, 3, 6, 100)
//bind不会立即执行  需要手动执行
Math.max.bind(Math, 1, 5, 3, 6, 100)()

```
+ 5.手写call，apply，bind
call 接受多个参数
call简单实现：
```
Function.prototype.callFun = function (objThis,...args) {
    objThis.fn = this
    return objThis.fn(...args)
}
function test () {
	this.name = "111"
}
var so = {
	name: 9999
}
test.callFun(so) // 实现call功能
但是需要做一些细节的处理优化
Function.prototype.callFun = function (objThis,...args) {  // 参数可以用context（执行上下文）
    // this
    if(typeof this != 'function'){
        throw new TypeError('error')
    }
    var fn = Symbol('fn') //声明一个独有的Symbol属性, 防止fn覆盖已有属性
    objThis[fn] = this||window // 默认指向window
    var returnFn = objThis[fn]
	delete objThis[fn]
	return returnFn(arg)
}
```
apply实现
```
Function.prototype.applyFun = function (objThis,agrs) {
	if( agrs!="" && (typeof agrs != 'object')){
		throw new TypeError('error')
	}
	var fn = Symbol('fn') //声明一个独有的Symbol属性, 防止fn覆盖已有属性
	var arg = [...agrs]
	objThis[fn] = this||windiw // 默认指向window
	var returnFn = objThis[fn]
	delete objThis[fn]
	return returnFn(arg)
}
am.applyFun(so)
```
bind实现
```
Function.prototype.bindFun = function (context) {
    //返回一个绑定this的函数，需要保存this
    var _this = this
    var agrs = [...arguments].slice(1)
    
    // 返回函数
    return function () { // this会改变
    	var newsAgrs = [...arguments]
    	// 返回函数指定this
    	_this.apply(context,agrs.concat(newsAgrs))
    }
}
am.bindFun(so)
```