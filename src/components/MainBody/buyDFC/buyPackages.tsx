import React, { memo, useState } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import BuyPop from "./buyPopup";
import i18n from "i18n-js";
interface BuyPackagesProps {
  name: string;
  dfc: number;
  stage: number;
  bonus: number;
  action: () => void;
  currentStage: any;
}
export default ({
  name,
  dfc,
  stage,
  bonus,
  currentStage,
  action,
}: BuyPackagesProps) => {
  const [showPop, setShowPop] = useState(false);
  console.log('currentStage', currentStage, stage)
  return (
    <BuyPakagesBlock onSale={currentStage.stage === stage}>
      <div id="buy_pakage_info">
        <div id="bpi_title">
          <span id="bpit_name">{i18n.t(name)}</span>
        </div>
        <div id="bpi_main">
          <div id="bpim_first">
            <span className="bpim_title">{i18n.t("DFC")}</span>
            <span className="bpim_value">{dfc} </span>
          </div>
          <div id="bpim_second">
            <span className="bpim_title">{i18n.t("DFCsold")}</span>
            <span className="bpim_value">
              {stage < currentStage.stage
                ? dfc
                : stage === currentStage.stage
                  ? dfc - currentStage.sold
                  : 0}
            </span>
          </div>
          <div id="bpim_third">
            <span className="bpim_title">{i18n.t("DFCavailable")}</span>
            <span className="bpim_value">
              {stage < currentStage.stage
                ? dfc
                : stage === currentStage.stage
                  ? dfc - currentStage.sold
                  : dfc}
            </span>
          </div>
          <div id="bpim_fourth">
            <span className="bpim_title">{i18n.t("DFCbonus")}</span>
            <span className="bpim_value">{bonus}</span>
          </div>
          <button
            id="bpim_button"
            disabled={currentStage.stage !== stage}
            onClick={() => setShowPop(true)}
          >
            {currentStage.stage === stage ?
              i18n.t("buy") :
              currentStage.stage > stage ?
                i18n.t("soldOut")
                :
                i18n.t("saleAwait")
            }
          </button>
        </div>
      </div>
      {showPop ? (
        <BuyPop
          showPop={showPop}
          setShowPop={setShowPop}
          available={dfc - currentStage.sold}
        />
      ) : null}
    </BuyPakagesBlock>
  );
};

const BuyPakagesBlock = memo(styled.div`
  width: 23%;
  border: solid 1px ${Colors.green1};
  border-radius: 10px;
  flex-direction: column;
  margin-bottom: 30px;
  #buy_pakage_info {
    flex-direction: column;
    padding: 10px;
    #bpi_title {
      font-size: ${Texts.size.large};
      line-height: ${Texts.size.large};
      color: ${Colors.black1};
      border-bottom: solid 1px ${Colors.black1};
      text-transform: uppercase;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
    }
  }
  #bpi_main {
    flex-direction: column;
    #bpim_first,
    #bpim_second,
    #bpim_third,
    #bpim_fourth {
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      margin: 0 10px;
      flex-wrap: wrap;
    }
    #bpim_first,
    #bpim_second,
    #bpim_third {
      border-bottom: solid 1px ${Colors.black2};
    }
    .bpim_title {
      font-size: ${Texts.size.large};
      line-height: ${Texts.size.large};
      color: ${Colors.black};
    }
    .bpim_value {
      font-size: ${Texts.size.large};
      line-height: ${Texts.size.large};
      color: ${Colors.black};
    }
    #bpim_button {
      width: 100%;
      border-radius: 5px;
      ${(props: any) => props.onSale ?
        css`background-color: ${Colors.green5};`
        :
        css`background-color: ${Colors.green4};`
      }
      box-shadow: none;
      color: ${Colors.white};
      font-size: ${Texts.size.large};
      text-transform: uppercase;
      border: none;
      padding: 18px 0;
      margin-top: 10px;
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
  &:hover {
    box-shadow: 0 0 15px 1px rgba(100, 161, 94, 0.4);
    .bpim_value {
      font-weight: 500;
    }
    #buy_pakage_info {
      #bpi_title {
        color: ${Colors.green1};
        border-bottom: solid 1px ${Colors.green1};
      }
    }
  }
`);
