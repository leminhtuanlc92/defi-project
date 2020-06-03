import React, { lazy, Suspense, useState, useEffect, useContext, Fragment } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { history } from '../src/App'
import Loading from '../src/components/common/loading'
import { TronContract } from "../src/contexts/tronWeb";
import { contract } from "../src/config";
const DashBoard = lazy(() => import('../src/containers/dashboard'))
const SunNetwork = lazy(() => import('../src/containers/dashboard'))
const MatrixNetwork = lazy(() => import('../src/containers/dashboard'))
const Partners = lazy(() => import('../src/containers/dashboard'))
const Transactions = lazy(() => import('../src/containers/dashboard'))
const BuyShare = lazy(() => import('../src/containers/dashboard'))
const Instruction = lazy(() => import('../src/containers/dashboard'))

export default () => {
    const { usdt, address } = useContext(TronContract);
    const [approve, setApprove] = useState(false);
    //Checking USDT Approve
    useEffect(() => {
        const checkApprove = async () => {
            let remaining = (
                await usdt.allowance(address, contract.matrixMarketingAddress).call()
            ).remaining;
            if (Number(remaining) > 10 ** 10) {
                setApprove(true);
            }
        };
        checkApprove();
    }, []);

    return (
        <Router history={history}>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path='/' component={DashBoard} />
                    {approve ?
                        <Fragment>
                            <Route path='/sun-network' component={SunNetwork} />
                            <Route path='/matrix-network' component={MatrixNetwork} />
                            <Route path='/partners' component={Partners} />
                            <Route path='/transaction-history' component={Transactions} />
                            <Route path='/buy-share' component={BuyShare} />
                            <Route path='/instructions' component={Instruction} />
                        </Fragment>
                        :
                        null
                    }
                </Switch>
            </Suspense>
        </Router>
    )
}