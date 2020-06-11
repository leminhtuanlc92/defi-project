import React, { memo, useState, Fragment, useContext, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import moment from "moment";
import Select from "../../common/core/Select";
import ClickOutside from "../../../utils/clickOutSide";
import { history } from "../../../App";
import { TronContract } from "../../../contexts/tronWeb";
import { contract } from "../../../config";
const closeImg = require("../../../assets/images/close.png");
const buyImg = require("../../../assets/images/buy-successful.svg");
interface PopUpgradeProps {
  showPop: boolean;
  setShowPop: any;
  available: number;
}

export default ({ showPop, setShowPop, available }: PopUpgradeProps) => {
  const [usdtTobuy, setUsdtTobuy] = useState(0);
  const [estimate, setEstimate] = useState(0);
  const [success, setSuccess] = useState(false);
  let price = 0.1;
  const [loading, setLoading] = useState(false);
  const { shareHolder, usdt, address } = useContext(TronContract);
  const [approve, setApprove] = useState(false);
  useEffect(() => {
    const checkApprove = async () => {
      let remaining = (
        await usdt.allowance(address, contract.shareHolderAddress).call()
      ).remaining;
      if (Number(remaining) > 10 ** 10) {
        setApprove(true);
      }
    };
    checkApprove();
  }, []);
  const buyToken = async () => {
    setLoading(true);
    await shareHolder.buyStock(Math.round(usdtTobuy * 10 ** 6)).send({
      callValue: 0,
      feeLimit: 1e7,
      shouldPollResponse: true,
    });
    setLoading(false);
    setSuccess(true);
  };
  return (
    <BuyPopWrap>
      <ClickOutside
        style={{ minWidth: "60%", minHeight: "70%" }}
        handleClickOutSide={() => {
          setShowPop(false);
        }}
      >
        <div id="buy_pop_content">
          {success ? (
            <div id="bpc_inner">
              <span id="bpc_title">{i18n.t("buySuccess")}</span>
              <div id="bpc_main">
                <img className="bpcms_img" src={buyImg} alt="" />
                <div className="bpcms_quotes">
                  <span>
                    {i18n.t("buySuccessQuote")} X token {i18n.t("inRound")}{" "}
                    Co-founder {i18n.t("withPrice")}
                  </span>
                  <span>{i18n.t("backToHomePageContinue")}</span>
                </div>
                <button
                  id="bpcms_button"
                  onClick={() => {
                    setShowPop(false);
                    history.push("/");
                  }}
                >
                  {i18n.t("backToDashboard")}
                </button>
              </div>
            </div>
          ) : (
            <div id="bpc_inner">
              <span id="bpc_title">{i18n.t("upgradeAccount")}</span>
              <div id="bpc_main">
                <div id="bpcm_quantity">
                  <span className="bpcm_label">
                    {i18n.t("quantityAvailable")}:
                  </span>
                  <div className="bpcm_input">
                    <input value={available} disabled={true} />
                    <span>{i18n.t("token")}</span>
                  </div>
                </div>
                <div id="bpcm_amount">
                  <span className="bpcm_label">
                    {i18n.t("usdtDesiteToBuy")}:
                  </span>
                  <div className="bpcm_spec_wrap">
                    <div className="bpcm_input">
                      <input
                        onChange={(e) => {
                          setUsdtTobuy(+e.target.value);
                          setEstimate(+e.target.value / price);
                        }}
                      />
                      <span>{i18n.t("usdt")}</span>
                    </div>
                    <span className="bpcmsw_convert">
                      {i18n.t("with")} 1$ = 0.1 {i18n.t("token")}
                    </span>
                  </div>
                </div>
                <div id="bpcm_token_receive">
                  <span className="bpcm_label">
                    {i18n.t("quantityAvailable")}:
                  </span>
                  <div className="bpcm_input">
                    <input value={estimate} disabled={true} />
                    <span>{i18n.t("token")}</span>
                  </div>
                </div>
                <div id="bpcm_action">
                  <button id="bpcma_cancel" onClick={() => setShowPop(false)}>
                    {i18n.t("cancel")}
                  </button>
                  <button id="bpcma_buy" onClick={buyToken} disabled={loading}>
                    {loading ? i18n.t("loading") : i18n.t("buy")}
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            id="bpc_close_button"
            onClick={() => {
              setShowPop(!showPop);
            }}
          >
            <img src={closeImg} alt="" />
          </div>
        </div>
      </ClickOutside>
    </BuyPopWrap>
  );
};

const BuyPopWrap = memo(styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: rgba(34, 34, 34, 0.8);
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  #buy_pop_content {
    flex: 1;
    background: ${Colors.white};
    border-radius: 15px;
    flex-direction: column;
    padding: 40px 50px;
    align-items: center;
    justify-content: center;
    position: relative;
    #bpc_inner {
      flex: 1;
      flex-direction: column;
      align-items: center;
      width: 100%;
      #bpc_title {
        font-size: ${Texts.size.extra};
        line-height: ${Texts.size.extra};
        color: ${Colors.green};
      }
      #bpc_main {
        background: ${Colors.white4};
        border-radius: 10px;
        margin-top: 30px;
        width: 95%;
        flex: 1;
        padding: 20px;
        flex-direction: column;
        align-items: center;
        .bpcm_label {
          font-size: ${Texts.size.large};
          line-height: ${Texts.size.large};
          color: ${Colors.black};
          margin-bottom: 15px;
        }
        .bpcm_input {
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
        #bpcm_quantity,
        #bpcm_amount,
        #bpcm_token_receive {
          flex-direction: column;
          width: 55%;
          margin-bottom: 30px;
        }
        #bpcm_quantity {
        }
        #bpcm_amount {
          .bpcm_input {
            flex-grow: 2;
            margin-right: 20px;
          }
          .bpcm_spec_wrap {
            align-items: center;
            justify-content: space-between;
            .bpcmsw_convert {
              font-size: ${Texts.size.large};
              line-height: ${Texts.size.large};
              color: ${Colors.black};
            }
          }
        }
        #bpcm_token_receive {
        }
        #bpcm_action {
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
            &#bpcma_buy {
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
            &#bpcma_cancel {
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
        .bpcms_img {
          max-width: 400px;
        }
        .bpcms_quotes {
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
        #bpcms_button {
          width: 40%;
          margin: 5px 10px;
          padding: 20px 0;
          border-radius: 5px;
          box-shadow: none;
          font-size: ${Texts.size.large};
          text-transform: uppercase;
          border: none;
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
      }
    }
    #bpc_close_button {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
  }
`);
