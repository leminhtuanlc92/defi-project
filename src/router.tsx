import React, {
  lazy,
  Suspense,
  useState,
  useEffect,
  useContext,
  Fragment,
} from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "../src/App";
import Loading from "../src/components/common/loading";
import { TronContract } from "../src/contexts/tronWeb";
import { contract } from "../src/config";
const DashBoard = lazy(() => import("../src/containers/dashboard"));
const SunNetwork = lazy(() => import("../src/containers/sunNetwork"));
const MatrixNetwork = lazy(() => import("../src/containers/matrixNetwork"));
const Partners = lazy(() => import("../src/containers/partners"));
const Transactions = lazy(() => import("../src/containers/transactionHistory"));
const BuyDFC = lazy(() => import("../src/containers/buyDFC"));
const Instruction = lazy(() => import("../src/containers/dashboard"));

export default () => {
  const { usdt, address, member } = useContext(TronContract);
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
  const [username, setUsername] = useState("");
  useEffect(() => {
    member
      .users(address)
      .call()
      .then((info: any) => {
        setUsername(info.username);
      });
  }, []);
  return (
    <Router history={history}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={DashBoard} />
          {/* {approve ? */}
          <Fragment>
            <Route path="/sun-network" component={SunNetwork} />
            <Route path="/matrix-network" component={MatrixNetwork} />
            <Route path="/partners" component={Partners} />
            <Route path="/transaction-history" component={Transactions} />
            <Route path="/buy-dfc" component={BuyDFC} />
            <Route path="/instructions" component={Instruction} />
          </Fragment>
          {/* :
                        null
                    } */}
        </Switch>
      </Suspense>
      {username === "" ? <div>Signup</div> : null}
    </Router>
  );
};
