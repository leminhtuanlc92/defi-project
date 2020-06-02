import React, { memo, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import Colors from '../../../constants/Colors'
import Texts from '../../../constants/Texts'
import i18n from 'i18n-js'
import InfoBlock from './infoBlocks'
export default () => {
    const data = [
        { category: 'totalReceive', value: 5412 },
        { category: 'stockRightBalance', value: 10000 },
        { category: 'fine', value: 1000 },
        { category: 'goldMemeber', value: 9999 },
        { category: 'shareHolding', value: 9000 }
    ]
    return (
        <DashboardWrap>
            <div id="db-personal-info-panel">
                <span id="db-info-title">{i18n.t('personalInfo')}</span>
                <div id="db-blocks">
                    {data.map((item, index) => {
                        return <InfoBlock item={item} key={index} length={data.length} />
                    })}
                </div>
            </div>

        </DashboardWrap>
    )
}

const DashboardWrap = memo(styled.div`
    border-top-left-radius:30px;
    border-top-right-radius:30px;
    flex:1;
    width:100%;
    #db-personal-info-panel{
        flex-direction:column;
        width:100%;
        #db-info-title{
            font-size:${Texts.size.huge};
            line-height: ${Texts.size.huge};
            color: ${Colors.black};
        }
        #db-blocks{
            width:100%;
            align-items:center;
            justify-content:space-between;
        }
    }
   
`)