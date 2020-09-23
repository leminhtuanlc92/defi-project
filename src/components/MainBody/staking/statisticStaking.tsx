import React, { memo } from 'react'
import styled from 'styled-components'
import Colors from 'constants/Colors'
import Texts from 'constants/Texts'
import i18n from 'i18n-js'
interface StatisticStakingProps {
    title: string;
    value: number;
}
export default ({ title, value }: StatisticStakingProps) => {
    return (
        <StatisticStakingWrap>
            <div id="inner-content-info">
                <div id="inner-info-wrap">
                    <span id="info-content-title">{i18n.t(title)}</span>
                    <span id="info-content-value">
                        {i18n.toNumber(value, { precision: 0 })}
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
    background-color: ${Colors.white};
    box-shadow: 0 4px 6px 1px rgba(78, 78, 78, 0.16);
    position: relative;
    width: 18%;
    #inner-content-info {
        width: 100%;
        #inner-info-wrap {
        flex: 1;
        flex-direction: column;
        padding: 15px;
        #info-content-title {
            font-size: ${Texts.size.large};
            line-height: ${Texts.size.huge};
            color: ${Colors.black1};
            text-align: left;
            max-width: 100%;
            overflow: hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
        }
        #info-content-value {
            font-size: ${Texts.size.gigantic};
            line-height: ${Texts.size.gigantic};
            color: #ed8c47;
            text-align: center;
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