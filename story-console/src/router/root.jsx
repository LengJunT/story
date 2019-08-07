import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import login from '../view/login'
const history = createHistory()
export default function RouteMapping() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" component={login} />
            </Switch>
        </Router>
    )
}