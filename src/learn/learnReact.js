import { createVnode } from './learnVdom'
// 自己实现简单createElement
function createElement(type, props, ...children){
    //console.log(props)
    // 对childen改造到props
    props.children = children
    // 删除不需要的代码__source
    delete props.__source
    delete props.__self
    // type: 标签 div span

    // vtype组件类型判断
    let vtype
    if(typeof type === 'string'){
        // 原生标签
        vtype = 1
    }else if(typeof type === 'function'){
        if(type.isClassComponent){
            // 类组件
            vtype = 2
        }else{
            // 函数组件
            vtype = 3
        }
    }
    // 执行createVnode
    return createVnode(vtype, type, props) //{ type,props }
}

export default { createElement }

// 需要实现一个Component

export class Component{
    // 区分组件是class还是function
    static isClassComponent = true

    constructor(props) {
        this.props = props
        this.state = {}
    }
    setState() {

    }
}