import React, { memo, Fragment, useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../../constants/Colors";
import Texts from "../../../../constants/Texts";
import { TronContract } from "../../../../contexts/tronWeb";
const avtImg = require("../../../../assets/images/avt.png");
interface NodeItemProps {
  node: string;
  status?: string;
  data: string;
  level?: number;
  name?: string;
  getNode: (address) => void;
}
export default ({ node, status, data, level, name, getNode }: NodeItemProps) => {
  const { member, userData, matrixMember } = useContext(TronContract);
  const [curretnNodeData, setCurretnNodeData] = useState({
    address: "",
    level: 0,
    name: "",
  });
  const getCurrentNode = async (_startUser) => {
    if (status !== "empty") {
      let [result, level, name] = await Promise.all([
        matrixMember.getNode(_startUser).call(),
        userData.getLevel(_startUser).call(),
        member.users(_startUser).call(),
      ]);
      setCurretnNodeData({
        address: (window as any).tronWeb.address.fromHex(result.parent),
        level: Number(level),
        name: name.username,
      });
    }
  };
  useEffect(() => {
    if (data !== "") {
      getCurrentNode(data);
    }
  }, [data]);
  return (
    <NodeItemWrap node={node} status={status} onClick={() => {
      if (data !== '' && status !== 'empty') { getNode(data) }
    }}>
      <div className="niw_inner">
        {node === "f1" && status === "empty" ? (
          <div className="niwi_spec">
            <img src={avtImg} alt="" />
          </div>
        ) : (
            <Fragment>
              <div className="niw_left">
                <img src={avtImg} alt="" />
              </div>
              <div className="niw_right">
                <span className="niwr_name">
                  {node === "user" ? name : curretnNodeData.name}
                </span>
                <span className="niwr_lv">
                  Lv. {node === "user" ? level : curretnNodeData.level}
                </span>
              </div>
            </Fragment>
          )}
      </div>
    </NodeItemWrap>
  );
};

const NodeItemWrap = memo(styled.div`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  ${(props: any) =>
    props.node === "sponsor"
      ? css`
          height: 88.1%;
          background-color: ${Colors.green1};
        `
      : props.node === "user"
        ? css`
          height: 56%;
          background-color: ${Colors.green1};
        `
        : props.status === "disable"
          ? css`
          height: 43.55%;
          background-color: ${Colors.red};
        `
          : props.status === "active"
            ? css`
          height: 43.55%;
          background-color: ${Colors.blue};
        `
            : css`
          height: 43.55%;
          background-color: none;
        `
  };
  ${(props: any) =>
    props.status !== "empty"?
    css`cursor: pointer;`:
    css`cursor: not-allowed;`
  }
  width: 25%;
  position: relative;
  margin: 0 2%;
  .niw_inner {
    width: 90%;
    height: 90%;
    ${(props: any) =>
    props.node === "f1" && props.status === "empty"
      ? css`
            padding: 0 5%;
          `
      : css`
            padding: 5%;
          `};
    align-items: center;
    justify-content: center;
    .niw_left {
      flex: 1;
      align-items: center;
      justify-content: center;
      max-width: 40%;
      img {
        width: 50%;
      }
    }
    .niw_right {
      flex: 1;
      max-width: 60%;
      flex-direction: column;
      justify-content: space-between;
      .niwr_name,
      .niwr_lv {
        font-size: 1vw;
        line-height: 1vw;
        color: ${Colors.white};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .niwi_spec {
      position: relative;
      height: 100%;
      img {
        height: 100%;
      }
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: -2px;
        left: -2px;
        z-index: 2;
        border-radius: 50%;
        background-color: ${Colors.white};
        border: solid 2px ${Colors.green};
      }
    }
  }
`);
