import React from 'react'
// 接收方 redux引入
import { connect } from 'react-redux'
// 子路由不能跳转 问题解决 路由跳转
import { withRouter } from 'react-router-dom'

import Toast from '../../toast';

class CartNav extends React.Component{
    componentDidMount(){
        //this.setState({})
    }
    settlement=()=>{
        console.log(this.props)
        let user = sessionStorage.getItem('uinfo')||''
        if(this.props.count<1){
            Toast.error('请选择购买数量')
            return false
        }
        if(!user){
            this.props.history.push('/login')
        }
        else{
            Toast.success('购买成功！')
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <div className="cart-nav">
                <a><em>{this.props.count}</em></a>
                <button onClick={this.settlement}>去买单</button>
            </div>
        )
    }
}
// 接收函数
const mapStateToProps = (state) =>{
    return state
}
export default withRouter(connect(mapStateToProps)(CartNav))