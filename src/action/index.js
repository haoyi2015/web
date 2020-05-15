// 创建action构造函数
const sendAction = ((actionVal) =>{
    return {
        type: 'send_type',
        value: actionVal
    }
})
export default sendAction