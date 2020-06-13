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
import Signup from "./components/MainBody/dashboard/signUp";
import { toast } from "react-toastify";
import i18n from "i18n-js";
const DashBoard = lazy(() => import("../src/containers/dashboard"));
const SunNetwork = lazy(() => import("../src/containers/sunNetwork"));
const MatrixNetwork = lazy(() => import("../src/containers/matrixNetwork"));
const Partners = lazy(() => import("../src/containers/partners"));
const Transactions = lazy(() => import("../src/containers/transactionHistory"));
const BuyDFC = lazy(() => import("../src/containers/buyDFC"));
const Instruction = lazy(() => import("../src/containers/dashboard"));

export default ({ setUpdate }) => {
  const { usdt, address, member } = useContext(TronContract);
  const [approve, setApprove] = useState(false);
  const [username, setUsername] = useState("");
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

  useEffect(() => {
    member
      .users(address)
      .call()
      .then((info: any) => {
        // console.log('info', info)
        setUsername(info.username);
        if (info.username !== "") {
          setShowPop(false);
        }
      });
  }, []);
  const [loading, setLoading] = useState(false);
  const register = async (_username) => {
    setLoading(true);
    const regex = /^[a-z0-9]{2,}$/g;
    const found = _username.match(regex);
    if (found) {
      let valid = await validRef(_username);
      if (valid) {
        await member.setUsername(_username).send({
          callValue: 0,
          feeLimit: 1e7,
          shouldPollResponse: true,
        });
        toast.success(i18n.t("signupUsernameSuccessful"), {
          position: "top-center",
        });
        setUpdate(Math.random());
        setLoading(false);
        setShowPop(false);
      } else {
        toast.error(i18n.t("usernameexist"), { position: "top-center" });
        setLoading(false);
      }
    } else {
      toast.error(i18n.t("usernameNotValid"), { position: "top-center" });
      setLoading(false);
    }
  };
  const validRef = async (_username) => {
    let result = await member.validUsername(_username).call();
    return result;
  };
  const [showPop, setShowPop] = useState(username === "");
  return (
    <Router history={history}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route path="/sun-network" component={SunNetwork} />
          <Route path="/matrix-network" component={MatrixNetwork} />
          <Route path="/partners" component={Partners} />
          <Route path="/transaction-history" component={Transactions} />
          <Route path="/buy-dfc" component={BuyDFC} />
          {/* <Route path="/instructions" component={Instruction} /> */}
        </Switch>
      </Suspense>
      {showPop ? (
        <Signup
          showPop={showPop}
          setShowPop={setShowPop}
          register={register}
          username={username}
          setUsername={setUsername}
          loading={loading}
        />
      ) : null}
    </Router>
  );
};
