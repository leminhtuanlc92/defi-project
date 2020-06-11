import React, { memo, useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../constants/Colors";
import Texts from "../../constants/Texts";
import i18n from "i18n-js";
import Copy from "copy-to-clipboard";
import { TronContract } from "../../contexts/tronWeb";
import Language from '../common/core/Language'
const avatImg = require("../../assets/images/avt.png");
const copyImg = require("../../assets/images/copy.png");
export default () => {
  const { address, member, userData } = useContext(TronContract);

  const [userInfo, setUserInfo] = useState({
    username: "Not set",
    level: 0,
  });
  const affiliate =
    userInfo.username !== "Not set"
      ? (window as any).location.origin + "/?username=" + userInfo.username
      : (window as any).location.origin + "/?ref=" + address;
  const [copied, setCopied] = useState(false);
  const writeToClipboard = async () => {
    setCopied(true);
    Copy(affiliate);
    let copying = setTimeout(() => setCopied(false), 3000);
    return () => {
      clearTimeout(copying);
    };
  };

  useEffect(() => {
    //TODO get user info
    const getUserData = async () => {
      const [user, level] = await Promise.all([
        member.getUser(address).call(),
        userData.getLevel(address).call(),
      ]);
      setUserInfo({
        username: user.userId === "" ? "Not set" : user.userId,
        level: Number(level),
      });
    };
    if (member && userData) {
      //TODO get UserData
      getUserData();
    }
  }, [userData, member]);
  return (
    <HeadContentWrap>
      <div id="affiliate-link">
        <span>{i18n.t("affiliateLink")}:</span>
        <div id="aff-link-box">
          <div id="aff_link_text">
            <span>{affiliate}</span>
          </div>
          <CopyButton
            onClick={() => !copied && writeToClipboard()}
            copied={copied}
          >
            <img src={copyImg} alt="" />
          </CopyButton>
        </div>
      </div>
      <div id="top_account_info">
        <div id="tai_lang">
          <Language />
        </div>
        <div id="tai_user">
          <div id="avt_lvl">
            <img src={avatImg} alt="" />
            <span>
              {i18n.t("level")}: {userInfo.level}
            </span>
          </div>
          <div id="username_address">
            <span>{userInfo.username}</span>
            <span>{`${address.slice(0, 5)}...${address.slice(-6)}`}</span>
            <span>{address}</span>
          </div>
        </div>

      </div>
    </HeadContentWrap>
  );
};

const HeadContentWrap = memo(styled.div`
    width:100%;
    justify-content:space-between;
    align-items:center;
    /* background-color:${Colors.green2}; */
    height: calc(2em*2);
    #affiliate-link{
        align-items:center;
        >span{
            font-size:${Texts.size.large};
            line-height: ${Texts.size.large};
            color: ${Colors.black1};
            margin-right:10px;
        }
        #aff-link-box{
          height:40px;
          align-items:center;
          #aff_link_text{
          overflow: hidden;
          max-width: 300px;
          height:40px;
          align-items:center;
          justify-content:center;
          box-shadow: 0 3px 4px 1px rgba(0, 0, 0, .1);
          background-color:${Colors.white};
          padding:0 20px;
          border-top-left-radius:3px;
          border-bottom-left-radius:3px;
          span{
              font-size:${Texts.size.large};
              line-height: ${Texts.size.large};
              color: ${Colors.black};
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
          }
        }
      }
    }
    #top_account_info{
      #tai_lang{
        @media (max-width:499px){
          display:none;
        }
      }
      #tai_user{
        margin-left:15px;
        #avt_lvl{
            flex-direction:column;
            align-items:center;
            margin-right:10px;
            img{
                width:25px;
                object-fit:contain;
                margin-bottom:5px;
            }
            span{
                font-size:${Texts.size.normal};
                line-height: ${Texts.size.normal};
                color: ${Colors.black}; 
            }
        }
        #username_address{
            flex-direction:column;
            justify-content:space-between;
            span{
                font-size:${Texts.size.large};
                line-height: ${Texts.size.large};
                color: ${Colors.black};
                &:nth-child(3){
                  display:none;
                }
                @media (max-width:767px){
                  &:nth-child(2){
                    display:none;
                  }
                  &:nth-child(3){
                    display:flex;
                  }
                }
            }
        }
      }
    }
    @media (max-width:991px){
      height:auto;
      margin-bottom:10px;
    }
    @media (max-width:767px){
      flex-direction:column;
      align-items: flex-start;
      #affiliate-link{
        margin-bottom:10px;
      }
    }
    @media (max-width:480px){
      align-items: center;
      #affiliate-link{
        flex-direction:column;
        align-items:center;
        justify-content:center;
        >span{
          margin-bottom:5px;
          margin-right:0;
        }
        #aff-link-box{
          width:100%;
          #aff_link_text{
            max-width:200px;
          }
        }
      }
      #top_account_info{
        width:100%;
        #username_address{
          width:70%;
          span{
            &:nth-child(3){
              overflow-x: scroll;
              margin-top: 10px;
            }
          }
        }
      }
    }
`);

const CopyButton = memo(styled.div`
  align-items: center;
  justify-content: center;
  ${(props: any) =>
    props.copied
      ? css`
          background-color: ${Colors.green};
        `
      : css`
          background-color: ${Colors.green1};
        `}
  height:40px;
  width: 40px;
  cursor: pointer;
  img {
    width: 20px;
    height: 22px;
  }
`);
