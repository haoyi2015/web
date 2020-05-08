// hock
import React,{useState,useEffect} from 'react';
// 引入antd
import { Button } from 'antd'
import 'antd/dist/antd.css'
// 路由跳转
import { Link } from 'react-router-dom'
import '../style/demo.scss'

export default function Home(){
    // 声明一个叫 "count" 的 state 变量
    const [count,setCont] = useState(0)
    useEffect(()=>{
        setCont(100)
    })
    return <div className="link-router">
        <Link to="/">主页</Link>
        <Link to="/about">关于react</Link>
        <Link to="/cont/999">内容展示</Link>
        <p>
            useState使用：<br />
            {count}<br/>
            <Button onClick={() => {setCont(+1)}}>点这里</Button>
        </p>
    </div>
}