import React, { memo } from 'react'
import styled from 'styled-components'
import Colors from 'constants/Colors'
import Texts from 'constants/Texts'
import i18n from 'i18n-js'
const imgs = {
    totalStaking: require('assets/images/coins.svg'),
    earned: require('assets/images/fees.svg'),
    priceLumi: require('assets/images/coin.svg'),
    maxPayout: require('assets/images/salary.svg'),
    feeSwap: require('assets/images/price-tag.svg'),
    lumiBalance: require('assets/images/money.svg'),
    currentPayout: require('assets/images/salary.svg'),
}
interface StatisticStakingProps {
    title: string;
    value: number;
}
export default ({ title, value }: StatisticStakingProps) => {
    return (
        <StatisticStakingWrap>
            <div id="inner_content_info">
                <div className="ici_icon">
                    <img src={imgs[title]} alt="" />
                </div>
                <div id="inner_info_wrap">
                    <span id="info_content_title">{i18n.t(title)}</span>
                    <span id="info_content_value">
                        {i18n.toNumber(value, { precision: 2 })}
                    </span>
                </div>
            </div>
        </StatisticStakingWrap>
    )
}

const StatisticStakingWrap = memo(styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    background-color: ${Colors.orange5};
    border:solid 1px #EF89404D;
    position: relative;
    width: 18%;
    #inner_content_info {
        padding:1rem;
        .ici_icon{
            width:46px;
            height:46px;
            display:flex;
            align-items:center;
            justify-content:center;
            background-color:${Colors.white};
            border:solid 1px ${Colors.orange6};
            border-radius:5px;
            img{
                width:30px;
            }
        }
        #inner_info_wrap {
            flex-direction: column;
            padding: 0 0 0 1rem;
            #info_content_title {
                font-size: ${Texts.size.large};
                line-height: ${Texts.size.huge};
                color: ${Colors.black1};
                text-align: left;
                max-width: 100%;
                overflow: hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            #info_content_value {
                font-size: ${Texts.size.gigantic};
                line-height: ${Texts.size.gigantic};
                color: #ed8c47;
                text-align: left;
                font-weight: 700;
                max-width: 100%;
                overflow: hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
                @media (max-width: 480px) {
                    line-height: inherit;
                }
            }
        }
    }
    @media (max-width: 991px) {
        width: 48%;
        margin-bottom: 20px;
        &:last-child {
            width: 100%;
            margin-bottom: 0;
        }
    }
    @media (max-width: 767px) {
        width: 100%;
        margin-bottom: 15px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`)