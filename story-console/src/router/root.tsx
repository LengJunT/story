import  * as React from 'react'
import  { Router, Route, Switch } from 'react-router-dom'
import {createBrowserHistory} from 'history'
import Loadable from 'react-loadable'
import Res404 from '../component/result/404'

import login from '../view/login'
const history = createBrowserHistory()
const loadingPage = Res404
const asyncApp = Loadable({
    loader: () => import('../container/app'/* webpackChunkName: 'app' */),
    loading: loadingPage
  })
export default function RouteMapping() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/console/login" exact component={login} />
                <Route component={asyncApp} />
            </Switch>
        </Router>
    )
}