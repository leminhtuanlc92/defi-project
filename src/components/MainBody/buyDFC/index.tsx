import React, { memo, useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import BuyPackages from "./buyPackages";
import BenTableItem from "./benTableItem";
import USDTBonusTableItem from "./usdtBonusTableItem";
import { TronContract } from "../../../contexts/tronWeb";
export default () => {
  const { shareHolder } = useContext(TronContract);
  const [currentStage, setCurrentStage] = useState({
    stage: 0,
    sold: 0,
  });
  useEffect(() => {
    shareHolder
      .currentStage()
      .call()
      .then((stage: any) => {
        shareHolder
          .stages(Number(stage))
          .call()
          .then((info: any) => {
            setCurrentStage({
              stage: Number(stage),
              sold: Number(info.sold) / 1000000,
            });
          });
      });
  }, [shareHolder]);
  const packages = [
    {
      name: "cofounder",
      dfc: 100000,
      bonus: 128,
    },
    {
      name: "angle",
      dfc: 200000,
      bonus: 64,
    },
    {
      name: "seriaa",
      dfc: 400000,
      bonus: 32,
    },
    {
      name: "seriab",
      dfc: 800000,
      bonus: 16,
    },
    {
      name: "seriac",
      dfc: 1600000,
      bonus: 8,
    },
    {
      name: "seriad",
      dfc: 3200000,
      bonus: 4,
    },
    {
      name: "prelisting",
      dfc: 6400000,
      bonus: 2,
    },
    {
      name: "listing",
      dfc: 12800000,
      bonus: 1,
    },
  ];
  const benData = [
    { id: 1, name: "cofounder", volume: 100000, bonus: 128, txs: 0 },
    { id: 2, name: "angle", volume: 200000, bonus: 64, txs: 0 },
    { id: 3, name: "seriaa", volume: 400000, bonus: 32, txs: 0 },
    { id: 4, name: "seriab", volume: 800000, bonus: 16, txs: 0 },
    { id: 5, name: "seriac", volume: 1600000, bonus: 8, txs: 0 },
    { id: 6, name: "seriad", volume: 3200000, bonus: 4, txs: 0 },
    { id: 7, name: "prelisting", volume: 6400000, bonus: 2, txs: 0 },
    { id: 8, name: "listing", volume: 12800000, bonus: 1, txs: 0 },
  ];
  const bonusData = [
    { level: 1, percent: 10 },
    { level: 2, percent: 8 },
    { level: 3, percent: 6 },
    { level: 4, percent: 4 },
    { level: 5, percent: 2 },
    { level: 6, percent: 1 },
    { level: 7, percent: 1 },
    { level: 8, percent: 1 },
  ];
  const handleBuy = () => {};
  return (
    <BuyDFCWrap>
      <div id="buydfc_mainbody">
        <div id="bdfcm_round">
          <span className="bdfcmr_block_title">{i18n.t("buyRound")}</span>
          <div id="bdfcmr_content">
            {packages.map((item, index) => {
              return (
                <BuyPackages
                  key={index}
                  name={item.name}
                  dfc={item.dfc}
                  stage={index}
                  currentStage={currentStage}
                  bonus={item.bonus}
                  action={handleBuy}
                />
              );
            })}
          </div>
        </div>
        <div id="bdfcm_mid_content">
          <div id="bdfcmmc_left">
            <span className="bdfcmr_block_title">{i18n.t("benTable")}</span>
            <div id="bdfcmmc_table_wrap">
              <div className="bdfcmmct_header">
                <div className="bdfcmmct_id">
                  <span>{i18n.t("noNumber")}</span>
                </div>
                <div className="bdfcmmct_name">
                  <span>{i18n.t("name")}</span>
                </div>
                <div className="bdfcmmct_volume">
                  <span>{i18n.t("volume")}</span>
                </div>
                <div className="bdfcmmct_bonus">
                  <span>{i18n.t("bonus")}</span>
                </div>
                {/* <div className="bdfcmmct_tx">
                  <span>{i18n.t("tx")}</span>
                </div> */}
              </div>
              <div className="bdfcmmct_body">
                {benData.map((item, index) => {
                  return (
                    <BenTableItem
                      key={index}
                      id={item.id}
                      name={item.name}
                      volume={item.volume}
                      bonus={item.bonus}
                      txs={item.txs}
                      lastItem={index === benData.length - 1}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div id="bdfcmmc_right">
            <span className="bdfcmr_block_title">{i18n.t("usdtBonus")}</span>
            <div id="bdfcmmc_table_wrap">
              <div className="bdfcmmct_header">
                <div className="bdfcmmct_level">
                  <span>{i18n.t("level")}</span>
                </div>
                <div className="bdfcmmct_percent">
                  <span>%</span>
                </div>
              </div>
              <div className="bdfcmmct_body">
                {bonusData.map((item, index) => {
                  return (
                    <USDTBonusTableItem
                      key={index}
                      level={item.level}
                      percent={item.percent}
                      lastItem={index === bonusData.length - 1}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* <div id="bdfcm_sumup">
          <span>
            {`=>`} {i18n.t("totalDFCusing")}:{" "}
            <span className="bdfcms_value">12,800,000 * 7</span>
            {i18n.t("token")}
          </span>
          <span>
            {`=>`} {i18n.t("totalAvailableDFC")}:{" "}
            <span className="bdfcms_value">12,800,000</span> {i18n.t("token")}
          </span>
        </div> */}
      </div>
    </BuyDFCWrap>
  );
};

const BuyDFCWrap = memo(styled.div`
    flex: 1;
    width: 100%;
    flex-direction: column;
    overflow-y:scroll;
    display:flex;
    div{
      display:flex;
    }
    #buydfc_mainbody{
        /* background-color:${Colors.white}; */
        flex-direction:column;
        flex:1;
        border-radius:10px;
        .bdfcmr_block_title{
            font-size: ${Texts.size.huge};
            line-height: ${Texts.size.huge};
            color: ${Colors.black};
            margin-bottom: 10px;
            font-weight: 500;
        }
        #bdfcm_round{
            flex-direction:column;
            #bdfcmr_content{
                flex: 1;
                justify-content: space-between;
                flex-wrap: wrap;
            }
        }
        #bdfcm_mid_content{
          justify-content:space-between;
          min-height: 300px;
          max-height: 450px;
          overflow: hidden;
          #bdfcmmc_left{
              flex-direction:column;
              flex:0.7;
              @media (max-width:767px){
                flex:1;
                margin-bottom:20px;
              }
          }
          #bdfcmmc_right{
              flex:0.3;
              margin-left:30px;
              flex-direction:column;
              @media (max-width:767px){
                flex:1;
                margin-left:0;
              }
          }
          #bdfcmmc_table_wrap{
              background-color:${Colors.white};
              flex-direction:column;
              flex:1;
              border-radius:10px;
              padding:10px;
              .bdfcmmct_body{
                  flex-direction:column;
              }
          }
          .bdfcmmct_id{
              flex:.1;
              flex-wrap:wrap;
              align-items:center;
              padding:0 5px 0 0;
          }
          .bdfcmmct_name{
              flex:.2;
              flex-wrap:wrap;
              justify-content:center;
              align-items:center;
              padding:0 5px;
          }
          .bdfcmmct_volume{
              flex:.2;
              flex-wrap:wrap;
              justify-content:center;
              align-items:center;
              padding:0 5px;
          }
          .bdfcmmct_bonus{
              flex:.2;
              flex-wrap:wrap;
              justify-content:center;
              align-items:center;
              padding:0 5px;
          }
          .bdfcmmct_tx{
              flex:.25;
              flex-wrap:wrap;
              justify-content:flex-end;
              align-items:center;
              padding:0 0 0 5px;
              span{
                  text-align:right;
              }
          }
          .bdfcmmct_header{
              margin:0 20px;
              padding:15px 0;
              flex:1;
              justify-content:space-between;
              align-items:center;
              border-bottom: solid 1px ${Colors.black};
              span{
                  font-size: ${Texts.size.large};
                  line-height: ${Texts.size.large};
                  color: ${Colors.black};
                  font-weight: 500;
              }
          }
          @media (max-width:767px){
            flex-direction:column;
            height:auto;
            min-height:initial;
            max-height:initial;
          }
        }
        #bdfcm_sumup{
            flex-direction:column;
            margin-top:20px;
            span{
                font-size: ${Texts.size.larger};
                line-height: ${Texts.size.larger};
                color: ${Colors.black};
                margin-bottom: 10px;
                font-weight: 500;
                &.bdfcms_value{
                    font-size: ${Texts.size.huge};
                    color: ${Colors.black};
                    font-weight:700
                }
            }
        }
    }
`);
