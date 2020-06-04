import React, { useState, useEffect, Fragment, ReactNode } from "react";
import { contract } from "../config";
import * as qs from "query-string";
import LoginNotify from "../containers/LoginTron/loginNotify";
var WAValidator = require("multicoin-address-validator");
const {
  matrixMarketingAddress,
  matrixMemberAddress,
  userDataAddress,
  memberAddress,
  shareHolderAddress,
  tokenAddress,
  usdtAddress,
  adminAddress,
} = contract;
const TronContract = React.createContext({
  ref: undefined as any,
  member: undefined as any,
  token: undefined as any,
  matrixMember: undefined as any,
  userData: undefined as any,
  shareHolder: undefined as any,
  usdt: undefined as any,
  matrixMarketing: undefined as any,
  isConnect: false as any,
  address: undefined as any,
});

const waitTron = () => {
  return new Promise((res, rej) => {
    let attempts = 0,
      maxAttempts = 100;
    const checkTron = () => {
      if (
        (window as any).tronWeb &&
        (window as any).tronWeb.defaultAddress.base58
      ) {
        res(true);
        return;
      }
      attempts++;
      if (attempts >= maxAttempts) {
        rej(false);
        return;
      }
      setTimeout(checkTron, 100);
    };
    checkTron();
  });
};

const initContract = async () => {
  let tronExists = await waitTron();
  if (!tronExists) {
    return {
      isConnect: false,
      address: undefined,
      member: undefined,
      token: undefined,
      matrixMember: undefined,
      userData: undefined,
      shareHolder: undefined,
      usdt: undefined,
      matrixMarketing: undefined,
    };
  } else {
    let [
      usdt,
      member,
      token,
      matrixMember,
      matrixMarketing,
      userData,
      shareHolder,
    ] = await Promise.all([
      (window as any).tronWeb.contract().at(usdtAddress),
      (window as any).tronWeb.contract().at(memberAddress),
      (window as any).tronWeb.contract().at(tokenAddress),
      (window as any).tronWeb.contract().at(matrixMemberAddress),
      (window as any).tronWeb.contract().at(matrixMarketingAddress),
      (window as any).tronWeb.contract().at(userDataAddress),
      (window as any).tronWeb.contract().at(shareHolderAddress),
    ]);

    return {
      isConnect: true,
      address: (window as any).tronWeb.defaultAddress.base58,
      // address: "TFHfXWhnGSQpaukRMSj6uEMe8JogwDTqsQ",
      isAdmin: (window as any).tronWeb.defaultAddress.base58 === adminAddress,
      member,
      token,
      matrixMember,
      userData,
      shareHolder,
      usdt,
      matrixMarketing,
    };
  }
};

interface IProps {
  children: ReactNode;
}
export default ({ children }: IProps) => {
  const [tronState, setTronState] = useState({
    isConnect: false,
    address: undefined,
    member: undefined,
    token: undefined,
    matrixMember: undefined,
    userData: undefined,
    shareHolder: undefined,
    usdt: undefined,
    matrixMarketing: undefined,
  });
  const [ref, setRef] = useState(() => {
    let local = window.localStorage.getItem("ref");
    if (local) {
      return local;
    } else {
      return undefined;
    }
  });

  useEffect(() => {
    const getRef = async () => {
      const parsed = qs.parse(window.location.search);
      if (parsed.ref) {
        if (WAValidator.validate(parsed.ref, "trx")) {
          if (window.localStorage) {
            window.localStorage.setItem("ref", (parsed as any).ref);
          }
          setRef((parsed as any).ref);
        } else {
          setRef(null as any);
        }
      } else if (parsed.username) {
        if (tronState.member) {
          let addressRef = await (tronState as any).member
            .username(parsed.username)
            .call();
          setRef(
            addressRef !== "410000000000000000000000000000000000000000"
              ? addressRef
              : null
          );
        }
      } else if (ref === undefined) {
        setRef(null as any);
      }
    };
    getRef();
  }, [tronState.member]);
  useEffect(() => {
    initContract().then((state) => {
      setTronState(state);
    });
  }, []);
  // console.log(tronState);
  return (
    <TronContract.Provider value={{ ...tronState, ref }}>
      <Fragment>
        {tronState.isConnect && tronState.address ? children : <LoginNotify />}
      </Fragment>
    </TronContract.Provider>
  );
};
export { TronContract };
