import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import SearchNodes from './searchNodes'
import ChartNodes from './chartNodes'
import MatchPendingUser from './matchPendingUser'
export default () => {
    return (
        <MatrixNetworkWrap>
            <span id="matrixnetwork_main_title">{i18n.t('matrixNetwork')}</span>
            <div id="matrixnetwork_mainbody">
                <div id="mtnmb_left">
                    <ChartNodes />
                    <MatchPendingUser />
                </div>
                <div id="mtnmb_right">
                    <SearchNodes />
                </div>
            </div>
        </MatrixNetworkWrap>
    )
}

const MatrixNetworkWrap = memo(styled.div`
    flex: 1;
    width: 100%;
    flex-direction: column;
    overflow-y:scroll;
    #matrixnetwork_main_title{
        font-size: ${Texts.size.huge};
        line-height: ${Texts.size.huge};
        color: ${Colors.black};
        margin-bottom: 10px;
        font-weight: 500;
    }
    #matrixnetwork_mainbody{
        justify-content:space-between;
        flex:1;
        #mtnmb_left{
            flex-direction:column;
            /* flex:0.65; */
            width:65%;
        }
        #mtnmb_right{
            /* flex:0.35;
            margin-left:30px; */
            width:calc(35% - 30px);
        }
    }
`)