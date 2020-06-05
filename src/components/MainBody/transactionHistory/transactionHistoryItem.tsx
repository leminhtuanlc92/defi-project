import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from 'i18n-js'
import moment from 'moment'
interface HistoryItemProps {
    time: number,
    username: string,
    address: string,
    amount: number,
    currency: string;
    tx: string;
    lastItem?: boolean
}
export default ({ time, username, address, amount, currency, tx, lastItem }: HistoryItemProps) => {
    return (
        <HistoryItemWrap lastItem={lastItem}>
            <div className="tml_time">
                <span>{moment(time).format("DD/MM/YYYY")}</span>
            </div>
            <div className="tml_username">
                <span>{username}</span>
            </div>
            <div className="tml_address">
                <span>{address}</span>
            </div>
            <div className="tml_amount">
                <span>{amount} {currency}</span>
            </div>
            <div className="tml_tx">
                <span>{tx}</span>
            </div>
        </HistoryItemWrap>
    )
}

const HistoryItemWrap = memo(styled.div`
    flex:1;
    justify-content:space-between;
    align-items:center;
    padding:15px 20px;
    position:relative;
    &:after{
        position:absolute;
        content:'';
        width:calc(100% - 40px);
        bottom:0;
        left:20px;
        ${(props: any) => props.lastItem ?
        css`height:0px;`
        :
        css`height:1px;`
    };
        background-color:${Colors.black};
    }
    div{
        overflow:hidden;
    }
    span{
        font-size: ${Texts.size.large};
        line-height: ${Texts.size.large};
        color: ${Colors.black};
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &:hover{
        background-color:${Colors.green6};
        box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, .1);
        &:after{
            height:0;
        }
    }
    .tml_time{
        span{
            text-align:left;
        }
    }
    .tml_username{
        span{
            text-align:center;
        }
    }
    .tml_address{
        span{
            text-align:center;
        }
    }
    .tml_amount{
        span{
            text-align:center;
        }
    }
    .tml_tx{
        span{
            text-align:right;
        }
    }
`)