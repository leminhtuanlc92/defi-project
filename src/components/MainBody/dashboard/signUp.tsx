import React, { memo, useState, Fragment, useContext, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import moment from "moment";
import Select from "../../common/core/Select";
import ClickOutside from "../../../utils/clickOutSide";
import { TronContract } from "../../../contexts/tronWeb";
import { contract } from "../../../config";
import Loading from '../../common/loading'
const closeImg = require("../../../assets/images/close.png");
const signUpImg = require('../../../assets/images/sign-up.svg')
interface PopUpgradeProps {
    showPop: boolean;
    setShowPop: any;
    register: (user) => void;
    username: string;
    setUsername: any;
    loading: boolean
}

export default ({ showPop, setShowPop, register, username, setUsername, loading }: PopUpgradeProps) => {
    return (
        <PopUpgradeWrap>
            <ClickOutside
                style={{ minWidth: "60%", minHeight: "50%" }}
                handleClickOutSide={() => {
                    setShowPop(false);
                }}
            >
                <div id="pop_signup_content">
                    <div id="pop_signup_content_inner">
                        <div id="psci_left">
                            <img src={signUpImg} alt="" />
                        </div>
                        <div id="psci_right">
                            <div id="pscir_head">
                                <h4 id="pscirh_title">{i18n.t('signUp')}</h4>
                                <span id="pscirh_quote">{i18n.t('signUpQuote')}</span>
                            </div>
                            <div id="pscir_input">
                                <input placeholder={`${i18n.t('username')}`} onChange={e => setUsername(e.target.value)} />
                            </div>
                            <button onClick={() => {
                                !loading && register(username)
                            }}>
                                {loading ? <Loading color={Colors.white} size={20} /> : i18n.t('signUp')}
                            </button>
                        </div>
                    </div>
                    <div id="pop_signup_close_button"
                        onClick={() => { setShowPop(!showPop); }}
                    >
                        <img src={closeImg} alt="" />
                    </div>
                </div>
            </ClickOutside>
        </PopUpgradeWrap>
    );
};

const PopUpgradeWrap = memo(styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: rgba(34, 34, 34, 0.8);
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  #pop_signup_content {
    flex: 1;
    background: ${Colors.white};
    align-items: center;
    position: relative;
    #pop_signup_content_inner {
      flex: 1;
      align-items: center;
      width: 100%;
      height:100%;
      #psci_left{
          align-items:center;
          flex:.4;
          height:100%;
          background-color: ${Colors.green7};
          justify-content:center;
          img{
              max-width:100%;
              object-fit:contain
          }
          @media (max-width:767px){
              display:none;
          }
      }
        #psci_right{
            flex:.6;
            height:100%;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            padding:30px;
            @media (max-width:767px){
              flex:1;
            }
            #pscir_head{
                flex-direction:column;
                align-items:center;
                max-width:70%;
                margin-bottom:30px;
                #pscirh_title{
                    font-size: ${Texts.size.extra};
                    color: ${Colors.green1};
                    text-transform: uppercase;
                    margin-bottom: 15px;
                }
                #pscirh_quote{
                    font-size: ${Texts.size.large};
                    color: ${Colors.black};
                    @media (max-width:767px){
                        text-align:center;
                    }
                }
            }
            #pscir_input{
                align-items:center;
                width:80%;
                margin-bottom:30px;
                input{
                    flex:1;
                    padding:10px;
                    border:solid 1px ${Colors.black};
                    border-radius: 5px;
                }
            }
            button{
            border-radius: 5px;
            background-color: ${Colors.orange};
            box-shadow: none;
            color: ${Colors.white};
            font-size: ${Texts.size.large};
            border: none;
            padding:10px 20px;
            &:hover {
                background-color: ${Colors.orange1};
                box-shadow: 0 3px 6px 1px rgba(255, 159, 91, 0.2);
            }
            &:disabled {
                background-color: ${Colors.orange2};
                color: ${Colors.orange3};
                box-shadow: none;
                cursor: not-allowed;
            }
        }
      }
      #pop-upgrade-title {
        font-size: ${Texts.size.extra};
        line-height: ${Texts.size.extra};
        color: ${Colors.green};
      }
      
    }
  }
  #pop_signup_close_button {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
`);

