import React from 'react';
import { Link,useParams,useHistory } from 'react-router-dom'
export default function Cont(){
    // hook useParams获取路由参数
    const params = useParams()
    // hook useHistory 路由跳转
    const history = useHistory()
    return <div>
        参数： {params.id}<br/>
        <button onClick={()=>{history.push('/')}}>返回首页</button>
    </div>
}