import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import SunUserItem from "./sunUserItem";
import i18n from "i18n-js";
import { TronContract } from "../../../contexts/tronWeb";
import Loading from "../../common/loading";
const arrowImg = require("../../../assets/images/ic-have-child.svg");
const avtImg = require("../../../assets/images/avt.png");
const endNodeImg = require("../../../assets/images/ic-k-nhanh.svg");
interface SunUserItemChildProps {
  data: any;
  index: number;
}
export default ({ data, index }: SunUserItemChildProps) => {
  const [showChild, setShowChild] = useState(false);
  const { member, userData, tronWeb } = useContext(TronContract);
  const [nodeData, setNodeData] = useState({
    user: {
      parent: "",
      refs: [],
      userId: "",
      activeStaking: 0,
      teamStaking: 0
    },
    level: 0,
  } as any);
  const getUser = async (_userAddress) => {
    let user = await member.getUser(_userAddress).call();
    let level = await userData.getLevel(_userAddress).call();
    setNodeData({ user, level: Number(level) });
  };
  useEffect(() => {
    getUser(data);
  }, []);
  return (
    <SunUserItemChildWrap
      showChild={showChild}
      oneChildLeft={nodeData.user.refs.length === 1}
    >
      {nodeData.user.parent !== "" && nodeData.user.userId !== "" ? (
        <Fragment>
          <SunUserItemChildNodeMain
            showChild={showChild}
            onClick={() => {
              nodeData.user.refs.length > 0 && setShowChild(!showChild);
            }}
          >
            <SunChildNodeImage
              src={nodeData.user.refs.length === 0 ? endNodeImg : arrowImg}
              alt=""
              showChild={showChild}
            />
            <div className="sunm_info">
              <div className="sunmi_avt">
                <img src={avtImg} alt="" />
                <span>
                  {i18n.t("level")}: {nodeData.level}
                </span>
              </div>
              <div className="sunmi_bio">
                <span className="sunuser_nodename">{nodeData.user.userId}</span>
                <span className="sunuser_address">
                  {tronWeb.address.fromHex(data)}
                </span>
              </div>
              <div className="sunmi_bio">
                <span className="sunuser_nodename">{i18n.t('activeStakings')}: {nodeData.user.activeStaking}</span>
                <span className="sunuser_address">{i18n.t('teamStakings')}: {nodeData.user.teamStaking}</span>
              </div>
            </div>
          </SunUserItemChildNodeMain>
          {nodeData.user.refs.length > 0 && showChild ? (
            <div className="su_childnodes">
              {nodeData.user.refs.map((item: any, index: number) => {
                return <SunUserItem item={item} key={index} index={index} />;
              })}
            </div>
          ) : null}
        </Fragment>
      ) : (
          <Loading />
        )}
    </SunUserItemChildWrap>
  );
};

const SunUserItemChildWrap = memo(styled.div`
  flex-direction: column;
  position: relative;
  margin-bottom: 10px;
  &:before {
    ${(props: any) =>
    (props.showChild && props.firstChild) || !props.showChild
      ? css`
            content: "";
          `
      : css``}
    position:absolute;
    width: 10px;
    height: 1px;
    left: -10px;
    top: 50%;
    transform: translate(0, -50%);
    background-color: ${Colors.green};
  }
  &:after {
    ${(props: any) =>
    props.showChild &&
    css`
        content: "";
      `}
    position:absolute;
    width: 1px;
    height: calc(100% - 48px);
    ${(props: any) =>
    props.showChild
      ? css`
            top: 0;
          `
      : css`
            top: 10px;
          `}
    left:0;
    background-color: ${Colors.green};
  }
  .su_childnodes {
    position: relative;
    &:before {
      ${(props: any) =>
    props.showChild &&
    css`
          content: "";
        `}
      position:absolute;
      width: 10px;
      height: 1px;
      left: -10px;
      top: -48px;
      transform: translate(0, -50%);
      background-color: ${Colors.green};
    }
    &:after {
      content: "";
      position: absolute;
      width: 1px;
      height: calc(100% - 48px);
      z-index: 2;
      ${(props: any) =>
    props.showChild
      ? css`
              ${(props: any) =>
          props.oneChildLeft
            ? css`
                      top: 39px;
                      width: 5px;
                      background-color: red;
                    `
            : css`
                      top: 0;
                      left: 0;
                      background-color: ${Colors.green};
                    `}
            `
      : css`
              ${(props: any) =>
          props.oneChildLeft
            ? css`
                      top: 39px;
                      width: 5px;
                    `
            : css`
                      left: 0;
                      top: 10px;
                      background-color: ${Colors.green};
                    `}
            `}
    }
  }
`);

const SunChildNodeImage = memo(styled.img`
  width: 24px;
  object-fit: contain;
  margin: 10px;
  ${(props: any) =>
    props.showChild
      ? css`
          transform: rotate(90deg);
        `
      : css`
          transform: rotate(0deg);
        `};
  @media (max-width: 480px) {
    margin: 0;
  }
`);

const SunUserItemChildNodeMain = memo(styled.div`
  align-items: center;
  flex: 1;
  padding: 10px;
  margin-bottom: 10px;
  border: solid 1px ${Colors.green};
  ${(props: any) =>
    props.showChild
      ? css`
          border-radius: 0px;
        `
      : css`
          border-radius: 10px;
        `};
  .sunm_info {
    margin-left: 10px;
    flex: 1;
    .sunmi_avt {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-width: 16%;
      @media (max-width: 480px) {
        min-width: 30%;
      }
      img {
        object-fit: contain;
        width: 30px;
        margin-bottom: 5px;
      }
      span {
        font-size: ${Texts.size.normal};
        line-height: ${Texts.size.normal};
        color: ${Colors.black};
      }
    }
    @media (max-width: 480px) {
      margin-left: 5px;
      width: 87%;
    }
  }
  .sunmi_bio {
    margin-left: 10px;
    flex-direction: column;
    justify-content: center;
    span {
      font-size: ${Texts.size.large};
      line-height: ${Texts.size.large};
      color: ${Colors.black};
      line-break: anywhere;
    }
    .sunuser_nodename {
      margin-bottom: 10px;
    }
    @media (max-width: 480px) {
      width: 65%;
      .sunuser_address {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
    }
  }
  @media (max-width: 480px) {
    width: calc(100% - 20px);
  }
`);
