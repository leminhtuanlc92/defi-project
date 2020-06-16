import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../../constants/Colors";
import Texts from "../../../../constants/Texts";
import i18n from "i18n-js";
import Select from "../../../../components/common/core/Select";
import { TronContract } from "../../../../contexts/tronWeb";
import MergePop from "../mergePop";
import { toast } from "react-toastify";
import WAValidator from "multicoin-address-validator";
import Loading from "../../../common/loading";
const closeImg = require("../../../../assets/images/close.png");
const checkImg = require("../../../../assets/images/ic-green-check.png");
const upgradeSuccess = require("../../../../assets/images/upgrade-successful.svg");
const backImg = require("../../../../assets/images/white-back.png");
export default () => {
  const [step, setStep] = useState(0);
  const { matrixMember, address, member, userData } = useContext(TronContract);
  const [listUser, setUserList] = useState([] as any);
  const [selectPending, setSelectPending] = useState({ title: "", value: "" });
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [userEmptyNode, setUserEmptyNode] = useState({
    address: "",
    level: "",
    username: "",
  });
  const [showPop, setShowPop] = useState({ result: '', show: false });
  const [validAddress, setValidAddress] = useState(false);
  const validate = (data) => {
    let valid = WAValidator.validate(data, "trx");
    setValidAddress(valid);
  };
  const freeNodeLevel = async (_startNode) => {
    setSearchLoading(true);
    let result = await matrixMember.findFreeLevel(_startNode).call();
    setUserEmptyNode({
      ...userEmptyNode,
      level: Number(result).toString(),
    });
    setStep(1);
    findFreeNode(_startNode, Number(result));
    return Number(result);
  };

  const findFreeNode = async (_startNode, _level) => {
    //TODO
    let result = undefined;
    let start = 0;
    while (result === undefined) {
      let free = await matrixMember
        .findFreeNode(_startNode, _level, start, 50)
        .call();
      if (free !== "410000000000000000000000000000000000000000") {
        result = free;
      } else {
        start += 50;
      }
    }
    let add = (window as any).tronWeb.address.fromHex(result);
    getNodeInfo(add);
    return result;
  };

  const getNodeInfo = async (_address) => {
    const [username, level] = await Promise.all([
      member.getUsername(_address).call(),
      userData.getLevel(_address).call(),
    ]);
    setUserEmptyNode({
      address: _address,
      level: Number(level) + "",
      username: username === "" ? "notSet" : username,
    });
    setStep(2);
    getListPending();
    return {
      username,
      level: Number(level),
    };
  };

  const getListPending = async () => {
    let result = await matrixMember.getPendingList(address).call();
    let users = [] as any;
    for (let i = 0; i < result.length; i++) {
      let username = await member.getUsername(result[i]).call();
      users.push({
        title: `${username} - ${(window as any).tronWeb.address
          .fromHex(result[i])
          .slice(0, 5)}...${(window as any).tronWeb.address
            .fromHex(result[i])
            .slice(-6)}`,
        value: (window as any).tronWeb.address.fromHex(result[i]),
      });
    }
    setUserList(users);
    setStep(3);
    setSearchLoading(false);
  };

  const mergeNode = async (empty: any, pendingUser: any) => {
    setLoading(true);
    try {
      const result = await matrixMember.mergeBranch(pendingUser, empty).send({
        callValue: 0,
        feeLimit: 2e7,
        shouldPollResponse: true,
      });
      setLoading(false);
      setShowPop({ result: 'success', show: true })
    } catch (error) {
      console.log('merge search node error', error.error)
      setShowPop({ result: 'fail', show: true })
      setLoading(false);
    }
  };
  return (
    <SearchNodesWrap validAddress={validAddress} userInput={userInput}>
      <span id="search_node_title">{i18n.t("searchEmptyNode")}</span>
      <span id="search_node_quote">{i18n.t("searchEmptyNodeQuote")}</span>
      <div id="sn_input">
        <div id="sni_textbox">
          <input
            onChange={(e) => {
              validate(e.target.value);
              setUserInput(e.target.value);
            }}
          />
        </div>
        <button
          disabled={!(userInput !== "" && validAddress)}
          onClick={() => {
            if (userInput !== "" && !searchLoading) {
              freeNodeLevel(userInput);
            }
          }}
        >
          {searchLoading ? (
            <Loading color={Colors.white} size={12} />
          ) : (
              i18n.t("confirm")
            )}
        </button>
      </div>
      <div id="sni_result">
        <span id="snir_title">{i18n.t("searchResult")}</span>
        <div id="snir_content">
          <div id="snirc_steps">
            <div id="snircs_step">
              <Snircs1 step={step}>
                <div className="snircs_icon">
                  {step > 0 ? (
                    <img src={checkImg} alt="" />
                  ) : (
                      <span className="pum-">1</span>
                    )}
                </div>
                <span className="snircs_title">{i18n.t("emptyLevel")}</span>
              </Snircs1>
              <SnircsDivider1 step={step}>
                <div></div>
              </SnircsDivider1>
              <Snircs2 step={step}>
                <div className="snircs_icon">
                  {step > 1 ? (
                    <img src={checkImg} alt="" />
                  ) : (
                      <span className="pum-">2</span>
                    )}
                </div>
                <span className="snircs_title">{i18n.t("emptyNode")}</span>
              </Snircs2>
              <SnircsDivider2 step={step}>
                <div></div>
              </SnircsDivider2>
              <Snircs3 step={step}>
                <div className="snircs_icon">
                  {step === 3 ? (
                    <img src={checkImg} alt="" />
                  ) : (
                      <span className="pum-">3</span>
                    )}
                </div>
                <span className="snircs_title">{i18n.t("done")}</span>
              </Snircs3>
            </div>
          </div>
          <div id="snirc_result">
            <div id="snircr_step1">
              <span className="label">{i18n.t("emptyLevel")}:</span>
              <span className="content">
                {step > 0 ? userEmptyNode.level : ""}
              </span>
            </div>
            {step > 1 ? (
              <div id="snircr_step2">
                <span className="label">{i18n.t("emptyNode")}:</span>
                <div className="nircrs2_username">
                  <span className="child_label">{i18n.t("name")}:</span>
                  <span className="child_value">
                    {userEmptyNode.username === "notSet"
                      ? i18n.t("notSet")
                      : userEmptyNode.username}
                  </span>
                </div>
                <div className="nircrs2_address">
                  <span className="child_label">{i18n.t("address")}:</span>
                  <span className="child_value">{`${userEmptyNode.address.slice(
                    0,
                    5
                  )}...${userEmptyNode.address.slice(-6)}`}</span>
                </div>
                <div className="nircrs2_level_empty">
                  <span className="child_label">{i18n.t("level")}:</span>
                  <span className="child_value">3</span>
                </div>
              </div>
            ) : null}
            {step === 3 ? (
              <div id="snircr_step3">
                <span className="label">{i18n.t("listPendingUsers")}:</span>
                <Select
                  listSelect={listUser}
                  action={setSelectPending}
                  defaultSelect={i18n.t("selectUserToMatch")}
                  disabled={listUser.length === 0}
                  currentSelect={selectPending}
                />
                <button
                  disabled={
                    !(
                      userEmptyNode.address !== "" && selectPending.value !== ""
                    )
                  }
                  onClick={() =>
                    !loading &&
                    mergeNode(userEmptyNode.address, selectPending.value)
                  }
                >
                  {loading ? (
                    <Loading color={Colors.white} size={20} />
                  ) : (
                      i18n.t("match")
                    )}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {showPop.show && showPop.result !== '' ? (
        <MergePop setShowPop={setShowPop} type={showPop.result} />
      ) : null}
    </SearchNodesWrap>
  );
};

const SearchNodesWrap = memo(styled.div`
  background-color: ${Colors.white};
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 15px;
  border-radius: 10px;
  max-width: calc(100% - 30px);
  #search_node_title {
    font-size: ${Texts.size.huge};
    line-height: ${Texts.size.huge};
    color: ${Colors.black};
    font-weight: 500;
    margin-bottom: 20px;
  }
  #search_node_quote {
    font-size: ${Texts.size.large};
    line-height: ${Texts.size.large};
    color: ${Colors.black};
    margin-bottom: 15px;
    text-align: center;
  }
  #sn_input {
    margin-bottom: 30px;
    width: 100%;
    #sni_textbox {
      width: 70%;
      input {
        flex: 1;
        padding: 10px;
        ${(props: any) =>
    props.userInput === ""
      ? css`
                border: solid 1px ${Colors.black};
              `
      : props.validAddress
        ? css`
                border: solid 1px ${Colors.black};
              `
        : css`
                border: solid 1px ${Colors.red};
              `};
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-right: none;
      }
    }
    button {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: ${Colors.orange};
      box-shadow: none;
      color: ${Colors.white};
      font-size: ${Texts.size.large};
      border: none;
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
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
  #sni_result {
    flex: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
    #snir_title {
      font-size: ${Texts.size.huge};
      line-height: ${Texts.size.huge};
      color: ${Colors.black};
      font-weight: 500;
      margin-bottom: 20px;
    }
    #snir_content {
      width: calc(100% - 40px);
      padding: 20px;
      align-items: center;
      justify-content: center;
      background-color: ${Colors.white4};
      flex-direction: column;
      #snirc_steps {
        margin-bottom: 10px;
        width: 100%;
        justify-content: center;
        align-items: center;
        #snircs_step {
          align-items: flex-start;
          margin-bottom: 30px;
          width: 100%;
          justify-content: space-between;
          div {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
              width: 20px;
              object-fit: contain;
            }
          }
          .snircs_icon {
            margin-bottom: 5px;
            width: 40px;
            height: 40px;
          }
          @media (max-width: 1199px) {
            width: 100%;
            justify-content: space-around;
          }
        }
        @media (max-width: 1199px) {
          width: 100%;
          align-items: center;
          justify-content: center;
        }
      }
      #snirc_result {
        width: calc(100% - 30px);
        min-height: 40px;
        background: ${Colors.white};
        border-radius: 5px;
        border: solid 1px ${Colors.green};
        padding: 15px;
        flex-direction: column;
        #snircr_step1 {
          margin-bottom: 15px;
        }
        #snircr_step2 {
          flex-direction: column;
          margin-bottom: 15px;
          .label {
            margin-bottom: 10px;
          }
          .nircrs2_username,
          .nircrs2_address,
          .nircrs2_level_empty {
            justify-content: space-between;
          }
          .nircrs2_username,
          .nircrs2_address {
            margin-bottom: 5px;
          }
        }
        #snircr_step3 {
          flex-direction: column;
          .label {
            margin-bottom: 10px;
          }
          button {
            margin-top: 20px;
            border-radius: 5px;
            background-color: ${Colors.orange};
            box-shadow: none;
            color: ${Colors.white};
            font-size: ${Texts.size.large};
            border: solid 1px ${Colors.orange};
            padding: 10px 40px;
            justify-content: center;
            display: flex;
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
        .label {
          font-size: ${Texts.size.normal};
          line-height: ${Texts.size.normal};
          color: ${Colors.black};
          flex: 0.5;
        }
        .content {
          font-size: ${Texts.size.normal};
          line-height: ${Texts.size.normal};
          color: ${Colors.black};
          flex: 0.45;
        }
        .child_label {
          font-size: ${Texts.size.normal};
          line-height: ${Texts.size.normal};
          color: ${Colors.black1};
          flex: 0.35;
          text-align: right;
        }
        .child_value {
          font-size: ${Texts.size.normal};
          line-height: ${Texts.size.normal};
          color: ${Colors.black};
          flex: 0.6;
        }
        .label {
          text-transform: uppercase;
        }
      }
    }
  }
`);

const Snircs1 = memo(styled.div`
  width:25%;
  .snircs_icon {
    border-radius: 50%;
    ${(props: any) =>
    props.step > 0
      ? css`
            background-color: ${Colors.orange};
            span {
              color: ${Colors.orange};
            }
          `
      : css`
            background-color: ${Colors.green};
            span {
              color: ${Colors.green3};
            }
          `}
  }
  .snircs_title {
    font-size: ${Texts.size.normal};
    line-height: ${Texts.size.larger};
    text-transform: uppercase;
    text-align: center;
    ${(props: any) =>
    props.step > 0
      ? css`
            color: ${Colors.orange};
          `
      : css`
            color: ${Colors.green3};
          `}
  }
`);
const Snircs2 = memo(styled.div`
  width:25%;
  .snircs_icon {
    border-radius: 50%;
    ${(props: any) =>
    props.step > 1
      ? css`
            background-color: ${Colors.orange};
            span {
              color: ${Colors.orange};
            }
          `
      : css`
            background-color: ${Colors.green};
            span {
              color: ${Colors.green3};
            }
          `};
  }
  .snircs_title {
    font-size: ${Texts.size.normal};
    line-height: ${Texts.size.larger};
    text-transform: uppercase;
    text-align: center;
    ${(props: any) =>
    props.step > 1
      ? css`
            color: ${Colors.orange};
          `
      : css`
            color: ${Colors.green3}; 
          `};
  }
`);
const Snircs3 = memo(styled.div`
  width:25%;
  .snircs_icon {
    border-radius: 50%;
    ${(props: any) =>
    props.step === 3
      ? css`
            background-color: ${Colors.orange};
            span {
              color: ${Colors.orange};
            }
          `
      : css`
            background-color: ${Colors.green};
            span {
              color: ${Colors.green3};
            }
          `}
  }
  .snircs_title {
    font-size: ${Texts.size.normal};
    line-height: ${Texts.size.larger};
    text-transform: uppercase;
    text-align: center;
    ${(props: any) =>
    props.step === 3
      ? css`
            color: ${Colors.orange};
          `
      : css`
            color: ${Colors.green3};
          `}
  }
`);
const SnircsDivider1 = memo(styled.div`
  height: 40px;
  width:10%;
  div {
    width: 100%;
    height: 5px;
    ${(props: any) => props.step > 1 ?
    css`background-color: ${Colors.orange};` :
    css`background-color: ${Colors.green3};`}
    margin: 0 2%;
    @media (max-width:399px){
      width:15px;
    }
  }
`);
const SnircsDivider2 = memo(styled.div`
  height: 40px;
  width:10%;
  div {
    width: 100%;
    height: 5px;
    ${(props: any) => props.step === 3 ?
    css`background-color: ${Colors.orange};` :
    css`background-color: ${Colors.green3};`
  }
    margin: 0 2%;
    @media (max-width:399px){
      width:15px;
    }
  }
`);
