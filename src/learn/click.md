## 事件处理
>不能用false 的方式阻止默认行为，必须用preventDefault方式
```
testFun=(e)=>{
    e.preventDefault()
    console.log(e,'test')
}
<button onClick={this.testFun}>事件处理</button>
```
- 事件this的指向问题
>可通过bind绑定this，箭头函数来实现
```
this.handToggle = this.handToggle.bind(this)

handToggle=() =>{

}
```

- 事件传递参数
>比如需要传递参数id,可通下面两种形式传递
```
<button onClick={(e) =>this.handToggle(id)}>事件处理</button>
<button onClick={this.handToggle.bind(id)}>事件处理</button>
```