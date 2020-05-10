// Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据
import React from 'react'
// 创建一个Context对象 createContext
const ContextComp = React.createContext('')

class NumCompContext extends React.Component{
    render() {
        return (
            <div>
                <ContextComp.Provider value="zouni">
                    <ChildComp />
                </ContextComp.Provider>
            </div>
        )
    }
}

function ChildComp(){
    return (
        <div>
            <ChildComp1 />
        </div>
    )
}

// refs的使用
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
));

class ChildComp1 extends React.Component{
    static contextType = ContextComp;
    render() {
        const ref = React.createRef();
        return (
            <div>
                <h3>{this.context}</h3>
                // 你可以直接获取 DOM button 的 ref：
                <FancyButton ref={ref}>Click me!</FancyButton>
            </div>
        )
    }
}


export default NumCompContext