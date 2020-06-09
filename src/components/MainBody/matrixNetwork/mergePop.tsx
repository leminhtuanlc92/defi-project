import React, { memo, useState, Fragment, useContext } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import moment from "moment";
import Select from "../../common/core/Select";
import ClickOutside from "../../../utils/clickOutSide";
const closeImg = require("../../../assets/images/close.png");
const successImg = require("../../../assets/images/join-successful.svg");
const failImg = require("../../../assets/images/join-error.svg");
interface PopUpgradeProps {
    showPop: boolean;
    setShowPop: any;
    type: string;
}

export default ({ showPop, setShowPop, type }: PopUpgradeProps) => {

    return (
        <MergePopWrap type={type}>
            <ClickOutside
                style={{ minWidth: "60%", minHeight: "70%" }}
                handleClickOutSide={() => {
                    setShowPop(false);
                }}
            >
                <div id="merge_pop_content">
                    <div id="mpcinner">
                        <div id="mpcmain">
                            <img className="mpcms_img" src={type === 'success' ? successImg : failImg} alt="" />
                            <div className="mpcms_quotes">
                                <span>{i18n.t(`${type === 'success' ? 'mergeSuccess' : 'megeFail'}`)}</span>
                            </div>
                            <button id="mpcms_button"
                                onClick={() => {
                                    setShowPop(false);
                                }}
                            >
                                {i18n.t("backToDashboard")}
                            </button>
                        </div>
                        <div id="mpc_close_button"
                            onClick={() => {
                                setShowPop(!showPop);
                            }}
                        >
                            <img src={closeImg} alt="" />
                        </div>
                    </div>
                </div>
            </ClickOutside>
        </MergePopWrap>
    );
};

const MergePopWrap = memo(styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: rgba(34, 34, 34, 0.8);
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  #merge_pop_content {
    flex: 1;
    background: ${Colors.white};
    border-radius: 15px;
    flex-direction: column;
    padding: 40px 50px;
    align-items: center;
    justify-content: center;
    position: relative;
    #mpcinner {
      flex: 1;
      flex-direction: column;
      align-items: center;
      width: 100%;
      #mpcmain {
        background: ${Colors.white4};
        border-radius: 10px;
        margin-top: 30px;
        width: 95%;
        flex: 1;
        padding: 20px;
        flex-direction: column;
        align-items: center;
        .mpcm_label {
          font-size: ${Texts.size.large};
          line-height: ${Texts.size.large};
          color: ${Colors.black};
          margin-bottom: 15px;
        }
        .mpcm_input {
          border: solid 1px ${Colors.black};
          border-radius: 5px;
          padding: 10px 20px;
          background-color: ${Colors.white};
          justify-content: space-between;
          align-items: center;
          input {
            flex: 1;
            border: none;
            flex-grow: 2;
            margin-right: 10px;
          }
          span {
            font-size: ${Texts.size.large};
            line-height: ${Texts.size.large};
            color: ${Colors.black2};
          }
        }
        #mpcm_quantity,
        #mpcm_amount,
        #mpcm_token_receive {
          flex-direction: column;
          width: 55%;
          margin-bottom: 30px;
        }
        #mpcm_quantity {
        }
        #mpcm_amount {
          .mpcm_input {
            flex-grow: 2;
            margin-right: 20px;
          }
          .mpcm_spec_wrap {
            align-items: center;
            justify-content: space-between;
            .mpcmsw_convert {
              font-size: ${Texts.size.large};
              line-height: ${Texts.size.large};
              color: ${Colors.black};
            }
          }
        }
        #mpcm_action {
          width: 50%;
          justify-content: center;
          align-items: center;
          button {
            width: 40%;
            margin: 5px 10px;
            padding: 20px 0;
            border-radius: 5px;
            box-shadow: none;
            font-size: ${Texts.size.large};
            text-transform: uppercase;
            border: none;
            &#mpcma_buy {
              color: ${Colors.white};
              background-color: ${Colors.orange};
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
            &#mpcma_cancel {
              background-color: ${Colors.black6};
              color: ${Colors.black};
              &:hover {
                background-color: ${Colors.black7};
                box-shadow: 0 3px 6px 1px rgba(255, 159, 91, 0.2);
              }
              &:disabled {
                background-color: ${Colors.black7};
                color: ${Colors.black};
                box-shadow: none;
                cursor: not-allowed;
              }
            }
          }
        }
        .mpcms_img {
          max-width: 400px;
        }
        .mpcms_quotes {
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 30px 0;
          span {
            font-size: ${Texts.size.large};
            line-height: ${Texts.size.large};
            color: ${Colors.black};
            &:first-child {
              margin-bottom: 20px;
            }
          }
        }
        #mpcms_button {
            width: 40%;
            margin: 5px 10px;
            padding: 20px 0;
            border-radius: 5px;
            box-shadow: none;
            font-size: ${Texts.size.large};
            text-transform: uppercase;
            border: none;
            color: ${Colors.white};
            ${(props: any) => props.type === 'success' ?
                css`background-color: ${Colors.orange}`
                :
                css`background-color: ${Colors.red}`
            };
            &:hover {
                ${(props: any) => props.type === 'success' ?
                    css`background-color: ${Colors.orange1}`
                    :
                    css`background-color: ${Colors.red1}`
                };
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
    }
    #mpc_close_button {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
  }
`);
