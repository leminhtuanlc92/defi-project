import React, { memo, Suspense, useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import { history } from "../../../App";
import { Router, Route, Switch } from "react-router-dom";
import Loading from "../../common/loading";
import TransactionTable from "./transactionTable";
import Pagination from "../../common/core/Pagination";
import { TronContract } from "../../../contexts/tronWeb";
import axios from "axios";
export default () => {
  const { address } = useContext(TronContract);
  const [page, setPage] = useState(1)
  const getTransaction = async () => {
    let result = await axios.get(
      `https://api.trongrid.io/v1/accounts/${address}/transactions?only_from=true&limit=100`
    );
    console.log(result.data.data);
  };
  useEffect(() => {
    getTransaction();
  }, [address]);
  // const data = [
  //   {
  //     time: 1591351464,
  //     username: "Dung do te",
  //     address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
  //     amount: 0.5,
  //     currency: "eth",
  //     tx: "0x887682f1cd8baff433ddc4fd009491228",
  //   },
  //   {
  //     time: 1591351464,
  //     username: "Dung do te",
  //     address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
  //     amount: 0.5,
  //     currency: "eth",
  //     tx: "0x887682f1cd8baff433ddc4fd009491228",
  //   },
  //   {
  //     time: 1591351464,
  //     username: "Dung do te",
  //     address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
  //     amount: 0.5,
  //     currency: "eth",
  //     tx: "0x887682f1cd8baff433ddc4fd009491228",
  //   },
  //   {
  //     time: 1591351464,
  //     username: "Dung do te",
  //     address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
  //     amount: 0.5,
  //     currency: "eth",
  //     tx: "0x887682f1cd8baff433ddc4fd009491228",
  //   },
  // ];
  const [historyTxs, setHistoryTxs] = useState([]);
  return (
    <TransactionHistoryWrap>
      <span id="transaction_main_title">{i18n.t("transactionHistory")}</span>
      <div id="transaction_mainbody">
        <div id="tm_list_header">
          <div className="tml_time">
            <span>{i18n.t("time")}</span>
          </div>
          <div className="tml_username">
            <span>{i18n.t("username")}</span>
          </div>
          <div className="tml_address">
            <span>{i18n.t("address")}</span>
          </div>
          <div className="tml_amount">
            <span>{i18n.t("amount")}</span>
          </div>
          <div className="tml_tx">
            <span>{i18n.t("tx")}</span>
          </div>
        </div>
        <div id="tm_list_body">
          <Router history={history}>
            <Suspense fallback={<Loading />}></Suspense>
            <Switch>
              <Route
                path="/transaction-history"
                render={(props) => (
                  <TransactionTable {...props} data={historyTxs} />
                )}
              />
            </Switch>
          </Router>
        </div>
        {/* <Pagination currentPage={page} totalPage={1} size={5} url="/history" setPage={setPage}/> */}
      </div>
    </TransactionHistoryWrap>
  );
};

const TransactionHistoryWrap = memo(styled.div`
  flex: 1;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  #transaction_main_title {
    font-size: ${Texts.size.huge};
    line-height: ${Texts.size.huge};
    color: ${Colors.black};
    margin-bottom: 10px;
    font-weight: 500;
  }
  #transaction_mainbody {
    background-color: ${Colors.white};
    flex-direction: column;
    flex: 1;
    border-radius: 10px;
    #tm_list_header {
      margin: 0 20px;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 1px ${Colors.black};
      span {
        font-size: ${Texts.size.large};
        line-height: ${Texts.size.large};
        color: ${Colors.black};
        font-weight: 500;
      }
    }
    #tm_list_body {
      flex: 0.08;
      flex-grow: 9;
      overflow-y: scroll;
    }
    .tml_time {
      flex: 0.15;
      flex-wrap: wrap;
      align-items: center;
      padding: 0 5px 0 0;
    }
    .tml_username {
      flex: 0.15;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 0 5px;
    }
    .tml_address {
      flex: 0.25;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 0 5px;
    }
    .tml_amount {
      flex: 0.2;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 0 5px;
    }
    .tml_tx {
      flex: 0.25;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-items: center;
      padding: 0 0 0 5px;
    }
  }
`);
