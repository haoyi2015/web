import { initVnode } from './learnVdom'
// 实现learnReactDOM render
function render(vnode, container){
    // 展示代码
    //let code = `<pre>${JSON.stringify(vnode)}</pre>`
    //container.innerHTML = code
    // 转换真实dom
    const node = initVnode(vnode)
    container.appendChild(node)
}
export default { render }