import React, { memo, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import i18n from "i18n-js";
import Colors from "constants/Colors";
import Texts from "constants/Texts";
import StatisticStaking from "./statisticStaking";
import Regex from "constants/Regex";
import Loading from "components/common/loading";
import Swap from "components/MainBody/staking/swap";
import { TronContract } from "contexts/tronWeb";
import * as Config from "config";
const interestImg = require("assets/images/high.svg");
export default ({ contract }) => {
  const { address, ref, tronWeb } = useContext(TronContract);
  const [amountStake, setAmountStake] = useState(0);
  const [loading, setLoading] = useState(false);
  const [approve, setApprove] = useState(false)
  const [stats, setStats] = useState([
    { title: "totalStaking", value: 0 },
    { title: "earned", value: 0 },
    { title: "priceLumi", value: 0 },
    { title: "maxPayout", value: 0 },
    { title: "feeSwap", value: 0 },
    { title: "lumiBalance", value: 0 },
    { title: "currentPayout", value: 0 },
  ]);
  const [errorInput, setErrorInput] = useState("");

  useEffect(() => {
    if (contract.lumi) {
      contract.lumi.allowance(address, Config.contract.stakingAddress).call().then((allow) => {
        if (Number(allow.remaining) > 10 ** 10) {
          setApprove(true);
        }
      });
    }
  }, [contract])
  useEffect(() => {
    if (contract.staking) {
      getInfomation();
    }
  }, [contract]);
  useEffect(() => {
    if (contract.staking) {
      setInterval(() => {
        getEarned();
      }, 2000);
    }
  }, [contract]);
  const getEarned = async () => {
    const earned = await contract.staking.earned(address).call();
    setStats((state) => {
      let old = [...state];
      old[1] = { title: "earned", value: Number(earned) / 10 ** 6 };
      return old;
    });
  };
  const getInfomation = async () => {
    const info = await contract.staking.getStats(address).call();
    setStats([
      { title: "totalStaking", value: Number(info.total) / 10 ** 6 },
      { title: "earned", value: Number(info.earn) / 10 ** 6 },
      { title: "priceLumi", value: Number(info.price) / 10 ** 6 },
      { title: "maxPayout", value: (Number(info.total) * 3) / 10 ** 6 },
      { title: "feeSwap", value: Number(info.fee) / 100 },
      { title: "lumiBalance", value: Number(info.balance) / 10 ** 6 },
      { title: "currentPayout", value: Number(info.paid) / 10 ** 6 },
    ]);
  };
  const handleStake = async () => {
    //TODO Loading
    try {
      contract.staking.stake(ref || Config.contract.adminAddress).send({
        callValue: Math.round(amountStake * 10 ** 6),
        feeLimit: 1e7,
        shouldPollResponse: true,
      })
    } catch (error) {

    }
  };
  const handleSwap = async (amount) => {
    //TODO Loading
    if (approve) {
      await contract.staking.swapLumi(Math.round(amount * 10 ** 6)).send({
        callValue: 0,
        feeLimit: 1e7,
        shouldPollResponse: true,
      });
      setLoading(false)
    } else {
      await contract.lumi
        .approve(Config.contract.stakingAddress, tronWeb.fromDecimal(10 ** 25))
        .send({
          callValue: 0,
          feeLimit: 1e7,
          shouldPollResponse: true,
        });
      setApprove(true);
      await contract.staking.swapLumi(Math.round(amount * 10 ** 6)).send({
        callValue: 0,
        feeLimit: 1e7,
        shouldPollResponse: true,
      });
      setLoading(false)
    }
  };
  return (
    <StakingWrap>
      <span id="staking_main_title">{i18n.t("staking")}</span>
      <div id="staking_mainbody">
        <span className="sm_title">{i18n.t("staking")}:</span>
        <div className="mb_input">
          <div className="mbi_inner">
            <span className="mbii_title">{i18n.t("inputStakeAmount")}:</span>
            <div className="left_input">
              <input
                type="number"
                placeholder={i18n.t("amount")}
                onChange={(e) => {
                  setAmountStake(+e.target.value);
                  if (e.target.value.match(Regex.money) !== null) {
                    if (+e.target.value < 10000) {
                      setErrorInput("minimumAmount10k");
                    } else {
                      setErrorInput("");
                    }
                  } else {
                    setErrorInput("invalidInput");
                  }
                }}
              />
              <div
                className={`mbi_interest ${amountStake < 10000 ? "unavailable" : ""
                  }`}
                title={i18n.t("interest")}
              >
                <img src={interestImg} alt="" />
                <span>
                  {amountStake + stats[0].value >= 500000
                    ? "12%"
                    : amountStake + stats[0].value >= 100000
                      ? "10%"
                      : amountStake >= 10000
                        ? "8%"
                        : "0%"}
                </span>
              </div>
              <div className="mbi_error">
                {errorInput === "minimumAmount10k" ||
                  errorInput === "invalidInput" ? (
                    <span>{i18n.t(errorInput)}</span>
                  ) : null}
              </div>
            </div>
            <button
              onClick={() => handleStake()}
              disabled={loading || errorInput !== "" || amountStake < 10000}
            >
              {loading ? (
                <Loading size={20} color={Colors.white} />
              ) : (
                  <span>{i18n.t("staking")}</span>
                )}
            </button>
          </div>
        </div>
        <div className="mb_statistic">
          {stats.map((item, index) => {
            return (
              <StatisticStaking
                key={index}
                title={item.title}
                value={item.value}
              />
            );
          })}
          <div className="clear" />
        </div>
        <Swap
          priceLumi={stats[2].value}
          lumiBalance={stats[5].value}
          handleSwap={handleSwap}
        />
      </div>
    </StakingWrap>
  );
};

const StakingWrap = memo(styled.div`
  flex: 1;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  #staking_main_title {
    font-size: ${Texts.size.huge};
    line-height: ${Texts.size.huge};
    color: ${Colors.black};
    margin-bottom: 10px;
    font-weight: 500;
  }
  #staking_mainbody {
    background-color: ${Colors.white};
    display: block;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    @media (max-width: 767px) {
      width: calc(100% - 2rem);
      height: calc(100% - 2rem);
      padding: 1rem;
    }
    .sm_title {
      font-size: ${Texts.size.huge};
      line-height: ${Texts.size.huge};
      color: ${Colors.black};
      margin-bottom: 1rem;
      font-weight: 500;
      display: block;
      text-align: left;
    }
    .sm_title {
      display: block;
    }
    .mb_input {
      margin-bottom: 3rem;
      display: inline-block;
      border-radius: 5px;
      @media (max-width: 767px) {
        width: 100%;
      }
      .mbi_inner {
        position: relative;
        margin-top: 25px;
        @media (max-width: 767px) {
          display: block;
          border: none;
        }
        .mbii_title {
          display: block;
          width: 100%;
          height: 20px;
          position: absolute;
          top: -25px;
          left: 0;
          color: ${Colors.black10};
          text-align: left;
        }
        .left_input {
          position: relative;
          border: solid 1px ${Colors.black1};
          border-radius: 5px;
          @media (max-width: 767px) {
            margin-bottom: 1rem;
          }
          input {
            padding: 0 1rem;
            height: 37px;
            min-width: 250px;
            border: none;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
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
            @media (max-width: 767px) {
              width: calc(80% - 20px);
              border-radius: 5px;
              display: block;
              min-width: initial;
            }
          }
          .mbi_error {
            height: 20px;
            width: 100%;
            line-height: 20px;
            position: absolute;
            top: 100%;
            left: 0;
            span {
              font-size: 0.8rem;
              color: ${Colors.red};
            }
          }
        }
        .mbi_interest {
          align-items: center;
          justify-content: center;
          padding: 0 1rem;
          position: relative;
          background: ${Colors.mainbodyBg};
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          &.unavailable {
            opacity: 0.5;
          }
          @media (max-width: 767px) {
            width: calc(20% - 2rem);
            text-align: center;
          }
          span {
            color: ${Colors.black};
            &:nth-child(2) {
              margin-left: 5px;
            }
          }
        }
        button {
          border-radius: 5px;
          background-color: ${Colors.orange};
          box-shadow: none;
          color: ${Colors.white};
          font-size: ${Texts.size.large};
          min-width: 100px;
          height: 39px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 1rem;
          border: none;
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
          @media (max-width: 767px) {
            border-radius: 5px;
            margin: 0 auto;
            position: relative;
          }
        }
      }
    }
    .mb_statistic {
      display: block;
      margin-bottom: 3rem;
      > div {
        &:not(:last-child) {
          width: calc(22% - 2px);
          display: block;
          float: left;
          @media (min-width: 1200px) {
            &:nth-child(4n + 1) {
              margin: 0 2% 2rem 0;
            }
            &:nth-child(4n + 2) {
              margin: 0 2% 2rem;
            }
            &:nth-child(4n + 3) {
              margin: 0 2% 2rem;
            }
            &:nth-child(4n + 4) {
              margin: 0 0 2rem 2%;
            }
          }
          @media (min-width: 768px) and (max-width: 1199px) {
            width: calc(30% - 2px);
            &:nth-child(3n + 1) {
              margin: 0 2.5% 2rem 0;
            }
            &:nth-child(3n + 2) {
              margin: 0 2.5% 2rem;
            }
            &:nth-child(3n + 3) {
              margin: 0 0 2rem 2.5%;
            }
          }
          @media (min-width: 600px) and (max-width: 767px) {
            width: calc(48% - 2px);
            &:nth-child(2n + 1) {
              margin: 0 2% 2rem 0;
            }
            &:nth-child(2n + 2) {
              margin: 0 0 2rem 2%;
            }
          }
          @media (max-width: 599px) {
            width: calc(100% - 2px);
            margin-bottom: 1rem;
          }
        }
      }
      .clear {
        clear: both;
      }
    }
  }
`);
