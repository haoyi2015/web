import { createStore } from 'redux'
import reducers from '../reducers'

// 构建store
const store = createStore(reducers)

export default store