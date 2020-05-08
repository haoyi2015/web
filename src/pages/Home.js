// hock
import React,{useState,useEffect} from 'react';
// 引入antd
import { Button,Table } from 'antd'
import 'antd/dist/antd.css'
// 路由跳转
import { Link } from 'react-router-dom'
import '../style/demo.scss'

// 引入axios
import axios from 'axios'

//函数式组件
export default function Home(props){
    console.log(props)
    // 声明一个叫 "data" 的 state 变量
    const [data,setData] = useState([])
    const columns = [
        {
          title: '名字',
          dataIndex: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
        {
          title: '地址',
          dataIndex: 'address',
        },
    ];
    const [index,setIndex] = useState(0)
    useEffect(()=>{
        axios.get('/mock/list.json',{
            
        }).then((res)=>{
            console.log(res.data.data)
            setData(res.data.data)
        })
    },[])
    return <div className="link-router">
        <h1>列表数据</h1>
        <ul className="nav-list">
            <li className={index == 0?'active':''} onClick={()=>{setIndex(0)}}>列表一</li>
            <li className={index == 1?'active':''} onClick={()=>{setIndex(1)}}>列表二</li>
            <li className={index == 2?'active':''} onClick={()=>{setIndex(2)}}>列表三</li>
        </ul>
        <Table bordered pagination={false} columns={columns} dataSource={data}></Table>
    </div>
}

// class 组件
/*export default class Home extends React.Component{
    state ={
        data:[],
        index:0
    }
    // ajax请求数据
    componentDidMount(){
        axios.get('/mock/list.json',{
            
        }).then((res)=>{
            console.log(res.data.data)
            this.setState({
                data: res.data.data
            })
        })
    }
    // 切换方法
    setIndex=(index)=>{
        this.setState({
            index
        })
    }
    render(){
        const columns = [
            {
              title: '名字',
              dataIndex: 'name',
              render: text => <a>{text}</a>,
            },
            {
              title: '年龄',
              dataIndex: 'age',
            },
            {
              title: '地址',
              dataIndex: 'address',
            },
        ];
        const data = this.state.data
        return <div className="link-router">
            <h1>列表数据</h1>
            <ul className="nav-list">
                <li className={this.state.index == 0?'active':''} onClick={()=>this.setIndex(0)}>列表一</li>
                <li className={this.state.index == 1?'active':''} onClick={()=>this.setIndex(1)}>列表二</li>
                <li className={this.state.index == 2?'active':''} onClick={()=>this.setIndex(2)}>列表三</li>
            </ul>
            <Table bordered pagination={false} columns={columns} dataSource={data}></Table>
        </div>
    }
}*/