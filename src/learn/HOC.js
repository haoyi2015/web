import React from 'react'
// 高阶组件
const withMouse = (Component) => {
    class withMouseComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = { x: 0, y: 0 }
        }
        handleMouseMove = (event) => {
            this.setState({
                x: event.clientX,
                y: event.clientY
            })
        }
        render() {
            return (
                <div style={{ height: '100px' }} onMouseMove={this.handleMouseMove}>
                    {/* 1. 透传所有 props 2. 增加 mouse 属性 */}
                    <Component {...this.props} mouse={this.state}/>
                </div>
            )
        }
    }
    return withMouseComponent
}

const App = (props) => {
    const a = props.a
    const { x, y } = props.mouse // 接收 mouse 属性
    return (
        <div style={{ height: '100px' }}>
            <h5>鼠标移动的位置： ({x}, {y})</h5>
            <p>{a}</p>
        </div>
    )
}
export default withMouse(App) // 返回高阶函数

// render props
/*class Factory extends React.Component {
    constructor () {
        this.state = {
            //这里 state 即多个组件的公共逻辑的数据
        }
    }
    //修改 state
    render () {
        return <div>{this.props.render(this.state)}</div>
    }
}

const App = () => {
    //render 是一个函数组件
    <Factory render={
        (props) => <p>{props.a} {props.b}...</p>
    } />
}*/
