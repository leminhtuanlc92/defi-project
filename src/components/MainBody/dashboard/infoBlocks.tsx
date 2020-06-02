import React, { memo, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import Colors from '../../../constants/Colors'
import Texts from '../../../constants/Texts'
import i18n from 'i18n-js'
interface InfoBlockProps {
    item: Item;
    length: number;
}
interface Item {
    category: string;
    value: number;
}
export default ({ item, length }: InfoBlockProps) => {
    return (
        <InfoBlock length={length}>
            <div id="inner-content-info">
                <div id="inner-info-wrap">
                    <span id="info-content-title">{i18n.t(item.category)}</span>
                    <span id="info-content-value">{i18n.toNumber(item.value, {precision:0})}</span>
                </div>
            </div>
        </InfoBlock>
    )
}

const InfoBlock = memo(styled.div`
    flex-direction: column;
    align-items: center;
    justify-content:space-between;
    border-radius:10px;
    background-color: ${Colors.white};
    box-shadow: 0 4px 6px 1px rgba(78, 78, 78, .16);
    position:relative;
    width:18%;
    #inner-content-info{
        width:100%;
        #inner-info-wrap{
            flex:1;
            flex-direction: column;
            padding:15px;
            #info-content-title{
                font-size:${Texts.size.large};
                line-height: ${Texts.size.large};
                color: ${Colors.black1};
                text-align:left;
            }
            #info-content-value{
                font-size:${Texts.size.extra};
                line-height: ${Texts.size.extra};
                color: #ED8C47;
                text-align:center;
                font-weight: 700;
            }
        }
       
    }
`)