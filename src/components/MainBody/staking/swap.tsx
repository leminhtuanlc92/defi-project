import React, { memo, useState } from "react";
import styled from "styled-components";
import i18n from "i18n-js";
import Colors from "constants/Colors";
import Texts from "constants/Texts";
import SwapBlock from "components/MainBody/staking/swapBlock";
import BigNumber from "bignumber.js";
import Loading from "components/common/loading";
const exchangeImg = require("assets/images/right-arrow.svg");
interface SwapProps {
  priceLumi: number;
  lumiBalance: number;
  trxBalance: number;
  handleSwap: any;
}
export default ({
  priceLumi,
  lumiBalance,
  handleSwap,
  trxBalance,
}: SwapProps) => {
  const [loadingSwap, setLoadingSwap] = useState(false);
  const [errorInput, setErrorInput] = useState("");
  const [amountSwap, setAmountSwap] = useState(0);

  return (
    <SwapWrap>
      <div className="s_inner">
        <span className="mbs_title">{i18n.t("swap")}:</span>
        <div className="mbs_input">
          <span className="mbsi_head">{i18n.t("swapLumiToTrx")}:</span>
          <SwapBlock
            value={amountSwap}
            balance={lumiBalance}
            setAmountSwap={setAmountSwap}
            type="lumi"
            errorInput={errorInput}
            setErrorInput={setErrorInput}
          />
          <div className="mbsi_icon">
            <span>{i18n.t("feeDynamic", { value: "3%" })}</span>
            <img src={exchangeImg} alt="" />
          </div>
          <SwapBlock
            value={new BigNumber(amountSwap)
              .multipliedBy(priceLumi)
              .multipliedBy(97)
              .dividedBy(100)
              .toNumber()}
            type="trx"
            balance={trxBalance}
          />
          <div className="mbs_btn">
            <button
              onClick={() => handleSwap(amountSwap)}
              disabled={loadingSwap || errorInput !== "" || amountSwap <= 0}
            >
              {loadingSwap ? (
                <Loading size={20} color={Colors.white} />
              ) : (
                <span>{i18n.t("swap")}</span>
              )}
            </button>
          </div>
        </div>
        <div className="swap_error">
          {errorInput !== "" ? <span>{i18n.t(errorInput)}</span> : null}
        </div>
      </div>
    </SwapWrap>
  );
};

const SwapWrap = memo(styled.div`
  display: block;
  margin: 0 auto 3rem;
  .s_inner {
    display: block;
    width: 100%;
    .mbs_title {
      font-size: ${Texts.size.huge};
      line-height: ${Texts.size.huge};
      color: ${Colors.black};
      margin-bottom: 1rem;
      font-weight: 500;
      display: block;
      text-align: left;
    }
    .mbs_input {
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      padding-top: 2rem;
      position: relative;
      @media (max-width: 599px) {
        padding-top: 1.5rem;
      }
      .mbsi_head {
        position: absolute;
        top: 0;
        left: 0;
        color: ${Colors.black};
        width: 100%;
        text-align: left;
      }
      @media (min-width: 1600px) {
        width: 70%;
      }
      @media (max-width: 1599px) {
        width: 100%;
      }
      /* @media (min-width: 992px) and (max-width:1199px) {
          width: 90%;
      }
      @media (max-width: 991px) {
          width: 100%;
      } */
      @media (max-width: 767px) {
        display: block;
      }
      .mbsi_icon {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 2rem;
        @media (max-width: 767px) {
          flex-direction: row-reverse;
          margin: 1rem 0;
        }
        span {
          color: ${Colors.black};
        }
        img {
          width: 35px;
          height: 35px;
          @media (max-width: 767px) {
            width: 20px;
            height: 20px;
            transform: rotate(90deg);
          }
        }
      }
      .mbs_btn {
        margin-left: 2rem;
        @media (max-width: 767px) {
          margin: 1rem 0 0 0;
        }
        button {
          border-radius: 5px;
          background-color: ${Colors.orange};
          box-shadow: none;
          color: ${Colors.white};
          font-size: ${Texts.size.large};
          min-width: 100px;
          height: 62px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          @media (max-width: 767px) {
            margin: 0 auto;
            height: 37px;
          }
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
    .swap_error {
      height: 20px;
      width: 80%;
      margin: 0 auto;
      line-height: 20px;
      @media (max-width: 500px) {
        height: auto;
        margin: 1rem auto 0;
      }
      span {
        font-size: 0.8rem;
        color: ${Colors.red};
      }
    }
  }
`);
