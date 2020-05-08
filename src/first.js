import React from 'react';
import logo from './logo.svg';
import './App.css';

// antd 使用
import { Button, Input } from 'antd'
import 'antd/dist/antd.css'

// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
// </header>
class First extends React.Component{
  constructor(){
    super()
    this.state = {
      list:[],
      value:''
    }
  }
  handChange=(event)=>{
    console.log(event.target.value)
    this.setState({
      value:event.target.value
    })
  }

  handAdd=()=>{
    let { list, value } = this.state
    list.push(value)
    this.setState({
      list
    })
    console.log(this.state)
  }

  onSearch=(value)=>{
    console.log(value,'111111')
  }

  render(){
    const list = this.state.list
    const { Search } = Input;
    return (
      <div className="App">
        <p>{ list.join() }</p>
        <Search
          placeholder="input search text"
          onSearch={this.onSearch}
          style={{ width: 200 }}
        />
        <Input type="text" value={this.value} onChange={this.handChange} />
        <Button type="primary" onClick={this.handAdd}>添加</Button>
      </div>
    );
  }
}

export default First;
