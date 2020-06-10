import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import SearchNodes from "./searchNodes";
import ChartNodes from "./chartNodes";
import MatchPendingUser from "./matchPendingUser";
import { TronContract } from "../../../contexts/tronWeb";
const notLogImg = require('../../../assets/images/contact.svg')
export default () => {
  const [isActive, setIsActive] = useState(false);
  const { address, matrixMember } = useContext(TronContract);
  useEffect(() => {
    matrixMember
      .isActiveMatrix(address)
      .call()
      .then((active) => {
        setIsActive(active);
      });
  }, []);
  return (
    <MatrixNetworkWrap>
      <span id="matrixnetwork_main_title">{i18n.t("matrixNetwork")}</span>
      <div id="matrixnetwork_mainbody">
        {isActive ?
          <Fragment>
            <div id="mtnmb_left">
              <ChartNodes />
              <MatchPendingUser />
            </div>
            <div id="mtnmb_right">
              <SearchNodes />
            </div>
          </Fragment>
          :
          <div id="matrixnetwork_mainbody_nolog">
            <div id="mtnmb_notlog_left">
              <span>OOPS!</span>
              <span>{i18n.t('matrixNotLogQuote1')}</span>
              <span>{i18n.t('matrixNotLogQuote2')}</span>
              <img src={notLogImg} alt="" />
            </div>
            <div id="mtnmb_notlog_right">
              <span>{i18n.t('refferalInfo')}</span>
              <div id="mtnmbnlr_inner">
                <div>
                  <span>{i18n.t('username')}:</span>
                  <span>Dungdothuy</span>
                </div>
                <div>
                  <span>{i18n.t('level')}:</span>
                  <span>2</span>
                </div>
                <div>
                  <span>{i18n.t('address')}:</span>
                  <span>0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9</span>
                </div>
              </div>
            </div>
            </div>
        }


      </div>
    </MatrixNetworkWrap>
  );
};

const MatrixNetworkWrap = memo(styled.div`
  flex: 1;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  #matrixnetwork_main_title {
    font-size: ${Texts.size.huge};
    line-height: ${Texts.size.huge};
    color: ${Colors.black};
    margin-bottom: 10px;
    font-weight: 500;
  }
  #matrixnetwork_mainbody {
    justify-content: space-between;
    flex: 1;
    #mtnmb_left {
      flex-direction: column;
      width: 65%;
    }
    #mtnmb_right {
      width: calc(35% - 30px);
    }
    #matrixnetwork_mainbody_nolog{
      background-color:${Colors.white};
      border-radius:10px;
      justify-content:space-around;
      align-items:center;
      padding:15px;
      #mtnmb_notlog_left{
        flex:0.4;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        span{
          &:first-child{
            color: ${Colors.orange};
            font-size: ${Texts.size.extra};
            line-height: ${Texts.size.extra};
            font-weight: bold;
            margin-bottom: 30px
          }
          &:nth-child(2), :nth-child(3){
            color: ${Colors.black};
            font-size: ${Texts.size.large};
            line-height: ${Texts.size.large};
            margin-bottom:10px;
            text-align:center;
          }
        }
        img{
          margin-top:30px;
        }
      }
      #mtnmb_notlog_right{
        flex:0.45;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        &>span{
            color: ${Colors.black};
            font-size: ${Texts.size.huge};
            line-height: ${Texts.size.huge};
            margin-bottom: 30px
        }
        #mtnmbnlr_inner{
          border:solid 1px ${Colors.green};
          border-radius:5px;
          flex-direction:column;
          padding:20px;
          background-color:${Colors.white4};
          width:calc(100% - 62px);
          div{
            flex:1;
            justify-content:space-between;
            align-items:flex-start;
            margin-bottom:10px;
            span{
              color: ${Colors.black};
              font-size: ${Texts.size.large};
              line-height: ${Texts.size.large};
              &:first-child{
                flex:0.4;
                text-transform:uppercase;
                text-align:right;
                @media (max-width:480px){
                  margin-bottom:5px;
                }
              }
              &:nth-child(2){
                flex:0.55;
                font-weight:500;
                line-break: anywhere;
              }
            }
            @media (max-width:480px){
              flex-direction:column;
              margin-bottom:20px;
            }
          }
        }
      }
      @media (max-width:991px){
        flex-direction:column;
        width:100%;
        #mtnmb_notlog_right, #mtnmb_notlog_left{
          flex:1;
        }
      }
    }
  }
`);
