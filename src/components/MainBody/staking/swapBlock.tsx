import React, { memo, useState } from "react";
import styled from "styled-components";
import Colors from "constants/Colors";
import Regex from "constants/Regex";
import i18n from "i18n-js";
const coinImg = {
  lumi: require("assets/images/coin-lumi.svg"),
  trx: require("assets/images/tron.svg"),
};
interface SwapBlockProps {
  value: number;
  setAmountSwap?: any;
  type: string;
  balance: number;
  errorInput?: string;
  setErrorInput?: any;
}
export default ({
  value,
  setAmountSwap,
  type,
  balance,
  errorInput,
  setErrorInput,
}: SwapBlockProps) => {
  return (
    <SwapBlockWrap trx={type === "trx"}>
      <div className="sb">
        <div className="sb_logo">
          <span className="block_title">
            {type === "trx" ? "TRON - TRX" : "LUMI - LUMI"}
          </span>
          <div className="block_balance">
            <img src={coinImg[type]} alt="" />
            <span>{i18n.toNumber(balance, { precision: 2 })}</span>
          </div>
        </div>
        <div className="sb_input">
          <label>{type === "trx" ? i18n.t("youGot") : i18n.t("youSend")}</label>
          {type === "trx" ? (
            <input value={value} readOnly />
          ) : (
            <input
              type="number"
              onChange={(e) => {
                if (type === "lumi") {
                  setAmountSwap(+e.target.value);
                  if (e.target.value.match(Regex.money) !== null) {
                    if (+e.target.value > balance) {
                      setErrorInput("amountExceededBalance");
                    } else {
                      setErrorInput("");
                    }
                  } else {
                    setErrorInput("invalidInput");
                  }
                }
              }}
            />
          )}
        </div>
      </div>
    </SwapBlockWrap>
  );
};

const SwapBlockWrap = memo(styled.div`
  width: 40%;
  display: block;
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 1rem;
  }
  .sb {
    text-align: center;
    border: solid 1px ${Colors.black9};
    border-radius: 5px;
    .sb_logo {
      background: ${Colors.mainbodyBg};
      align-items: center;
      justify-content: center;
      width: 40%;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      flex-direction: column;
      display:flex;
      padding: 0.5rem 0;
      .block_title {
        color: ${Colors.black10};
        margin-bottom: 0.5rem;
      }
      .block_balance {
        span {
          color: ${Colors.black10};
        }
        img {
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
      }
    }
    .sb_input {
      display: block;
      text-align: center;
      width: 60%;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      input {
        padding: 0 10px;
        height: 37px;
        width: calc(100% - 20px);
        border-radius: 5px;
        border: none;
        cursor: ${(props: any) => (props.trx ? "default" : "text")};
        &::placeholder {
          color: ${Colors.black3};
          font-style: italic;
        }
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        &[type="number"] {
          -moz-appearance: textfield;
        }
      }
    }
  }
`);
