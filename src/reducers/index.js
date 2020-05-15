// 处理action传过来的值
const initState = {
    count: 0
}
const reducers = (state = initState, action) =>{
    switch(action.type){
        case 'send_type':
            return Object.assign({},state,action)
        case 'ADD_TYPE':
            return {
                count: state.count + 1
            }
        case 'JIAN_TYPE':
            return {
                count: state.count - 1
            }
        case 'LOGIN_TYPE':
            return 1111
        default:
            return state
    }
}
export default reducers