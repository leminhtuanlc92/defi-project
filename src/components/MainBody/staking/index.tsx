import React, { memo, useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import i18n from "i18n-js";
import Colors from "constants/Colors";
import Texts from "constants/Texts";
import StatisticStaking from "./statisticStaking";
import Regex from "constants/Regex";
import Loading from "components/common/loading";
import Swap from "components/MainBody/staking/swap";
import { TronContract } from "contexts/tronWeb";
import RefBalance from "components/MainBody/staking/refBalance";
import * as Config from "config";
import Swal from "sweetalert2";
import GetLumi from "components/MainBody/staking/getLumi";
import ListStaking from "components/MainBody/staking/listStaking";
import axios from "axios";
const interestImg = require("assets/images/high.svg");

export default ({ contract }) => {
  const { address, ref, tronWeb } = useContext(TronContract);
  const [amountStake, setAmountStake] = useState({
    amount: 0,
    balance: 0,
    minAmount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [approve, setApprove] = useState(false);
  const amountRef = useRef(null as any);
  const [stats, setStats] = useState([
    { title: "totalStaking", value: 0 },
    { title: "activeStaking", value: 0 },
    { title: "currentPayout", value: 0 },
    { title: "maxPayout", value: 0 },
    { title: "earned", value: 0 },
    { title: "priceLumi", value: 0 },
    { title: "feeSwap", value: 0 },
    { title: "lumiBalance", value: 0 },
  ]);
  const [errorInput, setErrorInput] = useState("");
  useEffect(() => {
    if (contract.lumi) {
      contract.lumi
        .allowance(address, Config.contract.stakingAddress)
        .call()
        .then((allow) => {
          console.log("allow", allow);
          if (Number(allow.remaining || allow) > 10 ** 10) {
            console.log("lskjfdsfj");
            setApprove(true);
          }
        });
    }
  }, [contract]);
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
  const [trxPrice, setTrxPrice] = useState(0)
  useEffect(() => {
    getTRXPrice()
  }, [])
  const getTRXPrice = async () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd"
      )
      .then((res) => {
        setTrxPrice(res.data?.tron?.usd || 0);
      })
      .catch((err) => {
        console.log("err get trx pricce", err);
      });
  };
  const getEarned = async () => {
    const earned = await contract.staking.earned(address).call();
    setStats((state) => {
      let old = [...state];
      old[4] = { title: "earned", value: Number(earned) / 10 ** 6 };
      return old;
    });
  };
  const getInfomation = async () => {
    const info = await contract.staking.getStats(address).call();
    const current = await contract.staking.getCurrentPayout(address).call();
    let balance = (await tronWeb.trx.getBalance(address)) / 10 ** 6;
    let minAmount =
      Number(await contract.staking.getMinStake(address).call()) / 10 ** 6;
    console.log("balance", balance, Number(minAmount));
    setCurrent(Number(current.currentStake));
    let temp = [...stats];
    temp[0] = { title: "totalStaking", value: Number(info.total) / 10 ** 6 };
    temp[1] = { title: "activeStaking", value: Number(info.active) / 10 ** 6 };
    temp[2] = { title: "currentPayout", value: Number(info.paid) / 10 ** 6 };
    temp[3] = {
      title: "maxPayout",
      value: (Number(info.active) * 3) / 10 ** 6,
    };
    temp[4] = { title: "earned", value: Number(info.earn) / 10 ** 6 };
    temp[5] = { title: "priceLumi", value: Number(info.price) / 10 ** 6 };
    temp[6] = { title: "feeSwap", value: Number(info.fee) / 100 };
    temp[7] = { title: "lumiBalance", value: Number(info.balance) / 10 ** 6 };
    setStats(temp);
    balance &&
      minAmount &&
      setAmountStake({ ...amountStake, balance, minAmount });
  };
  const [stakeLoading, setStakeLoading] = useState(false);
  const handleStake = async () => {
    setStakeLoading(true);
    try {
      let result = await contract.staking
        .stake(ref || Config.contract.adminAddress)
        .send({
          callValue: Math.round(amountStake.amount * 10 ** 6),
          feeLimit: 1e7,
          shouldPollResponse: true,
        });
      result && setStakeLoading(false);
    } catch (error) {
      setStakeLoading(false);
      Swal.fire({
        title: i18n.t("error"),
        text: error.message ? error.message : error,
        icon: "warning",
        confirmButtonText: "ok",
      });
    }
  };
  useEffect(() => {
    if (stakeLoading) {
      Swal.fire({
        title: i18n.t("processing"),
        icon: "warning",
        confirmButtonText: "ok",
        willOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [stakeLoading]);

  const handleSwap = async (amount) => {
    setLoading(true);
    try {
      console.log("approve", approve);
      if (approve) {
        await contract.staking.swapLumi(Math.round(amount * 10 ** 6)).send({
          callValue: 0,
          feeLimit: 1e7,
          shouldPollResponse: true,
        });
        setLoading(false);
      } else {
        await contract.lumi
          .approve(
            Config.contract.stakingAddress,
            tronWeb.fromDecimal(10 ** 25)
          )
          .send({
            callValue: 0,
            feeLimit: 1e7,
            shouldPollResponse: false,
          });
        setApprove(true);
        await contract.staking.swapLumi(Math.round(amount * 10 ** 6)).send({
          callValue: 0,
          feeLimit: 1e7,
          shouldPollResponse: true,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: i18n.t("error"),
        text: error.message ? error.message : error,
        icon: "warning",
        confirmButtonText: "ok",
      });
    }
  };
  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: i18n.t("processing"),
        icon: "warning",
        confirmButtonText: "ok",
        willOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [loading]);

  const [currentStake, setCurrent] = useState(0);

  //List Stake
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [list, setList] = useState([]);
  const getList = async () => {
    const info = await contract.staking
      .getMyStake(address, 10, page * 10)
      .call();
    const max = Number(info.length) / 10;
    if (max !== Math.ceil(maxPage / 10)) setMaxPage(Math.ceil(maxPage / 10));
    let tempList = [] as any;
    // console.log(info)
    info.amount.map((item, index) => {
      tempList.push({
        amount: Number(item) / 10 ** 6,
        time: Number(info.time[index]) * 1000,
        coin: "lumi",
      });
    });
    setList(tempList);
  };

  useEffect(() => {
    if (contract.staking) {
      getList();
    }
  }, [page, address, contract]);

  return (
    <StakingWrap>
      <span id="staking_main_title">{i18n.t("staking")}</span>
      <div id="staking_mainbody">
        <span className="sm_title">{i18n.t("staking")}:</span>
        <div className="mb_input">
          <div className="mbi_inner">
            <span className="mbii_title">{i18n.t("inputStakeAmount")}:</span>
            <div className="left_input">
              <div className="li">
                <input
                  ref={amountRef}
                  type="number"
                  placeholder={i18n.t("amount")}
                  onChange={(e) => {
                    setAmountStake({
                      ...amountStake,
                      amount: +e.target.value,
                    });
                    if (e.target.value.match(Regex.money) !== null) {
                      if (+e.target.value < 1000) {
                        setErrorInput("minimumAmount10k");
                      } else {
                        setErrorInput("");
                      }
                    } else {
                      setErrorInput("invalidInput");
                    }
                  }}
                />
                <button
                  className="max_value"
                  onClick={() => {
                    setAmountStake({
                      ...amountStake,
                      balance: amountStake.balance - 10,
                    });

                    amountRef.current.value = amountStake.balance - 10;
                  }}
                >
                  {i18n.t("max")}
                </button>
              </div>
              <div
                className={`mbi_interest ${amountStake.amount < 1000 ? "unavailable" : ""
                  }`}
                title={i18n.t("interest")}
              >
                <img src={interestImg} alt="" />
                <span>
                  {amountStake.amount + stats[0].value >= 500000
                    ? "15%"
                    : amountStake.amount + stats[0].value >= 100000
                      ? "12%"
                      : amountStake.amount >= 1000
                        ? "9%"
                        : "0%"}
                </span>
              </div>
              <div className="mbi_error">
                {errorInput === "invalidInput" ||
                  errorInput === "minimumAmount1k" ? (
                    <span>{i18n.t(errorInput)}</span>
                  ) : null}
              </div>
            </div>
            <button
              onClick={() => handleStake()}
              disabled={
                stakeLoading ||
                errorInput !== "" ||
                amountStake.amount < 1000 ||
                amountStake.amount < amountStake.minAmount
              }
            >
              {stakeLoading ? (
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
                maxPayout={stats[3].value}
                trxPrice={trxPrice}
                title={item.title}
                value={item.value}
              />
            );
          })}
          <div className="clear" />
        </div>
        <GetLumi
          earn={stats[4].value}
          price={stats[5].value}
          contract={contract?.staking}
        />
        <RefBalance contract={contract?.staking} />
        <Swap
          priceLumi={stats[5].value}
          trxBalance={amountStake.balance}
          lumiBalance={stats[7].value}
          handleSwap={handleSwap}
        />
        <ListStaking
          list={list}
          page={page}
          setPage={setPage}
          current={currentStake}
          maxPage={maxPage}
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
    overflow: scroll;
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
          .li {
            padding: 0 3rem 0 1rem;
            height: 37px;
            min-width: 250px;
            border: none;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            position: relative;
            input {
              width: 100%;
              border: none;
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
            .max_value {
              position: absolute;
              top: 5px;
              right: 0;
              width: 2rem;
              height: 27px;
              min-width: initial;
              margin: 0;
              padding: 0;
              font-size: 0.7rem;
              background: ${Colors.black};
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
      margin-bottom: 2rem;
      > div {
        &:not(:last-child) {
          width: calc(22% - 2px);
          display: block;
          float: left;
          @media (min-width: 1600px) {
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
          @media (min-width: 1200px) and (max-width: 1599px) {
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
          @media (min-width: 992px) and (max-width: 1199px) {
            width: calc(48% - 2px);
            &:nth-child(2n + 1) {
              margin: 0 2% 2rem 0;
            }
            &:nth-child(2n + 2) {
              margin: 0 0 2rem 2%;
            }
          }
          @media (min-width: 768px) and (max-width: 991px) {
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
