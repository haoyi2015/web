//import React from 'react'
//import ReactDOM from 'react-dom'

// 自己实现的react
import React, { Component } from './learn/learnReact'
import ReactDOM from './learn/learnReactDOM'

// Comp组件
function Comp(props){
  console.log(props)
  return <h2>注释---- Comp{props.name}</h2>
}
// 申明一个组件
class Comp1 extends Component{
  render() {
    const list = [{
      name: '李大华',
      id: 19012
    },{
      name: '王大华',
      id: 99919012
    },{
      name: '孙大华',
      id: 91219012
    }]
    return(
      <div>
        <h2>注释----{this.props.name}</h2>
        <br/>
        <ul>
          {list.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}
// 自己定义jsx(虚拟dom)
const jsx = (
  <div className="demo">
    <span style={{color:'red'}}>span标签</span>
    <br/><br/>
    <button onClick={() =>{alert('点击事件')}}>点击事件</button>
    <Comp name="函数组件"/>
    <Comp1 name="这是一个Copm1组件"/>
  </div>
)
ReactDOM.render(jsx,document.querySelector('#root'))