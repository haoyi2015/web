import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// Redirect 重定向
import Home from './pages/Home'
import About from './pages/About'
import Cont from './pages/Cont'
import Nomatch from './pages/404'

import Login from './pages/Login'

function RouterList(props){
    // 监控路由变化 withRouter（高级组件hock，参数是组件返回也是组件）

    // exact精准匹配路由
    // <Redirect to="/"></Redirect> 路由重定向
    return <Router>
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/cont/:id" exact component={Cont}></Route>
            <Route path="*" component={Nomatch}></Route>
        </Switch>
    </Router>
}
export default RouterList