import React from 'react'

class ClockComp extends React.Component{
    constructor(props){
        super(props)
        // 初始化
        this.state = {
            date: new Date(),
            num: '初始赋值'
        }
    }
    // 每秒执行更新state
    tickTime() {
        this.setState({
            date: new Date()
        })
    }
    // 更新时钟  render之后执行
    componentDidMount(){
        console.log('时钟---componentDidMount')
        //this.timeID = setInterval(() => {
            this.setState({
                date: new Date()
            })
        //}, 1000);

        // state是异步更新，可通过state，props来获取
        this.setState((state,props)=>{
            console.log(state,props)
        })

        // 赋值num 可能无法更新num
        // this.setState({
        //     num:this.state.num+this.props.increment
        // })
        // 更新方法
        this.setState((state,props) =>({
            num: state.num+props.increment,
        }))
        // sate更新会被合并，如果需要单独使用
        // fetchPosts().then(res =>{
        //     this.setState({
        //         posts: res.posts
        //     });
        // })
    }
    // 清除定时器(销毁时)
    componentWillUnmount(){
        console.log('时钟---componentWillUnmount')
        clearInterval(this.timeID)
    }
    // 回调拿到最新的值
    updateNum=(val) =>{
        this.setState(
            { num: val},
            () =>{
                console.log(this.state.num)
            }
        )
    }
    render() {
        console.log('时钟---render')
        return(
            <div>
                <h2>时钟计时器</h2>
                <span>时间：{this.state.date.toLocaleTimeString()}</span>
                <h2>时间子组件</h2>
                <FormattedDate date={this.state.date}/>
                <h2>state异步更新</h2>
                <span>{ this.state.num }</span>
                <br/>
                <button onClick={() => this.updateNum(100)}>updateNum</button>
            </div>
        )
    }
}

function FormattedDate(props){
    return <h3>时间：{props.date.toLocaleTimeString()}</h3>
}

export default ClockComp