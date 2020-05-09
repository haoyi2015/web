import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'

// 生命周期组件
class LifeCycle extends React.Component{
    constructor(props){
        super(props)
        console.log('初始化')
        this.state = {
            str: '这是第一个初始值'
        }
    }
    // component第一次render之前执行
    componentWillMount(){
        console.log('componentWillMount-----component第一次render之前')
    }
    // 在component已经初始化完成，render之后执行一次
    componentDidMount(){
        console.log('componentDidMount-------在component的render完之后执行')
    }
    // 组件更新完之后执行
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps-------组件更新完之后执行')
    }
    // 初始化不执行，只有在props或者state改变时候才执行，并是在rebder之前 没更新时返回false
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate-------只有在props或者state改变时候才执行')
        return true;        // 记得要返回true
    }
    // props和state发生变化时执行，并且在render方法之前执行
    componentWillUpdate(){
        console.log('componentWillUpdate-----')
    }
    // 组件更新结束之后执行,初始化不执行
    componentDidUpdate(){
        console.log('componentDidUpdate----组件更新结束之后执行')
    }
    // 当组件要被移除时候调用（可执行相关操作：取消计时器、网络请求）
    componentWillUnmount(){
        console.log('componentWillUnmount-------当组件要被移除时候调用')
    }
    // 触发state
    setStateFun() {
        let str = '这是第一个初始值'
        if(this.state.str === str){
            this.setState({
                str: '改变了初始值'
            })
        }
    }
    // 当组件的state或props改变时，组件将重新渲染
    forceInUpdate() {
        this.forceUpdate()
    }
    render(){
        console.log('render')
        return(
            <div>
                <span>Props：{this.props.num}</span>
                <br/>
                <span>State：{this.state.str}</span>
            </div>
        )
    }
}

// Container 组件
class Container extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            num: Math.random() * 1000
        }
    }
    // 改变state
    propsChange=()=> {
        this.setState({
            num: Math.random() * 100
        })
        console.log(this.state.num)
    }
    // 
    setLifeState=()=> {
        this.refs.rLifeCycle.setStateFun();
    }

    forceLife=()=> {
        this.refs.rLifeCycle.forceInUpdate();
    }
    unmountLifeCycle=()=> {
        // 这里卸载父组件也会导致卸载子组件
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    }
    parentForceUpdate=()=> {
        this.forceUpdate();
    }
    render() {
        return (
            <div className="life-demo">
                <a onClick={this.propsChange}>改变props</a>
                <a onClick={this.setLifeState}>改变state</a>
                <a onClick={this.forceLife}>更新父组件</a>
                <a onClick={this.unmountLifeCycle}>销毁组件</a>
                <a onClick={this.parentForceUpdate}>强制更新</a>
                <LifeCycle ref="rLifeCycle" num={this.state.num}></LifeCycle>
            </div>
        )
    }
}
export default Container