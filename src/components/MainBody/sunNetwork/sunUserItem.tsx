import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import SunUserItemChild from "./sunUserItemChild";
import i18n from "i18n-js";
import { TronContract } from "../../../contexts/tronWeb";
import Loading from "../../common/loading";
const arrowImg = require("../../../assets/images/ic-have-child.svg");
const avtImg = require("../../../assets/images/avt.png");
const endNodeImg = require("../../../assets/images/ic-k-nhanh.svg");
interface SunUserItemProps {
  item: any;
  topNode?: boolean;
}
export default ({ item, topNode }: SunUserItemProps) => {
  const [showChild, setShowChild] = useState(false);
  const { member, userData } = useContext(TronContract);
  const [nodeData, setNodeData] = useState({
    user: {
      parent: "",
      refs: [],
      userId: "",
    },
    level: 0,
  } as any);
  const getUser = async (_userAddress) => {
    let user = await member.getUser(_userAddress).call();
    let level = await userData.getLevel(_userAddress).call();
    setNodeData({ user, level: Number(level) });
  };
  useEffect(() => {
    if (topNode) {
      getUser(item.user.parent);
    } else {
      getUser(item);
    }
  }, []);
  return (
    <SunUserItemWrap showChild={showChild}>
      {nodeData.user.parent !== "" && nodeData.user.userId !== "" ? (
        <Fragment>
          <SunUserItemNodeMain
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
                  {i18n.t("level")}: {topNode ? item.level : nodeData.level}
                </span>
              </div>
              <div className="sunmi_bio">
                <span className="sunuser_nodename">
                  {topNode ? item.user.userId : nodeData.user.userId}
                </span>
                <span className="sunuser_address">
                  {topNode ? item.user.parent : nodeData.user.parent}
                </span>
              </div>
            </div>
          </SunUserItemNodeMain>
          {nodeData.user.refs.length > 0 && showChild ? (
            <div className="su_childnodes">
              {nodeData.user.refs.map((data: any, index: number) => {
                return <SunUserItemChild data={data} key={index} />;
              })}
            </div>
          ) : null}
        </Fragment>
      ) : (
        <Loading />
      )}
    </SunUserItemWrap>
  );
};

const SunUserItemWrap = memo(styled.div`
    flex-direction:column;
    position:relative;
    margin-bottom:10px;
    .su_childnodes{
        flex-direction:column;
        padding-left:10px;
        /* border-left: solid 1px ${Colors.green}; */
        position:relative;
        /* &:after{
            content:'',
            position
        } */
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

const SunUserItemNodeMain = memo(styled.div`
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
