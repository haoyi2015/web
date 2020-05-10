import React from 'react'

class ClickComp extends React.Component{
    // 事件函数
    testFun=(e,params)=>{
        e.preventDefault()
        console.log(e,'class组件',params)
    }
    render() {
        return(
            <div>
                <button onClick={(e) =>this.testFun(e,'参数传递过来id')}>事件处理</button>
                <br />
                <h3>this事件绑定</h3>
                <ToggleComp />
            </div>
        )
    }
}
// toggle
class ToggleComp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isToggleOn: true
        }
    }
    handToggle=() =>{
        this.setState(state =>({
            isToggleOn: !state.isToggleOn
        }))
    }
    render() {
        return (
            <button onClick={this.handToggle}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        )
    }
}
// 函数组件
/*function ClickComp(){
    function testFun(e) {
        e.preventDefault()
        console.log(e,'函数组件')
    }
    return (
        <div>
            <button onClick={testFun}>事件处理</button>
        </div>
    )
}*/
export default ClickComp