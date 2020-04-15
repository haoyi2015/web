# JavaScript继承

继承描述：

> 子类可以使用父类的所有功能，并且对这些功能进行扩展。继承的过程，就是从一般到特殊的过程
原型链继承（对象间的继承）——————借助已有的对象创建新的对象，将子类的原型指向父类，就相当于加入了父类这条原型链
类式继承（构造函数间的继承） ——————类式继承是在子类型构造函数的内部调用超类型的构造函数


继承的方式：

1.原型链继承

```
实现子类继承父类 fun1继承fun
function fun() {
    this.name = "一个栗子"
}
function fun1() {
    this.age = 100
}
fun1.prototype = new fun() // fun1继承fun，通过原型prototype有了链 [函数是一个对象，且都有一个原型prototype]
var test = new fun1()
console.log(test.name) //继承了fun和fun1,弹出一个栗子
console.log(test.age) //继承了fun1
```

>使用原因：子类无法给父类传参 
所有的构造函数都继承自Object。而继承Object是自动完成的

2.构造函数继承（类式继承）
```
 function fun(age) {
    this.name = "一个栗子"
    this.age = age
 }
 function fun1(age) {
    fun.call(this,age) //改变this指向
 }
 var test = new fun1(100)
 console.log(test.age)
 没有原型，无法复用
```
3.组合继承

```
function funC (age) {
	this.name = "一个栗子"
	this.age = age
}
funC.prototype.getVal = function () {
	return [this.name,this.age]
}
function funD (age) {
	funC.call(this,age) // 给父类传参数，同时改变this（第一次调用）
}
funD.prototype = new funC() // 原型链继承（第一次调用）
var testC = new funD(190) // new funC() 也可以
console.log(testC.getVal())

存在小问题：funC会调用两次
```
4.寄生组合式继承

```
function funF(name) {
	this.name = name
	this.age = 128
}
funF.prototype.getVal = function () {
	return this.name
}
function funE(name,age) {
	funF.call(this,name)
	this.age = age
}
funE.prototype = Object.create(funF.prototype) //创建对象 
funE.prototype.constructor = funE // 指定指向者
var testF = new funE("一个栗子",1000)
console.log(testF.name) // 一个栗子
```

> 通过Object.create(obj)创建一个原型是obj的空对象赋值给子类的原型；
也就是Object.create()进行了一次浅拷贝，将父类原型上的方法拷贝后赋给funE.prototype，这样子类上就能拥有了父类的共有方法。
注意点：所有基于原型链继承的都需要记住constructor的指向问题，寄生继承相当于是原型链继承的一种变形
基于原型链的继承如果constructor没有重新设置指向的话，它指向的是超类型构造函数。因为constructor是原型的一个共享属性，所以在子类原型中查找constructor属性时其实会在原型链上去找constructor指向的值，最后指向了超类型构造函数
栗子：
```
function Parent(){}
function Child(){}
Child.prototype = new Parent()
console.log(Child.prototype.constructor) // Parent ——————输出的是Parent(){}
```
6.ES6的继承 Class

```
class Parent{
	constructor(name){ // constructor 方法是类的构造函数，是一个默认方法
		this.name = name
	}
	getName() {
		return this.name
	}
}
class Child extends Parent{ // 通过extends实现继承
	constructor(name,age){
		super(name)
		this.name = name
		this.age = age
	}
	introduce(){
		return this.name
	}
}
var cls = new Child('一个栗子',109)
console.log(cls.getName())
```

> 通过class,extends关键字实现继承的方式