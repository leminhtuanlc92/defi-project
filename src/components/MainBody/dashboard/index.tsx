import React, { memo, useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import InfoBlock from "./infoBlocks";
import OfficeBlocks from "./officeBlocks";
import PopUpgrade from "./popUpgrade";
import { TronContract } from "../../../contexts/tronWeb";
const closeImg = require("../../../assets/images/close.png");
export default () => {
  const [showPop, setShowPop] = useState(false);
  const [selectPlan, setSelectPlan] = useState(1);
  const { userData, token, matrixMember } = useContext(TronContract);

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
  return (
    <DashboardWrap>
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
`);
