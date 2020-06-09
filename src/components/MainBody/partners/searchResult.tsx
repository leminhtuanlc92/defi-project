import React, { memo, Fragment, useContext } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import ResultItem from "./resultItem";

interface SearchResultProps {
  data:any
}
export default ({ data }: SearchResultProps) => {
  
  const searchData = [
    {
      id: 1,
      username: "Dung 4 não",
      address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
      level: 5,
      sponsor: "Dung mắt to",
      partners: 1,
    },
    {
      id: 2,
      username: "Dung 4 não",
      address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
      level: 5,
      sponsor: "Dung mắt to",
      partners: 1,
    },
    {
      id: 3,
      username: "Dung 4 não",
      address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
      level: 5,
      sponsor: "Dung mắt to",
      partners: 1,
    },
    {
      id: 4,
      username: "Dung 4 não",
      address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
      level: 5,
      sponsor: "Dung mắt to",
      partners: 1,
    },
    {
      id: 5,
      username: "Dung 4 não",
      address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
      level: 5,
      sponsor: "Dung mắt to",
      partners: 1,
    },
  ];
  return (
    <SearchResultWrap>
      {searchData.length > 0 ? (
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
                lastItem={index === searchData.length - 1}
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
    span {
      font-size: ${Texts.size.large};
      line-height: ${Texts.size.large};
      color: ${Colors.black3};
    }
  }
`);
