import React from 'react'
// 引入connect
import { connect } from 'react-redux'

class BuyBnt extends React.Component{
    constructor(props){
        super(props)
    }
    add =() =>{
        // 发送action 加数量
        this.props.addAction()
    }
    jian =() =>{
        // 发送action 加数量
        this.props.jianAction()
    }
    render() {
        const count = this.props.count
        return (
            <div className="add-buy">
            { count > 0 &&
                <>
                    <button className="jian" onClick={this.jian}></button>
                    <span>{count}</span>
                </>
            }
            <button className="add" onClick={this.add}></button>
            </div>
        )
    }
}

// 发送方 要有返回值，是对象
const mapDispatchProps = (dispatch) =>{
    return {
        addAction: () =>{
            dispatch({
                type: 'ADD_TYPE'
            })
        },
        jianAction: () =>{
            dispatch({
                type: 'JIAN_TYPE'
            })
        }
    }
}
// 接收函数
const mapStateToProps = (state) =>{
    return state
}
// 不接收参数以null
export default connect(mapStateToProps,mapDispatchProps)(BuyBnt)