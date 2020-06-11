import React, { memo, useState, useContext, useEffect, useRef } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../../constants/Colors";
import Texts from "../../../../constants/Texts";
import { SiteContext } from "../../../../contexts/siteContext";
import { TronContract } from "../../../../contexts/tronWeb";
import NodeItemWrap from "./nodeItem";
import i18n from "i18n-js";
import Loading from "../../../common/loading";
export default () => {
  const { matrixMember, address, member, userData } = useContext(TronContract);
  const {
    siteState: { aside },
  } = useContext(SiteContext);
  const [nodeData, setNodeData] = useState({
    address: "",
    sponsor: "",
    parent: "",
    F1: ["", "", ""],
    level: 0,
    name: "",
  });
  const getNode = async (_startUser) => {
    let [result, level, name] = await Promise.all([
      matrixMember.getNode(_startUser).call(),
      userData.getLevel(_startUser).call(),
      member.users(_startUser).call(),
    ]);
    setNodeData({
      address:_startUser,
      sponsor: (window as any).tronWeb.address.fromHex(result.sponsor),
      parent: (window as any).tronWeb.address.fromHex(result.parent),
      F1: result.F1.map((item) =>
        (window as any).tronWeb.address.fromHex(item)
      ),
      level: Number(level),
      name: name.username,
    });
  };
  useEffect(() => {
    getNode(address);
  }, []);
  return (
    <ChartNodesWrap>
      {nodeData === null ? (
        <Loading />
      ) : (
        <div id="cni">
          <div id="cni_sponsor">
            <NodeItemWrap node="sponsor" data={nodeData.parent} getNode={getNode} status={
                nodeData.parent === "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb"
                  ? "empty"
                  : "active"
              }/>
          </div>
          <div id="cni_user">
            <NodeItemWrap
              node="user"
              data={nodeData.address}
              level={nodeData.level}
              name={nodeData.name !== "" ? nodeData.name : nodeData.parent}
              getNode={getNode}
            />
          </div>
          <div id="cni_F1">
            <NodeItemWrap
              node="f1"
              status={
                nodeData.F1[0] === "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb"
                  ? "empty"
                  : "active"
              }
              data={nodeData.F1[0]}
              getNode={getNode}
            />
            <NodeItemWrap
              node="f1"
              status={
                nodeData.F1[1] === "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb"
                  ? "empty"
                  : "active"
              }
              data={nodeData.F1[1]}
              getNode={getNode}
            />
            <NodeItemWrap
              node="f1"
              status={
                nodeData.F1[2] === "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb"
                  ? "empty"
                  : "active"
              }
              data={nodeData.F1[2]}
              getNode={getNode}
            />
          </div>
          <div id="cni_note">
            <div className="cnin_block">
              <div className="cninb_mascot"></div>
              <span className="cninb_text">{i18n.t("emptyNode")}</span>
            </div>
            <div className="cnin_block">
              <div className="cninb_mascot"></div>
              <span className="cninb_text">{i18n.t("activeNode")}</span>
            </div>
            <div className="cnin_block">
              <div className="cninb_mascot"></div>
              <span className="cninb_text">{i18n.t("disableNode")}</span>
            </div>
          </div>
        </div>
      )}
    </ChartNodesWrap>
  );
};

const ChartNodesWrap = memo(styled.div`
  background-color: ${Colors.white};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 30px;
  flex-grow: 2;
  #cni {
    width: 100%;
    height: calc(100% * 0.9);
    /* background-color: #c7c7c7; */
    max-width: 100%;
    max-height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > div {
      width: 100%;
      justify-content: center;
      align-items: flex-end;
      &:first-child {
        height: 18%;
      }
      &:nth-child(2) {
        height: 28%;
      }
      &:nth-child(3) {
        height: 36%;
      }
    }
    #cni_user {
      position: relative;
      &:before {
        position: absolute;
        content: "";
        width: 1px;
        height: 44%;
        border-right: dashed 1px ${Colors.green};
        left: 50%;
        top: 0;
        transform: translate(-50%, 0);
      }
      &:after {
        position: absolute;
        content: "";
        width: 4px;
        height: 4px;
        margin-left: 1px;
        border-radius: 50%;
        background-color: ${Colors.green};
        left: 50%;
        bottom: 56%;
        transform: translate(-50%, 0);
      }
    }
    #cni_F1 {
      position: relative;
      &:before {
        position: absolute;
        content: "";
        width: 1px;
        height: 56.45%;
        border-right: dashed 1px ${Colors.green};
        left: 50%;
        top: 0;
        transform: translate(-50%, 0);
      }
      &:after {
        position: absolute;
        content: "";
        width: 58%;
        height: 1px;
        border-top: dashed 1px ${Colors.green};
        left: 50%;
        top: 28.225%;
        transform: translate(-50%, 0);
      }
      & > div {
        position: relative;
        &:after {
          position: absolute;
          content: "";
          width: 4px;
          height: 4px;
          margin-left: 1px;
          border-radius: 50%;
          background-color: ${Colors.green};
          left: 50%;
          top: -4px;
          transform: translate(-50%, 0);
        }
        &:first-child,
        :nth-child(3) {
          &:before {
            position: absolute;
            content: "";
            width: 1px;
            height: 63%;
            border-right: dashed 1px ${Colors.green};
            left: 50%;
            bottom: 100%;
            transform: translate(-50%, 0);
          }
        }
      }
    }
    #cni_note {
      width: 100%;
      height: 18%;
      justify-content: center;
      align-items: flex-end;
      & > div {
        width: 25%;
        height: 70%;
        margin: 0 2%;
        align-items: center;
        justify-content: center;
        .cninb_mascot {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          margin-right: 5%;
        }
        &:nth-child(1) {
          .cninb_mascot {
            border: solid 2px ${Colors.green};
          }
        }
        &:nth-child(2) {
          .cninb_mascot {
            background-color: ${Colors.blue};
          }
        }
        &:nth-child(3) {
          .cninb_mascot {
            background-color: ${Colors.red};
          }
        }
        .cninb_text {
          font-size: 2vb;
          line-height: 2vb;
          color: ${Colors.black};
          text-transform: uppercase;
        }
      }
    }
    @media (max-width:1199px){
      height:40vh;
    }
  }
`);
