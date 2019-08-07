import  * as React from 'react'
import  { Router, Route, Switch } from 'react-router-dom'
import {createBrowserHistory} from 'history'
import login from '../view/login'
const history = createBrowserHistory()
export default function RouteMapping() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" component={login} />
            </Switch>
        </Router>
    )
}