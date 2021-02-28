import React, { memo, useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import ClickOutside from "../../../utils/clickOutSide";
import { history } from "../../../App";
import { TronContract } from "../../../contexts/tronWeb";
import { contract } from "../../../config";
import { SiteContext } from "../../../contexts/siteContext";
import useTrx from "helps/useTrx";
import Swal from "sweetalert2";
const closeImg = require("../../../assets/images/close.png");
const buyImg = require("../../../assets/images/buy-successful.svg");
interface PopUpgradeProps {
  showPop: boolean;
  setShowPop: any;
  available: number;
  bonus: number;
}

export default ({ showPop, setShowPop, available, bonus }: PopUpgradeProps) => {
  const [usdtTobuy, setUsdtTobuy] = useState(0);
  const [estimate, setEstimate] = useState(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { shareHolder, usdt, address } = useContext(TronContract);
  const balanceTrx = useTrx()
  const {
    siteState: { horizontalView },
  } = useContext(SiteContext);
  const [approve, setApprove] = useState(false);
  let price = 1;
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
    if (balanceTrx >= 2e8) {
      if (!approve) {
        await usdt.approve(contract.shareHolderAddress, 10 ** 15).send({
          callValue: 0,
          feeLimit: 2e8,
          shouldPollResponse: false,
        });
      }
      await shareHolder.buyStock(Math.round(usdtTobuy * 10 ** 6)).send({
        callValue: 0,
        feeLimit: 2e8,
        shouldPollResponse: true,
      });
      setApprove(true);
      setSuccess(true);
    } else {
      Swal.fire({
        title: i18n.t("error"),
        text: "TRX not enought!",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
    setLoading(false);
  };
  return (
    <BuyPopWrap horizontalView={horizontalView}>
      <ClickOutside
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
                    {i18n.t("buySuccessQuote")} X Credits {i18n.t("inRound")}{" "}
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
                <span id="bpc_title">{i18n.t("buyPopup")}</span>
                <div id="bpc_main">
                  <div id="bpcm_quantity">
                    <span className="bpcm_label">
                      {i18n.t("quantityAvailable")}:
                  </span>
                    <div className="bpcm_input">
                      <input value={available} disabled={true} />
                      <span>{i18n.t("usdt")}</span>
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
                        {i18n.t("with")} 1$ = 1{i18n.t("token")}
                      </span>
                    </div>
                  </div>
                  <div id="bpcm_token_receive">
                    <span className="bpcm_label">
                      {i18n.t("quantityAvailable")}:
                  </span>
                    <div className="bpcm_input">
                      <input value={estimate * bonus} disabled={true} />
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
  > div {
    min-width: 60%;
    min-height: 70%;
    @media (max-width: 399px) {
      min-width: 90%;
    }
    @media (max-width: 991px) {
      ${(props: any) =>
    props.horizontalView &&
    css`
          width: 90%;
          height: 90%;
        `}
    }
  }
  #buy_pop_content {
    flex: 1;
    background: ${Colors.white};
    border-radius: 15px;
    flex-direction: column;
    padding: 40px 50px;
    align-items: center;
    justify-content: center;
    position: relative;
    @media (max-width: 991px) {
      ${(props: any) =>
    props.horizontalView &&
    css`
          padding: 20px;
        `}
    }
    @media (max-width: 399px) {
      padding: 0;
      width: 100%;
      height: 100%;
    }
    #bpc_inner {
      flex: 1;
      flex-direction: column;
      align-items: center;
      width: 100%;
      @media (max-width: 991px) {
        ${(props: any) =>
    props.horizontalView &&
    css`
            height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
          `}
      }
      #bpc_title {
        font-size: ${Texts.size.extra};
        line-height: ${Texts.size.extra};
        color: ${Colors.green};
        @media (max-width: 399px) {
          font-size: ${Texts.size.larger};
          line-height: ${Texts.size.larger};
          margin-top: 30px;
        }
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
        @media (max-width: 399px) {
          width: calc(100% - 20px);
          margin-top: 10px;
          padding: 10px;
        }
        .bpcm_label {
          font-size: ${Texts.size.large};
          line-height: ${Texts.size.large};
          color: ${Colors.black};
          margin-bottom: 15px;
        }
        .bpcm_input {
          border: solid 1px ${Colors.black};
          border-radius: 5px;
          width: calc(95% - 40px);
          padding: 10px 20px;
          background-color: ${Colors.white};
          justify-content: space-between;
          align-items: center;
          @media (max-width: 991px) {
            ${(props: any) =>
    props.horizontalView &&
    css`
                width: auto;
              `}
          }
          @media (max-width: 399px) {
            width: calc(95% - 10px);
            padding: 10px;
          }
          input {
            width: 80%;
            border: none;
            background-color: ${Colors.white};
          }
          span {
            font-size: ${Texts.size.large};
            line-height: ${Texts.size.large};
            color: ${Colors.black2};
            width: 15%;
            text-align: right;
            @media (max-width: 399px) {
              font-size: ${Texts.size.small};
              line-height: ${Texts.size.small};
            }
          }
        }
        #bpcm_quantity,
        #bpcm_amount,
        #bpcm_token_receive {
          flex-direction: column;
          width: 55%;
          margin-bottom: 30px;
          @media (max-width: 991px) {
            width: 90%;
          }
        }
        #bpcm_quantity {
        }
        #bpcm_amount {
          .bpcm_input {
            flex-grow: 2;
            margin-right: 20px;
            @media (max-width: 1199px) {
              margin-right: 0;
              margin-bottom: 10px;
              width: calc(100% - 40px);
              padding: 10px 20px;
            }
            @media (max-width: 399px) {
              width: calc(100% - 20px);
              padding: 10px;
            }
          }
          .bpcm_spec_wrap {
            align-items: center;
            justify-content: space-between;
            @media (max-width: 1199px) {
              flex-direction: column;
            }
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
          @media (max-width: 399px) {
            width: 100%;
          }
          button {
            width: 40%;
            margin: 5px 10px;
            padding: 20px 0;
            border-radius: 5px;
            box-shadow: none;
            font-size: ${Texts.size.large};
            text-transform: uppercase;
            border: none;
            @media (max-width: 767px) {
              width: 70px;
              padding: 10px;
            }
            @media (max-width: 399px) {
              width: 45%;
            }
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
