import React, { useState, useEffect, Fragment, ReactNode } from "react";
import { contract, config } from "../config";
import * as qs from "query-string";
import LoginNotify from "../containers/LoginTron/loginNotify";
import ConfirmRef from "../containers/LoginTron/confirmRef";
import TronWeb from "tronweb";
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
  fundAddress,
  stakingAddress
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
  refConfirm: false,
  tronWeb: undefined as any,
  fund: undefined as any,
  staking: undefined as any
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
  try {
    let tronExists = await waitTron();
    if (!tronExists) {
      const tronWeb = new TronWeb({
        fullNode: config.mainNet,
        solidityNode: config.mainNet,
        eventServer: config.mainNet,
        privateKey:
          "EC60C070F98F768400F45CF0674092998B716E7B0D5C26F31E30B2E1A3785B7D",
      });
      let [
        usdt,
        member,
        token,
        matrixMember,
        matrixMarketing,
        userData,
        shareHolder,
        fund,
        staking
      ] = await Promise.all([
        tronWeb.contract().at(usdtAddress),
        tronWeb.contract().at(memberAddress),
        tronWeb.contract().at(tokenAddress),
        tronWeb.contract().at(matrixMemberAddress),
        tronWeb.contract().at(matrixMarketingAddress),
        tronWeb.contract().at(userDataAddress),
        tronWeb.contract().at(shareHolderAddress),
        tronWeb.contract().at(fundAddress),
        tronWeb.contract().at(stakingAddress),
      ]);



      return {
        isConnect: true,
        address:
          ((window as any).tronWeb &&
            (window as any).tronWeb.defaultAddress.base58) ||
          tronWeb.defaultAddress.base58,
        // address: "TFHfXWhnGSQpaukRMSj6uEMe8JogwDTqsQ",
        isAdmin: tronWeb.defaultAddress.base58 === adminAddress,
        member,
        token,
        matrixMember,
        userData,
        shareHolder,
        usdt,
        matrixMarketing,
        tronWeb,
        fund,
        staking
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
        fund,
        staking
      ] = await Promise.all([
        (window as any).tronWeb.contract().at(usdtAddress),
        (window as any).tronWeb.contract().at(memberAddress),
        (window as any).tronWeb.contract().at(tokenAddress),
        (window as any).tronWeb.contract().at(matrixMemberAddress),
        (window as any).tronWeb.contract().at(matrixMarketingAddress),
        (window as any).tronWeb.contract().at(userDataAddress),
        (window as any).tronWeb.contract().at(shareHolderAddress),
        (window as any).tronWeb.contract().at(fundAddress),
        (window as any).tronWeb.contract().at(stakingAddress),
      ]);
      // console.log("fund", fund);
      // await fund.recoveryData(1).send({
      //   callValue: 0,
      //   feeLimit: 2e6,
      //   shouldPollResponse: true,
      // });

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
        tronWeb: (window as any).tronWeb,
        fund,
        staking
      };
    }
  } catch (error) {
    const tronWeb = new TronWeb({
      fullNode: config.mainNet,
      solidityNode: config.mainNet,
      eventServer: config.mainNet,
      privateKey:
        "EC60C070F98F768400F45CF0674092998B716E7B0D5C26F31E30B2E1A3785B7D",
    });
    console.log("check", (window as any).tronWeb.defaultAddress);
    let [
      usdt,
      member,
      token,
      matrixMember,
      matrixMarketing,
      userData,
      shareHolder,
      fund,
      staking
    ] = await Promise.all([
      tronWeb.contract().at(usdtAddress),
      tronWeb.contract().at(memberAddress),
      tronWeb.contract().at(tokenAddress),
      tronWeb.contract().at(matrixMemberAddress),
      tronWeb.contract().at(matrixMarketingAddress),
      tronWeb.contract().at(userDataAddress),
      tronWeb.contract().at(shareHolderAddress),
      tronWeb.contract().at(fundAddress),
      tronWeb.contract().at(stakingAddress),
    ]);

    return {
      isConnect: true,
      address:
        ((window as any).tronWeb &&
          (window as any).tronWeb.defaultAddress.base58) ||
        tronWeb.defaultAddress.base58,
      // address: "TFHfXWhnGSQpaukRMSj6uEMe8JogwDTqsQ",
      isAdmin: tronWeb.defaultAddress.base58 === adminAddress,
      member,
      token,
      matrixMember,
      userData,
      shareHolder,
      usdt,
      matrixMarketing,
      tronWeb,
      fund,
      staking
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
    tronWeb: undefined,
    fund: undefined,
    staking: undefined
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
      if (parsed.r) {
        if (WAValidator.validate(parsed.r, "trx")) {
          if (window.localStorage) {
            window.localStorage.setItem("ref", (parsed as any).r);
          }
          setRef((parsed as any).r);
        } else {
          setRef(null as any);
        }
      } else if (parsed.u) {
        if (tronState.member) {
          let addressRef = await (tronState as any).member
            .username(parsed.u)
            .call();
          if (
            window.localStorage &&
            addressRef !== "410000000000000000000000000000000000000000"
          ) {
            window.localStorage.setItem(
              "ref",
              (window as any).tronWeb.address.fromHex(addressRef)
            );
          }
          setRef(
            addressRef !== "410000000000000000000000000000000000000000"
              ? (window as any).tronWeb.address.fromHex(addressRef)
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
  const [refConfirm, setRefConfirm] = useState(() => {
    let local = window.localStorage.getItem("confirmRef");
    if (local === ref) {
      return true;
    } else {
      return false;
    }
  });
  useEffect(() => {
    if (tronState.member) {
      (tronState.member as any)
        .isMember(tronState.address)
        .call()
        .then((is) => {
          if (is) {
            setRefConfirm(true);
          }
        });
    }
  }, [tronState.member]);
  const confirm = () => {
    window.localStorage.setItem("confirmRef", ref as any);
    setRefConfirm(true);
  };
  return (
    <TronContract.Provider value={{ ...tronState, ref, refConfirm }}>
      <Fragment>
        {tronState.isConnect && tronState.address ? (
          refConfirm ? (
            children
          ) : (
              <ConfirmRef confirm={confirm} />
            )
        ) : (
            <LoginNotify />
          )}
      </Fragment>
    </TronContract.Provider>
  );
};
export { TronContract };
