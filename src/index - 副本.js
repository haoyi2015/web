import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// 生命周期实列
import ComLife from './learn/LifeCycle'

// 时钟
import ClockComp from './learn/clock'

// 事件处理
import ClikComp from './learn/click'

// 表单
import FormComp from './learn/form'

// context
import NumCompContext from './learn/context'

// 高阶组件
import HocComp from './learn/HOC'

// hock -- useState
import UseComp from './learn/useState'

// 数组深拷贝
import DeepClone from './learn/deepClone'

// class组件
class CommList extends Component{
  constructor(props){
    super(props)
    this.state = {
      comments: []
    }
  }
  // Mount函数 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        comments: [
          { name: '李大明', age: 10, nian: 2000 },
          { name: '话大人', age: 100, nian: 1900 }
        ]
      })
    },1000)
  }
  // 渲染
  render() {
    const comments = this.state.comments
    return (
      <div>
        {comments.map((item,index) => (
          <CompData key={index} data={item}/>
        ))}
      </div>
    )
  }
}
// 函数组件
function CompDatas( {data} ){
  console.log('render')
  return(
    <div>名字：{ data.name } 年龄：{data.age}出生：{data.nian}</div>
  )
}
// 高价函数使用(React 16.6.0之后)
const CompData = React.memo(function ({data}){
  console.log('render')
  return(
    <div>名字：{ data.name } 年龄：{data.age}出生：{data.nian}</div>
  )
})
const jsx = (
  <div>
    <CommList></CommList>
    <br/>
    <h2>生命周期函数</h2>
    <ComLife/>
    <h2>state方法实例：</h2>
    <ClockComp increment=" 可以更新+1"/>
    <h2>事件处理</h2>
    <ClikComp />
    <h2>表单</h2>
    <FormComp />
    <h2>context组件通信</h2>
    <NumCompContext />
    <h2>hock -- useState使用</h2>
    <UseComp />
    <h2>高阶组件</h2>
    <HocComp />
    <h2>数组的深拷贝</h2>
    <DeepClone />
  </div>
)
ReactDOM.render(jsx,document.querySelector('#root'))