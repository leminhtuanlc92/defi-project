import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import SunUserItem from "./sunUserItem";
import { TronContract } from "../../../contexts/tronWeb";
export default () => {
  const { member, userData, address } = useContext(TronContract);
  const [nodeData, setNodeData] = useState({ user: null, level: 0 } as any)
  const getUser = async (_userAddress) => {
    let user = await member.getUser(_userAddress).call();
    let level = await userData.getLevel(_userAddress).call();
    setNodeData({ user, level })
  };
  useEffect(() => {
    getUser(address)
  }, [])
  console.log('nodeData', nodeData)
  return (
    <SunNetworkWrap>
      <span id="sunnetwork_main_title">{i18n.t("sunNetwork")}</span>
      <div id="sunnetwork_mainbody">
        {nodeData.user !== null ?
          <SunUserItem item={nodeData} />
          :
          <span>{i18n.t('noData')}</span>
        }
      </div>
    </SunNetworkWrap>
  );
};
const SunNetworkWrap = memo(styled.div`
  flex: 1;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  #sunnetwork_main_title {
    font-size: ${Texts.size.huge};
    line-height: ${Texts.size.huge};
    color: ${Colors.black};
    margin-bottom: 10px;
    font-weight: 500;
  }
  #sunnetwork_mainbody {
    background-color: ${Colors.white};
    flex-direction: column;
    flex: 1;
    padding: 15px;
    border-radius: 10px;
  }
`);
