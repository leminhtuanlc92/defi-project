import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import { TronContract } from "../../../contexts/tronWeb";
interface PartnerItemProps {
  id: number;
  username: string;
  address: string;
  level: number;
  sponsor: string;
  partners: number;
  lastItem?: boolean;
}
export default ({
  id,
  username,
  address,
  level,
  sponsor,
  partners,
  lastItem,
}: PartnerItemProps) => {
  const { tronWeb } = useContext(TronContract);
  return (
    <PartnerItemWrap lastItem={lastItem}>
      <div className="psl_number">
        <span>{id}</span>
      </div>
      <div className="psl_username">
        <span>{username}</span>
      </div>
      <div className="psl_address">
        <span>{tronWeb.address.fromHex(address)}</span>
      </div>
      <div className="psl_level">
        <span>{level}</span>
      </div>
      <div className="psl_sponsor">
        <span>{tronWeb.address.fromHex(sponsor)}</span>
      </div>
      {/* <div className="psl_partners">
                <span>{partners}</span>
            </div> */}
    </PartnerItemWrap>
  );
};

const PartnerItemWrap = memo(styled.div`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  position: relative;
  &:after {
    position: absolute;
    content: "";
    width: calc(100% - 40px);
    bottom: 0;
    left: 20px;
    ${(props: any) =>
      props.lastItem
        ? css`
            height: 0px;
          `
        : css`
            height: 1px;
          `};
    background-color: ${Colors.black};
  }
  div {
    overflow: hidden;
  }
  span {
    font-size: ${Texts.size.large};
    line-height: ${Texts.size.large};
    color: ${Colors.black};
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover {
    background-color: ${Colors.green6};
    box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.1);
    &:after {
      height: 0;
    }
  }
  .psl_number {
    span {
    }
  }
  .psl_username {
    span {
      text-align: center;
    }
  }
  .psl_address {
    span {
      text-align: center;
    }
  }
  .psl_level {
    span {
      text-align: center;
    }
  }
  .psl_sponsor {
    span {
      text-align: center;
    }
  }
  .psl_partners {
    span {
      text-align: right;
    }
  }
`);
