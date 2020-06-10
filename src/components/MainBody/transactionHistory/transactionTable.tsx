
import React, { memo, Fragment } from "react";
import styled from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import TransactionHistoryItem from './transactionHistoryItem'
interface TransactionTableProps {
    data: Array<HistoryItem>;
}
interface HistoryItem {
    time: number;
    username: string;
    address: string;
    amount: number;
    currency: string;
    tx: string
}
export default ({ data }: TransactionTableProps) => {
    return (
        <TransactionTableWrap>
            {data.length > 0 ?
                <Fragment>
                    {data.map((item, index) => {
                        return (
                            <TransactionHistoryItem
                                key={index}
                                time={item.time}
                                username={item.username}
                                address={item.address}
                                amount={item.amount}
                                currency={item.currency}
                                tx={item.tx}
                                lastItem={index === data.length - 1}
                            />
                        )
                    })}
                </Fragment>
                :
                <div id="sr_empty_list">
                    <span>{i18n.t('noResult')}</span>
                </div>
            }
        </TransactionTableWrap>
    )
}
const TransactionTableWrap = memo(styled.div`
    width: 100%;
    display: block;
    #sr_empty_list{
        flex:1;
        align-items:center;
        justify-content:center;
        margin-top:10px;
        span{
            font-size: ${Texts.size.large};
            line-height: ${Texts.size.large};
            color: ${Colors.black3};
        }
    }
`)