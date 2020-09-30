import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import Colors from 'constants/Colors'
const coinImg = {
    eth: require('assets/images/eth-coin.png')
}
const checked = require('assets/images/checked.svg')
interface StakingItemProps {
    index: number;
    amount: number;
    time: number;
    fullfill: boolean;
    coin: string
}
export default ({ index, amount, time, fullfill, coin }: StakingItemProps) => {
    return (
        <StakingItemWrap index={index}>
            <div>
                <span>{index + 1}</span>
            </div>
            <div>
                <span>{amount}</span>
                <img src={coinImg[coin]} alt="" />
            </div>
            <div>
                <span>{moment(time).format('DD/MM/YYYY - HH:mm')}</span>
            </div>
            <div>
                {fullfill ?
                    <img src={checked} alt="" />
                    :
                    <span></span>
                }
            </div>
        </StakingItemWrap>
    )
}

const StakingItemWrap = memo(styled.div`
    align-items:center;
    justify-content:space-between;
    position:relative;
    padding: 0.7rem 0;
    &:after{
        ${(props: any) => props.index < 9 && css`content:'';`}
        position:absolute;
        bottom:-1px;
        left:0;
        width:100%;
        height:1px;
        background:${Colors.black2};
    }
    >div{
        display:block;
        span{
            color:${Colors.black};
        }
        &:first-child{  
            flex:1;
            text-align:left;
        }
        &:nth-child(2){
            flex:3;
            display:flex;
            align-items:center;
            justify-content:center;
            span{
                font-weight:500;
                margin-right:0.3rem;
            }
        }
        &:nth-child(3){
            flex:4;
            text-align:center;
        }
        &:last-child{
            flex:2;
            text-align:right;
            span{
                width:16px;
                height:16px;
                display:inline-block;
                border-radius:50%;
                border:solid 2px ${Colors.black1};
            }
            img{
                width:20px;
                height:20px;
            }
        }
    }
`)