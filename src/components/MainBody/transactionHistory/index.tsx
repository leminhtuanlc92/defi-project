import React, { memo, Suspense } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import { history } from '../../../App'
import { Router, Route, Switch } from 'react-router-dom'
import Loading from '../../common/loading'
import TransactionTable from './transactionTable'
import Pagination from '../../common/core/Pagination'
export default () => {
    const data = [
        { time: 1591351464, username: 'Dung do te', address: '0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9', amount: 0.5, currency: 'eth', tx: '0x887682f1cd8baff433ddc4fd009491228' },
        { time: 1591351464, username: 'Dung do te', address: '0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9', amount: 0.5, currency: 'eth', tx: '0x887682f1cd8baff433ddc4fd009491228' },
        { time: 1591351464, username: 'Dung do te', address: '0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9', amount: 0.5, currency: 'eth', tx: '0x887682f1cd8baff433ddc4fd009491228' },
        { time: 1591351464, username: 'Dung do te', address: '0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9', amount: 0.5, currency: 'eth', tx: '0x887682f1cd8baff433ddc4fd009491228' },
    ]
    return (
        <TransactionHistoryWrap>
            <span id="transaction_main_title">{i18n.t('transactionHistory')}</span>
            <div id="transaction_mainbody">
                <div id="tm_list_header">
                    <div className="tml_time">
                        <span>{i18n.t('time')}</span>
                    </div>
                    <div className="tml_username">
                        <span>{i18n.t('username')}</span>
                    </div>
                    <div className="tml_address">
                        <span>{i18n.t('address')}</span>
                    </div>
                    <div className="tml_amount">
                        <span>{i18n.t('amount')}</span>
                    </div>
                    <div className="tml_tx">
                        <span>{i18n.t('tx')}</span>
                    </div>
                </div>
                <div id="tm_list_body">
                    <Router history={history}>
                        <Suspense fallback={<Loading />}></Suspense>
                        <Switch>
                            <Route path="/transaction-history"
                                render={(props) => <TransactionTable {...props}
                                    data={data}
                                />} />
                        </Switch>
                    </Router>
                </div>
                <Pagination currentPage={1} totalPage={5} size={5} url="/history" />
            </div>
        </TransactionHistoryWrap>
    )
}

const TransactionHistoryWrap = memo(styled.div`
  flex: 1;
  width: 100%;
  flex-direction: column;
  overflow-y:scroll;
  #transaction_main_title{
    font-size: ${Texts.size.huge};
    line-height: ${Texts.size.huge};
    color: ${Colors.black};
    margin-bottom: 10px;
    font-weight: 500;
  }
  #transaction_mainbody{
    background-color:${Colors.white};
    flex-direction:column;
    flex:1;
    border-radius:10px;
    #tm_list_header{
        margin:0 20px;
        flex:1;
        justify-content:space-between;
        align-items:center;
        border-bottom: solid 1px ${Colors.black};
        span{
            font-size: ${Texts.size.large};
            line-height: ${Texts.size.large};
            color: ${Colors.black};
            font-weight: 500;
        }
    }
    #tm_list_body{
        flex:.08;
        flex-grow:9;
        overflow-y:scroll;
    }
    .tml_time{
        flex:.15;
        flex-wrap:wrap;
        align-items:center;
        padding:0 5px 0 0;
    }
    .tml_username{
        flex:.15;
        flex-wrap:wrap;
        justify-content:center;
        align-items:center;
        padding:0 5px;
    }
    .tml_address{
        flex:.25;
        flex-wrap:wrap;
        justify-content:center;
        align-items:center;
        padding:0 5px;
    }
    .tml_amount{
        flex:.2;
        flex-wrap:wrap;
        justify-content:center;
        align-items:center;
        padding:0 5px;
    }
    .tml_tx{
        flex:.25;
        flex-wrap:wrap;
        justify-content:flex-end;
        align-items:center;
        padding:0 0 0 5px;
    }
  }
`)