import React, { lazy, Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { history } from '../src/App'
import Loading from '../src/components/common/loading'

const DashBoard = lazy(() => import('../src/containers/dashboard'))
const SunNetwork = lazy(() => import('../src/containers/dashboard'))
const MatrixNetwork = lazy(() => import('../src/containers/dashboard'))
const Partners = lazy(() => import('../src/containers/dashboard'))
const Transactions = lazy(() => import('../src/containers/dashboard'))
const BuyShare = lazy(() => import('../src/containers/dashboard'))
const Instruction = lazy(() => import('../src/containers/dashboard'))

export default () => {
    return (
        <Router history={history}>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path='/' component={DashBoard} />
                    <Route path='/sun-network' component={SunNetwork} />
                    <Route path='/matrix-network' component={MatrixNetwork} />
                    <Route path='/partners' component={Partners} />
                    <Route path='/transaction-history' component={Transactions} />
                    <Route path='/buy-share' component={BuyShare} />
                    <Route path='/instructions' component={Instruction} />
                </Switch>
            </Suspense>
        </Router>
    )
}