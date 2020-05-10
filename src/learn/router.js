import {
    HashRouter,
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'

function RouterComponent () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}>
                {/* 动态路由 */}
                <Route path='/detail/:id' exact component={Detail}></Route>
                {/* 匹配404等页面 */}
                <Route path='*' exact component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    )
}



