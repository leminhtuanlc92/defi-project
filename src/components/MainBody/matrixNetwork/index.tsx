import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import SearchNodes from "./searchNodes";
import ChartNodes from "./chartNodes";
import MatchPendingUser from "./matchPendingUser";
import { TronContract } from "../../../contexts/tronWeb";
import NotActive from "./notActive";
import { contract } from "../../../config";
export default () => {
  const [isActive, setIsActive] = useState(false);
  const { address, matrixMember } = useContext(TronContract);
  useEffect(() => {
    matrixMember
      .isActiveMatrix(address)
      .call()
      .then((active) => {
        setIsActive(active);
      });
  }, []);
  const [sponsor, setSponsor] = useState("");
  useEffect(() => {
    if (!isActive && sponsor === "") {
      matrixMember
        .getNode(address)
        .call()
        .then((node) => {
          setSponsor((window as any).tronWeb.address.fromHex(node.sponsor));
        });
    }
  }, [isActive]);
  return (
    <MatrixNetworkWrap>
      <span id="matrixnetwork_main_title">{i18n.t("matrixNetwork")}</span>
      <div id="matrixnetwork_mainbody">
        {isActive || address === contract.adminAddress ? (
          <Fragment>
            <div id="mtnmb_left">
              <ChartNodes />
              <MatchPendingUser />
            </div>
            <div id="mtnmb_right">
              <SearchNodes />
            </div>
          </Fragment>
        ) : (
          <NotActive sponsor={sponsor} />
        )}
      </div>
    </MatrixNetworkWrap>
  );
};

const MatrixNetworkWrap = memo(styled.div`
  flex: 1;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  #matrixnetwork_main_title {
    font-size: ${Texts.size.huge};
    line-height: ${Texts.size.huge};
    color: ${Colors.black};
    margin-bottom: 10px;
    font-weight: 500;
  }
  #matrixnetwork_mainbody {
    justify-content: space-between;
    flex: 1;
    #mtnmb_left {
      flex-direction: column;
      width: 65%;
      @media (max-width: 1199px) {
        width: 100%;
        margin-bottom: 30px;
      }
    }
    #mtnmb_right {
      width: calc(35% - 30px);
      @media (max-width: 1199px) {
        width: 100%;
      }
    }
    #matrixnetwork_mainbody_nolog {
      background-color: ${Colors.white};
      border-radius: 10px;
      justify-content: space-around;
      align-items: center;
      padding: 15px;
      #mtnmb_notlog_left {
        flex: 0.4;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          &:first-child {
            color: ${Colors.orange};
            font-size: ${Texts.size.extra};
            line-height: ${Texts.size.extra};
            font-weight: bold;
            margin-bottom: 30px;
          }
          &:nth-child(2),
          :nth-child(3) {
            color: ${Colors.black};
            font-size: ${Texts.size.large};
            line-height: ${Texts.size.large};
            margin-bottom: 10px;
            text-align: center;
          }
        }
        img {
          margin-top: 30px;
        }
      }
      #mtnmb_notlog_right {
        flex: 0.45;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        & > span {
          color: ${Colors.black};
          font-size: ${Texts.size.huge};
          line-height: ${Texts.size.huge};
          margin-bottom: 30px;
        }
        #mtnmbnlr_inner {
          border: solid 1px ${Colors.green};
          border-radius: 5px;
          flex-direction: column;
          padding: 20px;
          background-color: ${Colors.white4};
          width: calc(100% - 62px);
          div {
            flex: 1;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
            span {
              color: ${Colors.black};
              font-size: ${Texts.size.large};
              line-height: ${Texts.size.large};
              &:first-child {
                flex: 0.4;
                text-transform: uppercase;
                text-align: right;
                @media (max-width: 480px) {
                  margin-bottom: 5px;
                }
              }
              &:nth-child(2) {
                flex: 0.55;
                font-weight: 500;
                line-break: anywhere;
              }
            }
            @media (max-width: 480px) {
              flex-direction: column;
              margin-bottom: 20px;
            }
          }
        }
      }
      @media (max-width: 991px) {
        flex-direction: column;
        width: 100%;
        #mtnmb_notlog_right,
        #mtnmb_notlog_left {
          flex: 1;
        }
      }
    }
    @media (max-width: 1199px) {
      flex-direction: column;
    }
  }
`);
