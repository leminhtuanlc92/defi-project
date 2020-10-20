import React, { memo, useState } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
const imgs = {
  totalReceive: require('assets/images/coins.svg'),
  stockRightBalance: require('assets/images/money-coin.svg'),
  fine: require('assets/images/moneys.svg'),
  level: require('assets/images/badge.svg'),
  shareHolding: require('assets/images/ticket.svg'),
}
interface InfoBlockProps {
  item: Item;
  length: number;
}
interface Item {
  category: string;
  value: any;
}
export default ({ item, length }: InfoBlockProps) => {
  return (
    <InfoBlock length={length}>
      <div id="inner-content-info">
        <div className="ici_icon">
          <img src={imgs[item.category]} alt="" />
        </div>
        <div id="inner-info-wrap">
          <span id="info-content-title">{i18n.t(item.category)}</span>
          <span id="info-content-value">
            {typeof item.value === "number"
              ? i18n.toNumber(item.value, { precision: 0 })
              : item.value}
          </span>
        </div>
      </div>
    </InfoBlock>
  );
};

const InfoBlock = memo(styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: ${Colors.orange5};
  border:solid 1px #EF89404D;
  position: relative;
  width: 18.5%;
  #inner-content-info {
    display:flex;
    padding:1rem;
    width: calc(100% - 2rem);
    .ici_icon{
        width:46px;
        height:46px;
        display:flex;
        align-items:center;
        justify-content:center;
        background-color:${Colors.white};
        border:solid 1px ${Colors.orange6};
        border-radius:5px;
        img{
            width:30px;
        }
    }
    #inner-info-wrap {
      display:flex;
      flex-direction: column;
      padding: 0 0 0 1rem;
      #info-content-title {
        font-size: ${Texts.size.large};
        line-height: ${Texts.size.huge};
        color: ${Colors.black1};
        text-align: left;
        max-width: 100%;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
      }
      #info-content-value {
        font-size: ${Texts.size.gigantic};
        line-height: ${Texts.size.gigantic};
        color: #ed8c47;
        text-align: left;
        font-weight: 700;
        max-width: 100%;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        @media (max-width: 480px) {
          line-height: inherit;
        }
      }
    }
  }
  @media (max-width: 1360px) {
    width: 48%;
    margin-bottom: 20px;
    &:last-child {
      width: 100%;
      margin-bottom: 0;
    }
  }
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`);
