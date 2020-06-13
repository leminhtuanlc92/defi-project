import React, { memo, useState, useContext } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import moment from "moment";
import i18n from "i18n-js";
import { TronContract } from "../../../contexts/tronWeb";
interface OfficeBlockProps {
  item: Item;
}
interface Item {
  level: number;
  time: number;
  user: number;
}
export default ({ item }: OfficeBlockProps) => {
  const { matrixMarketing } = useContext(TronContract);
  const reinvest = async () => {
    await matrixMarketing.refeshPackage(item.level).send({
      callValue: 0,
      feeLimit: 1e7,
      shouldPollResponse: true,
    });
  };
  return (
    <OfficeBlock>
      <div id="office-content-info">
        <div id="office-blocks-title">
          <span id="office-content-lv">
            {i18n.t("level")} {item.level}
          </span>
        </div>
        <div id="office-blocks-main">
          <div id="office-first-main">
            <span className="office-content-title">
              {i18n.t("timeAvailable")}
            </span>
            <span className="office-content-value">
              {item.time === 0
                ? i18n.t("notactive")
                : moment(item.time).format("DD/MM/YYYY")}
            </span>
          </div>
          <div id="office-second-main">
            <span className="office-content-title">
              {i18n.t("totalUser")} / {i18n.t("totalSlot")}
            </span>
            <span className="office-content-value">
              {item.user}/{3 ** item.level}
            </span>
          </div>
          <button
            id="office-blocks-btn"
            disabled={item.time < Date.now() / 1000 + 31104000}
            onClick={() => {
              reinvest();
            }}
          >
            {i18n.t("reinvest")}
          </button>
        </div>
      </div>
    </OfficeBlock>
  );
};

const OfficeBlock = memo(styled.div`
  width: 23%;
  border: solid 1px ${Colors.green1};
  border-radius: 10px;
  flex-direction: column;
  margin-bottom: 30px;
  background-color: ${Colors.white};
  &:hover {
    box-shadow: 0 0 15px 1px rgba(100, 161, 94, 0.4);
  }
  #office-content-info {
    flex-direction: column;
    padding: 10px;
    #office-blocks-title {
      font-size: ${Texts.size.large};
      line-height: ${Texts.size.large};
      color: ${Colors.green1};
      text-transform: uppercase;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      border-bottom: solid 1px ${Colors.green1};
    }
  }
  #office-blocks-main {
    flex-direction: column;
    padding: 10px;
    #office-first-main,
    #office-second-main {
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      flex-wrap: wrap;
    }
    #office-first-main {
      border-bottom: solid 1px ${Colors.black2};
    }
    .office-content-title {
      font-size: ${Texts.size.large};
      line-height: ${Texts.size.large};
      color: ${Colors.black};
    }
    .office-content-value {
      font-size: ${Texts.size.large};
      line-height: ${Texts.size.large};
      color: ${Colors.black};
      font-weight: 500;
    }
    #office-blocks-btn {
      width: 100%;
      border-radius: 5px;
      background-color: ${Colors.green1};
      box-shadow: none;
      color: ${Colors.white};
      font-size: ${Texts.size.large};
      text-transform: uppercase;
      border: none;
      padding: 18px 0;
      &:hover {
        background-color: ${Colors.green5};
        box-shadow: 0 3px 6px 1px rgba(100, 161, 94, 0.2);
      }
      &:disabled {
        background-color: ${Colors.green4};
        color: ${Colors.white3};
        box-shadow: none;
        cursor: not-allowed;
      }
    }
  }
  @media (max-width: 991px) {
    width: 48%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`);
