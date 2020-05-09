 /**
 * vnode转换为真实dom
 * vtype 标识元素类型
 * type 标识标签
 */
export function createVnode(vtype, type, props){
    const vnode = { vtype, type, props }
    return vnode
}

/**
 * 转换虚拟dom为真实dom
 */
export function initVnode(vnode){
    const { vtype } = vnode||{}
    if(!vtype){
        // 文本节点
        return document.createTextNode(vnode)
    }else if(vtype === 1){
        // 原生标签
        return createElemnet(vnode)
    }else if(vtype === 2){
        // 类组件
        return createClassComp(vnode)
    }else if(vtype === 3){
        // 函数组件
        return createFuncComp(vnode)
    }
}
// 元素标签
function createElemnet(vnode){
    // 根据type判断创建元素
    const { type, props } = vnode
    const node = document.createElement(type)

    // 处理特殊属性
    const { key, children, ...rest } = props
    Object.keys(rest).forEach(k => {
        // 处理特殊属性名 className htmlFor style
        if(k === 'className'){
            node.setAttribute('class',rest[k])
        }else if(k === 'htmlFor'){
            node.setAttribute('for',rest[k])
        }else if(k === 'style' && typeof rest[k] === 'object'){
            // 如果是object进行值处理
            const style = Object.keys(rest[k]).map(m => m+ ':' + rest[k][m]).join(';')
            node.setAttribute('style',style)
        }else if(k.startsWith('on')){
            // 如果是事件处理 onClick
            const event = k.toLowerCase()
            node[event] = rest[k]
        }else{
            node.setAttribute(k,rest[k])
        }
    })
    //console.log(children)
    // 递归子元素
    children.forEach(child => {
        //console.log(child)
        // child如果是数组
        if(Array.isArray(child)){
            child.forEach(n => {
                node.appendChild(initVnode(n))
                console.log(n)
            })
        }else{
            node.appendChild(initVnode(child))
        }
    })
    return node
}
// class 组件
function createClassComp(vnode){
    // type是class组件申明
    const { type, props } = vnode
    // 实列化class组件
    const component = new type(props)
    const vdom = component.render()
    return initVnode(vdom)
}
function createFuncComp(vnode){
    // type是函数
    const { type, props } = vnode
    const vdom = type(props)
    return initVnode(vdom)
}
//export default { createVnode }