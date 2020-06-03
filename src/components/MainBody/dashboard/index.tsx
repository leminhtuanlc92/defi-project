import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import InfoBlock from "./infoBlocks";
import OfficeBlocks from "./officeBlocks";
import PopUpgrade from "./popUpgrade";
import { TronContract } from "../../../contexts/tronWeb";
import { contract } from "../../../config";
const closeImg = require("../../../assets/images/close.png");
const confirmImg = require("../../../assets/images/confirm-ref.svg");
const confirmImg1 = require("../../../assets/images/confirm.svg");
export default () => {
  const [showPop, setShowPop] = useState(false);
  const [selectPlan, setSelectPlan] = useState(1);
  const { matrixMarketing, ref, usdt, address, userData, token, matrixMember } = useContext(TronContract);

  useEffect(() => {
    const getData = async () => {
      //TODO get Data
    };
    getData();
  }, [userData, token, matrixMember]);
  const data = [
    { category: "totalReceive", value: 5412 },
    { category: "stockRightBalance", value: 10000 },
    { category: "fine", value: 1000 },
    { category: "goldMemeber", value: 9999 },
    { category: "shareHolding", value: 9000 },
  ];
  const offices = [
    { level: 1, time: 1591104510, user: 2 },
    { level: 2, time: 1591104510, user: 2 },
    { level: 3, time: 1591104510, user: 2 },
    { level: 4, time: 1591104510, user: 2 },
    { level: 5, time: 1591104510, user: 2 },
    { level: 6, time: 1591104510, user: 2 },
    { level: 8, time: 1591104510, user: 2 },
    { level: 8, time: 1591104510, user: 2 },
  ];
  const [approve, setApprove] = useState(true);
  const [showPopApprove, setShowPopApprove] = useState(false)
  useEffect(() => {
    const checkApprove = async () => {
      let remaining = (
        await usdt.allowance(address, contract.matrixMarketingAddress).call()
      ).remaining;
      if (Number(remaining) > 10 ** 10) {
        setApprove(true);
      }
      else {
        setShowPopApprove(true)
      }
    };
    checkApprove();
  }, []);

  //Neu approve bang false thi hien thi cap quyen Approve nut dong y se la goi funtion duoi
  const approveUSDT = async () => {
    let result = await usdt
      .approve(contract.matrixMarketingAddress, 10 ** 15)
      .send({
        callValue: 0,
        feeLimit: 1e7,
        shouldPollResponse: true,
      });
    if (result) {
      setApprove(true);
      setShowPopApprove(false)
    }
  };
  return (
    <DashboardWrap>
      {approve ?
        <Fragment>
          <div id="db-personal-info-panel">
            <span id="db-info-title">{i18n.t("personalInfo")}</span>
            <div id="db-blocks">
              {data.map((item, index) => {
                return <InfoBlock item={item} key={index} length={data.length} />;
              })}
            </div>
          </div>
          <div id="db-back-office">
            <div id="db-back-office-top">
              <span id="db-back-office-title">{i18n.t("backOffice")}</span>
              <button onClick={() => setShowPop(true)}>{i18n.t("upgrade")}</button>
            </div>

            <div id="db-blocks-office">
              {offices.map((item, index) => {
                return <OfficeBlocks item={item} key={index} />;
              })}
            </div>
          </div>
          {showPop ? (
            <PopUpgrade
              showPop={showPop}
              setShowPop={setShowPop}
              selectPlan={selectPlan}
              setSelectPlan={setSelectPlan}
            />
          ) : null}
        </Fragment>
        : null
      }
      {!approve ? (
        <Fragment>
          {showPopApprove ?
            <div id="confirm-pop">
              <div id="pop-content">
                <img src={confirmImg1} alt="" />
                <span id="pop-content-confirm-usdt-quote">
                  {i18n.t("popConfirmUsdtquote")}
                </span>
                <div id="pop-confirm-usdt-buttons">
                  <button id="refuse-button" onClick={() => setShowPopApprove(false)}>
                    {i18n.t("no")}
                  </button>
                  <button id="confirm-button" onClick={() => approveUSDT()}>
                    {i18n.t("yes")}
                  </button>
                </div>
                <div id="close-button" onClick={() => setShowPopApprove(false)}>
                  <img src={closeImg} alt="" />
                </div>
              </div>
            </div>
            : null
          }
        </Fragment>

      ) : null}
    </DashboardWrap>
  );
};

const DashboardWrap = memo(styled.div`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  flex: 1;
  width: 100%;
  flex-direction: column;
  #db-personal-info-panel {
    flex-direction: column;
    width: 100%;
    margin-bottom: 50px;
    #db-info-title {
      font-size: ${Texts.size.huge};
      line-height: ${Texts.size.huge};
      color: ${Colors.black};
      margin-bottom: 10px;
      font-weight: 500;
    }
    #db-blocks {
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }
  }
  #db-back-office {
    flex-direction: column;
    width: 100%;
    flex: 1;
    #db-back-office-top {
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      #db-back-office-title {
        font-size: ${Texts.size.huge};
        line-height: ${Texts.size.huge};
        color: ${Colors.black};
        font-weight: 500;
      }
      button {
        border-radius: 5px;
        background-color: ${Colors.orange};
        box-shadow: none;
        color: ${Colors.white};
        font-size: ${Texts.size.large};
        border: none;
        padding: 15px 40px;
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
    #db-blocks-office {
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
  }
  #confirm-pop {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    background-color: rgba(34, 34, 34, 0.8);
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    #pop-content {
      min-width: 60%;
      min-height: 50%;
      background: ${Colors.white};
      border-radius: 15px;
      flex-direction: column;
      padding: 20px 40px;
      align-items: center;
      justify-content: center;
      position: relative;
      img {
        max-width: 400px;
        margin-bottom: 40px;
      }
      #pop-content-confirm-usdt-quote {
        color: ${Colors.black1};
        font-size: ${Texts.size.large};
        line-height: ${Texts.size.large};
        margin-bottom: 40px;
      }
      #close-button {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
      }
      #pop-confirm-usdt-buttons {
        align-items: center;
        justify-content: center;
        width: 80%;
        button {
          width: 40%;
          margin: 5px 10px;
          padding: 20px 0;
          border-radius: 5px;
          box-shadow: none;
          color: ${Colors.white};
          font-size: ${Texts.size.large};
          text-transform: uppercase;
          border: none;
          &#confirm-button {
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
          &#refuse-button {
            background-color: ${Colors.black6};
            &:hover {
              background-color: ${Colors.black3};
              box-shadow: 0 3px 6px 1px rgba(0, 0, 0, 0.16);
            }
            &:disabled {
              background-color: ${Colors.black4};
              color: ${Colors.black7};
              box-shadow: none;
              cursor: not-allowed;
            }
          }
        }
      }
    }
  }
`);
