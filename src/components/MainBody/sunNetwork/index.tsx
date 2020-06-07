import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import SunUserItem from "./sunUserItem";
import { TronContract } from "../../../contexts/tronWeb";
export default () => {
  const { member, userData } = useContext(TronContract);
  const getUser = async (_userAddress) => {
    let user = await member.getUser(_userAddress).call();
    let level = await userData.getLevel(_userAddress).call();
  };
  const HappyTreeFriends = [
    {
      name: "Dung mama",
      level: 0,
      address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
      nodes: [
        {
          name: "Dung mimi",
          level: 1,
          address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
          nodes: [
            {
              name: "Dung momo",
              level: 2,
              address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
            },
            {
              name: "Dung meme",
              level: 2,
              address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
              nodes: [
                {
                  name: "Dung mumu",
                  level: 3,
                  address:
                    "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
                  nodes: [
                    {
                      name: "Dung cece",
                      level: 0,
                      address:
                        "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Dung papa",
      level: 0,
      address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
      nodes: [
        {
          name: "Dung pipi",
          level: 0,
          address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
          nodes: [
            {
              name: "Dung popo",
              level: 0,
              address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
            },
            {
              name: "Dung pepe",
              level: 0,
              address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
            },
            {
              name: "Dung pzpz",
              level: 0,
              address: "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
              nodes: [
                {
                  name: "Dung cece",
                  level: 0,
                  address:
                    "0x5ac6hd3kuf9uo10ce9vkndln3rd10ce5ac6hd3kuf9uo10ce9",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  return (
    <SunNetworkWrap>
      <span id="sunnetwork_main_title">{i18n.t("sunNetwork")}</span>
      <div id="sunnetwork_mainbody">
        {HappyTreeFriends.map((item, index) => {
          return <SunUserItem item={item} key={index} />;
        })}
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
