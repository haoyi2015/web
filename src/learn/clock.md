## state异步更新
>this.state,this.props可能是异步更新，最好别依赖他们来更新状态
```
以下代码可能无法更新最终值
this.setState({
    num:this.state.num+this.props.increment
})
```
可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数

```
this.setState((state,props) =>( {
    num:state.state.num+props.increment
}))
```
- state是合并更新
>通过setState回调拿到最新的值
```
updateNum=(val) =>{
    this.setState(
        { num: val},
        () =>{
            console.log(this.state.num)
        }
    )
}
```
注意：
>由 React 控制的事件处理过程 setState 不会同步更新 this.state！
也就是说，在 React 控制之外的情况， setState 会同步更新 this.state！

- 数据流是一直往下传递
>不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。所以state是局部的或者封装的，其他组件无法访问

```
class Comp1 extends React.Component{
    render(){
        return (
            <div>
                <Comp2 date={this.state.num}/>
            </div>
        )
    }
}
function Comp2(props){
    return <h2>{ props.date.num }</h2>
}
```