# MVVM模式

### 什么是MVVM？

即：MVVM是Model-View-ViewModel的缩写

mvvm分层为：

* Model：数据管理（模型层）
* View：视图层 通俗讲就是页面
* ViewModel：负责业务处理，对数据进行加工，链接model和view

```
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
	<script src="https://cdn.jsdelivr.net/npm/vue"></script>
</head>
<body>
	<div id="app">
		<!--视图层 View-->
		{{ msg }}
		<input type="text" v-model="msg" name="">
	</div>

	<script type="text/javascript" charset="utf-8">
		// Model层
		let vueData = {
			msg: 'mvvm'
		}
		// ViewModel 层
		new Vue({
			el: "#app",
			data: vueData
		})
	</script>
</body>
</html>
```

### Vue 怎样实现双向绑定mvvm

**数据劫持**：vue 是采用数据劫持结合发布者-订阅者模式的方式，也就是Object.defineProperty()来劫持每个属性的getter和setter，当有数据变化是发布消息给订阅者，然后触发对应的监听回调

**思路流程**
* 首先要实现一个数据监听器，对数据对象所有属性进行监听，如果有任何变化取到最新值通知给订阅者（Observer）
* 其次需要有一个指令解析器，对每个元素节点进行扫描和解析，根据指令模板更新数据和绑定相应的更新函数（Compile）
* 最后实现一个桥连对Observer和Compile通信，能够订阅并且收到每个属性变动通知，然后执行指令绑定相应的回调函数（Watcher）

整合以上三部即为Mvvm入口 如下流程图：

![RUNOOB 图标](../images/mvvm.png)

## 1.实现Observer

defineProperty  来源 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
```
/*
	首先了解defineProperty

	语法Object.defineProperty(obj, prop, descriptor)

	obj
	要定义属性的对象。
	prop
	要定义或修改的属性的名称或 Symbol 。
	descriptor
	要定义或修改的属性描述符

	value 
	该属性对应的值。可以是任何有效的 JavaScript 

	writable 
	当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。默认为 false。

	get 
	属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
	默认为 undefined。

	set
	属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。
	默认为 undefined。
*/
let obj = {}

Object.defineProperty(obj, 'propt', {
	value: "a123", // 该属性(即：propt)
	writable: true,
	enumerable : true,
	configurable : true
})
// 改变propt值   writable为false时不会被赋值
//obj.propt = 100;

//console.log(obj.propt)

let Vobj

//get&set简单实现
Object.defineProperty(obj, 'name', {
	get(){
		return Vobj
	},
	set(newVobj){
		return Vobj = newVobj
	},
	enumerable : true,
	configurable : true
})

obj.name = 100

console.log(obj.name) // 100


// 粗略 Observer实现

let data = {
	name: '李大华',
	age: 10
}
// Observer监听函数

let Observer = (data) =>{
	// 是否是object
	if(!data|| typeof data !="object"){
		return
	}
	// 遍历每一个属性
	Object.keys(data).forEach(function(key){
		defineProperty(data,key,data[key])
	})
}

// defineProperty
let defineProperty = (data,key,val) =>{
	let dep = new Dep()
	Object.defineProperty(data,key,{
		enumerable : true,
		configurable : true,
		get(){
			return val
		},
		set(newVal){
			console.log('监听到值变化了 ', val, ' --> ', newVal);
			val = newVal
			dep.notify() // 告知订阅者
		}
	})
}

// 实现通知
function Dep(){
	this.items = []
}
Dep.prototype = {
	notify: function() {
		this.items.forEach(function(sub) {
			sub.update();
		});
	}
}
Observer(data)
data.name = 1111
```

## 2、实现Compile

compile主要做的事情是解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

```
function Compile(el) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}
Compile.prototype = {
	init: function() { this.compileElement(this.$fragment); },
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(), child;
        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }
};
```

## 3、实现Watcher

Watcher订阅者作为Observer和Compile之间通信的桥梁，主要做的事情是: 1、在自身实例化时往属性订阅器(dep)里面添加自己 2、自身必须有一个update()方法 3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调

```
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    // 此处为了触发属性的getter，从而在dep添加自己，结合Observer更易理解
    this.value = this.get(); 
}
Watcher.prototype = {
    update: function() {
        this.run();	// 属性值变化收到通知
    },
    run: function() {
        var value = this.get(); // 取到最新值
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal); // 执行Compile中绑定的回调，更新视图
        }
    },
    get: function() {
        Dep.target = this;	// 将当前订阅者指向自己
        var value = this.vm[exp];	// 触发getter，添加自己到属性订阅器中
        Dep.target = null;	// 添加完毕，重置
        return value;
    }
};
// 这里再次列出Observer和Dep，方便理解
Object.defineProperty(data, key, {
	get: function() {
		// 由于需要在闭包内添加watcher，所以可以在Dep定义一个全局target属性，暂存watcher, 添加完移除
		Dep.target && dep.addDep(Dep.target);
		return val;
	}
    // ... 省略
});
Dep.prototype = {
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update(); // 调用订阅者的update方法，通知变化
        });
    }
};

```
出自：[原地址](https://github.com/DMQ/mvvm)