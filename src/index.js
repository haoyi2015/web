import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// 生命周期实列
import ComLife from './learn/LifeCycle'

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
  </div>
)
ReactDOM.render(jsx,document.querySelector('#root'))