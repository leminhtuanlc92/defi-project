import React, { useState, memo } from "react";
import styled, { css } from "styled-components";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
const arrowImg = require("../../../assets/images/down-arrow.png");
interface SelectProps {
  listSelect: Array<SelectItem>;
  action: (value: any) => void;
  disabled?: boolean;
  defaultSelect?: string;
  currentSelect?: SelectItem;
  itemPattern?: string;
}
interface SelectItem {
  title: string;
  value: any;
}

const LevelLabel = [
  "Not Active",
  "Immigrant",
  "Visa Holder",
  "Permanent Resident",
  "Citizen",
  "Ambassador",
  "Senator",
  "Vice President",
  "President",
];
export default ({
  listSelect,
  action,
  disabled = false,
  defaultSelect = `-- ${i18n.t("select")} --`,
  currentSelect,
  itemPattern,
}: SelectProps) => {
  const [show, setShow] = useState(false);
  return (
    <SelectInput disabled={disabled}>
      <div
        id="sli_current_select"
        onClick={() => {
          !disabled && setShow(!show);
        }}
      >
        <span id="slics_name">
          {currentSelect && currentSelect.title !== ""
            ? itemPattern === "title - value"
              ? `${currentSelect.title} - ${currentSelect.value}`
              : currentSelect.title
            : defaultSelect}
        </span>
        <img src={arrowImg} alt="" />
      </div>
      {show ? (
        <DropList>
          <div id="slidl_wrap">
            {listSelect.map((item, index) => {
              return (
                <DropListItem
                  key={index}
                  onClick={() => {
                    action(item);
                    setShow(false);
                  }}
                >
                  <span id="slidli_item_name">
                    {itemPattern === "title - value"
                      ? `${item.title} - ${item.value}${
                          typeof item.value === "number"
                            ? ` - ${LevelLabel[item.value]}`
                            : ""
                        }`
                      : item.title + " - " + LevelLabel[item.value]}
                  </span>
                </DropListItem>
              );
            })}
          </div>
        </DropList>
      ) : null}
    </SelectInput>
  );
};

const SelectInput = memo(styled.div`
  /* width: 100%; */
  border: solid 1px ${Colors.black};
  border-radius: 5px;
  position: relative;
  background-color: ${Colors.white};
  ${(props: any) =>props.disabled
      ? css`
          cursor: not-allowed;
        `
      : css`
          cursor: pointer;
  `}
  #sli_current_select {
    flex: 1;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    #slics_name {
      font-size: ${Texts.size.large};
      line-height: ${Texts.size.large};
      color: ${Colors.black3};
      font-style: italic;
      flex:1;
    }
    @media (max-width: 480px) {
      padding: 10px;
    }
  }
`);
const DropList = memo(styled.div`
  position: absolute;
  z-index: 2;
  top: calc(100% - 3px);
  left: -1px;
  width: 100%;
  flex-direction: column;
  background-color: ${Colors.white};
  flex-wrap: wrap;
  border-bottom: solid 1px ${Colors.black};
  border-left: solid 1px ${Colors.black};
  border-right: solid 1px ${Colors.black};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow-y: scroll;
  max-height: 200px;
  #slidl_wrap {
    display:block;
    width:100%;
    /* overflow:hidden; */
  }
`);

const DropListItem = memo(styled.div`
  flex-wrap: wrap;
  flex: 1;
  padding: 10px 20px;
  #slidli_item_name {
    font-size: ${Texts.size.large};
    line-height: ${Texts.size.large};
    color: ${Colors.black};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width:100%;
  }
  &:hover {
    background-color: ${Colors.white4};
  }
`);
