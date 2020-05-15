import React from 'react'
import '../../style/login.scss'
import Toast from '../../toast';

class LoginComp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userName: '',
            userPwd: ''
        }
    }
    handleUserName=(event)=>{
        this.setState({userName: event.target.value});
    }
    handlePwd=(event)=>{
        this.setState({userPwd: event.target.value});
    }
    handlelogin=()=>{
        console.log(this.state)
        const { userName, userPwd } = this.state
        if (!userName || !userPwd){
            Toast.error('请输入登录名和密码',1000)
            return
        }
        sessionStorage.setItem('uinfo','zbxjskdh1872xdv931')
        this.props.history.push('/')
    }
    render() {
        const { userName, userPwd } = this.state
        return(
            <div className="login-warp">
            <div className="add-photo">用户登录</div>
                <div className="login-inp">
                    <label>用户名</label>
                    <input type="text" value={userName} placeholder="请输入用户名" onChange={this.handleUserName} />
                </div>
                <div className="login-inp">
                    <label>用密码</label>
                    <input type="password" value={userPwd} onChange={this.handlePwd}  />
                </div>
                <button className="bnt" onClick={this.handlelogin}>登录</button>
            </div>
        )
    }
}
export default LoginComp