import React, { lazy, Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { history } from '../../App'
import Loading from '../../components/common/loading'

const LoginNotify = lazy(() => import('../LoginTron/loginNotify'))
const ConfirmRef = lazy(() => import('../LoginTron/confirmRef'))

export default () => {
    return (
        <Router history={history}>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path='/' component={LoginNotify} />
                    <Route path='/confirm-ref' component={ConfirmRef} />
                </Switch>
            </Suspense>
        </Router>
    )
}