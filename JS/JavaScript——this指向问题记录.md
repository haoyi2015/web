#JavaScript——this指向问题记录

标签（空格分隔）： this指向

---

简要描述：**this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象**

+ 1.普通函数栗子
```
function test(){
    var name = 'aaaa'
    console.log(this.name) //undefined
    console.log(this) // window
}

test(); //test实际是被window掉用    window.test()
```
+ 2.对象内有函数
```
var ops = {
    name: 'aaa',
    fu: function(){
        console.log(this.name) // aaa
        console.log(this) // 指向ops对象
    }
}
ops.fu() // 是ops调用了fu
windiw.ops.fu() // 
注：window是js中的全局对象，我们创建的变量实际上是给window添加属性，所以这里可以用window点o对象
```
+ 3.对象内有对象再加函数
```
var ops = {
    name: 'aaa'
    b:{
        name: 'bbb',
        fu: function(){
            console.log(this.name) // bbb
            console.log(this) // 指向b对象
        }
    }
}
ops.b.fu()
注意：
1.如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window
2.如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象
3.如果一个函数中有this，这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象
```
+ 4.特殊情况，调用赋值给变量
```
var ops = {
    name: 'aaa',
    fu:function(){
        console.log(this.name) // undefined
    }
}
var s = ops.fu
s() // 相当于window调用

注意：
this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的，例子4中虽然函数fn是被对象b所引用，但是在将fn赋值给变量j的时候并没有执行所以最终指向的是window
```

+ 5.构造函数版this
```
function fn(){
    this.name = "aaa"
    console.log(this)
}
var s = new fn()
s.name // aaa  这里用变量s创建了一个Fn的实例（相当于复制了一份fn到对象s里面）调用这个函数fn的是对象s,所有指向了s
**new关键字能改变this指向，new创建了一个实列对象**
```
+ 6.箭头函数this指向
**因为箭头函数默认不会使用自己的this，而是会和外层的this保持一致，最外层的this就是window对象**
**不能用call方法修改里面的this**
```
var ops = {
    name: 'aaa',
    fu: () => console.log(this) // 指向ops对象
}
ops.fu()

var ops = {
    name: 'aaa',
    b:{
    	name: 'bbb',
	    fu: function(){
	    	(()=>{
	    		console.log(this) // 箭头函数this不可改变
	    	})()
	    },
	    fun: function () {
	    	console.log(this,'---') //指向b对象
		    return () => console.log(this) //指向b对象，因为fun调用了箭头函数
		}
    }
}
ops.b.fun().call(person2)  // b调用了fun函数，fun函数this指向b对象，而fun又调用了箭头函数，箭头函数this指向show4函数的this也就是b对象

箭头函数会默认帮我们绑定外层this的值，所以在箭头函数中this的值和外层的this是一样的
```
+ 7.this碰到return时
```
function fn()  {  
    this.user = 'aaa';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined

function fn() {  
    this.user = 'aaa';  
    return function(){};
}
var a = new fn;  
console.log(a.user); //undefined

function fn() {  
    this.user = 'aaa';  
    return 1;
}
var a = new fn;  
console.log(a.user); //aaa

function fn() {  
    this.user = 'aaa';  
    return undefined||null;
}
var a = new fn;  
console.log(a.user); //aaa

注意：
1.在严格版中的默认的this不再是window，而是undefined。
2.new操作符会改变函数this的指向问题，虽然我们上面讲解过了。
```
+ 8.多层对象嵌套里函数的this
```
var obj = {
    name: 'obj',
    fun: function() {
        console.log(this,' 11') // 指向obj对象
    },
    b:{
    	name: 'bbb',
	    fun1:function () {
	    	console.log(this,' 22') // 指向b对象
	    },
	    c:{
	    	name: 'ccc',
		    fun2:function () {
		    	console.log(this,' 333') // 指向c对象
		    },
		    fun3:() => console.log(this), // 指向window
		    fun4:function () {
		    	return function () {
			      console.log(this)
			    }
		    },
		    fun5:function () {
		    	return () => console.log(this)
		    },
	    }
    }
}
obj.b.c.fun2()
obj.b.c.fun4()()  // fun4返回了一个函数，通过()对此函数执行，相当于放到全局执行
obj.b.c.fun5()()  // 箭头函数this指向上级this
注：多层对象嵌套里箭头函数里this是和最最外层保持一致的
```