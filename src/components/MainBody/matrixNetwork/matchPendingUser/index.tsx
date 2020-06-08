import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../../constants/Colors";
import Texts from "../../../../constants/Texts";
import Select from "../../../../components/common/core/Select";
import i18n from "i18n-js";
import { TronContract } from "../../../../contexts/tronWeb";
export default () => {
  const { matrixMember, address, member, userData } = useContext(TronContract);
  const [listUser, setUserList] = useState([
    { username: "fff", address: "sdfjhsk" },
  ] as any);
  const getNode = async (_startUser) => {
    let result = await matrixMember.getNode(_startUser).call();
    console.log(result);
  };

  const getNodeInfo = async (_address) => {
    const [username, level] = await Promise.all([
      member.getUsername(_address).call(),
      userData.getLevel(_address),
    ]);
    return {
      username,
      level,
      address: _address,
    };
  };
  const getListPending = async () => {
    let result = await matrixMember.getPendingList(address).call();
    let users = [] as any;
    for (let i = 0; i < result.length; i++) {
      let username = await member.getUsername(result[i]);
      users.push({
        username,
        address: result[i],
      });
    }
    setUserList(users);
  };
  const mergeNode = async (empty: any, pendingUser: any) => {
    const result = await matrixMember.mergeBranch(pendingUser, empty).send({
      callValue: 0,
      feeLimit: 1e7,
      shouldPollResponse: true,
    });
  };
  const freeNodeLevel = async (_startNode) => {
    let result = await matrixMember.findFreeLevel(_startNode).call();
    return result;
  };
  const findFreeNode = async (_startNode, _level) => {
    //TODO
  };
  let dataSelect = [] as any;
  for (let i = 0; i <= listUser.length - 1; i++) {
    dataSelect.push({
      title: listUser[i].username,
      value: listUser[i].address,
    });
  }
  useEffect(()=>{
    getListPending()
  },[])
  // console.log('listUser', listUser)
  const [emptyNode, setEmptyNode] = useState("");
  return (
    <MatchPendingUserWrap>
      <div id="match_pending_inner">
        <span id="mpi_title">{i18n.t("matchPendingToEmptyNode")}</span>
        <div id="mpi_list_user">
          <span id="mpilu_title">{i18n.t("pendingUserList")}</span>
          <Select
            listSelect={dataSelect}
            action={() => {}}
            defaultSelect={i18n.t("selectUserPending")}
          />
        </div>
        <div id="mpi_list_empty_node">
          <span id="mpilen_title">{i18n.t("userEmptyNode")}</span>
          <div id="mpilen_input">
            <div id="mpileni_textbox">
              <input onChange={(e) => setEmptyNode(e.target.value)} />
            </div>
            <button onClick={() => {}}>{i18n.t("confirm")}</button>
          </div>
        </div>
        <button onClick={() => {}}>{i18n.t("match")}</button>
      </div>
    </MatchPendingUserWrap>
  );
};

const MatchPendingUserWrap = memo(styled.div`
  background-color: ${Colors.white};
  flex-direction: column;
  flex: 1;
  padding: 15px;
  border-radius: 10px;
  #match_pending_inner {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    #mpi_title {
      font-size: ${Texts.size.huge};
      line-height: ${Texts.size.huge};
      color: ${Colors.black};
      font-weight: 500;
      margin-bottom: 20px;
    }
    #mpi_list_user {
      flex-direction: column;
      width: 100%;
      margin-bottom: 20px;
      #mpilu_title {
        font-size: ${Texts.size.large};
        line-height: ${Texts.size.large};
        color: ${Colors.black};
        margin-bottom: 10px;
      }
    }
    #mpi_list_empty_node {
      flex-direction: column;
      width: 100%;
      margin-bottom: 20px;
      #mpilen_title {
        font-size: ${Texts.size.large};
        line-height: ${Texts.size.large};
        color: ${Colors.black};
        margin-bottom: 10px;
      }
      #mpilen_input {
        flex: 1;
        #mpileni_textbox {
          flex: 1;
          input {
            flex: 1;
            padding: 0 10px;
            border: solid 1px ${Colors.black};
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            border-right: none;
          }
        }
        button {
          padding: 10px 20px;
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
        }
      }
    }
    button {
      border-radius: 5px;
      background-color: ${Colors.orange};
      box-shadow: none;
      color: ${Colors.white};
      font-size: ${Texts.size.large};
      border: none;
      padding: 10px 40px;
      &:hover {
        background-color: ${Colors.orange1};
        box-shadow: 0 3px 6px 1px rgba(255, 159, 91, 0.2);
      }
      &:disabled {
        background-color: ${Colors.orange2};
        color: ${Colors.orange3};
        box-shadow: none;
        cursor: not-allowed;
      }
    }
  }
`);
