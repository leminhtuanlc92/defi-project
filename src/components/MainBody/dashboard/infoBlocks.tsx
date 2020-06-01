import React, { memo, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import Colors from '../../../constants/Colors'
import Texts from '../../../constants/Texts'
import i18n from 'i18n-js'
interface InfoBlockProps {
    item: Item;
}
interface Item{
    category: string;
    value: number;
}
export default ({ item }: InfoBlockProps) => {
    return (
        <InfoBlock>
            <div id="inner-content-info">
                <span  id="info-content-title">{i18n.t(item.category)}</span>
                <span id="info-content-value">{item.value}</span>
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
    #inner-content-info{
        padding:15px;
        #info-content-title{
            font-size:${Texts.size.large};
            line-height: ${Texts.size.large};
            color: ${Colors.black1};
        }
        #info-content-value{
            font-size:${Texts.size.extra};
            line-height: ${Texts.size.extra};
            color: #ED8C47;
        }
    }
`)