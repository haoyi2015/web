import React,{useState} from 'react'
import { Form, Input, Button } from 'antd'
// 路由跳转hook
import { useHistory } from 'react-router-dom'
import '../style/login.scss'

// 导入axios
import axios from 'axios'

function Login(){
    // 表单块
    const FormItem = Form.Item
    // 登录信息
    const [name,setName] = useState('')
    // 路由方法
    const history = useHistory()
    const [pwd,setPwd] = useState('')

    return <div className="login-warp"><h1>登录</h1><br/>
        <Form>
            <FormItem>
                <Input placeholder="请输入用户名" onChange={(event)=>{
                    setName(event.target.value)
                }}/>
            </FormItem>
            <FormItem>
                <Input type="password" placeholder="请输入用户密码" onChange={(event)=>{
                    setPwd(event.target.value)
                }}/>
            </FormItem>
            <p>{pwd}</p>
            <FormItem>
                <Button type="primary" className="login-form-button" onClick={()=>{
                    LoginFun(name,pwd).then((res) =>{
                        history.push('/')
                    })
                }}>登录</Button>
            </FormItem>
        </Form>
    </div>
}

// 登录函数
function LoginFun(name,pwd){
    return axios.get('/mock/login.json',{
        params:{
            name: name,
            pwd:pwd
        }
    })
}

export default Login