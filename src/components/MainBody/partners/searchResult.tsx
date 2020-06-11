import React, { memo, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import ResultItem from "./resultItem";

interface SearchResultProps {
  data: any
}
export default ({ data }: SearchResultProps) => {
  return (
    <SearchResultWrap>
      {data.partnersList.length > 0 ? (
        <Fragment>
          {data.partnersList.map((item, index) => {
            return (
              <ResultItem
                key={index}
                id={index}
                username={item.username}
                address={item.address}
                level={item.level}
                sponsor={item.sponsor}
                partners={item.numberF1}
                lastItem={index === data.partnersList.length - 1}
              />
            );
          })}
        </Fragment>
      ) : (
          <div id="sr_empty_list">
            <span>{i18n.t("noResult")}</span>
          </div>
        )}
    </SearchResultWrap>
  );
};
const SearchResultWrap = memo(styled.div`
  width: 100%;
  display: block;
  #sr_empty_list {
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top:10px;
    span {
      font-size: ${Texts.size.large};
      line-height: ${Texts.size.large};
      color: ${Colors.black3};
    }
  }
`);
