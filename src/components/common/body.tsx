import React, { memo, Fragment, useContext, useState } from "react";
import styled, { css } from "styled-components/macro";
import { ToastContainer } from "react-toastify";
import { SiteContext } from "../../contexts/siteContext";
import Aside from "./aside";
import MainRoutes from "../../router";
import Colors from "../../constants/Colors";
import ReactTooltip from "react-tooltip";
import HeadContent from "../MainBody/headContent";
import TronWrap from "../../contexts/tronWeb";
const closeImg = require("../../assets/images/white-back.png");
const openImg = require("../../assets/images/white-next.png");
export default () => {
  const {
    siteState: { aside },
    changeLocale,
    toggleAside,
  } = useContext(SiteContext);
  return (
    <WrapBody>
      <TronWrap>
        <Fragment>
          <Aside />
          <MainContentWrap aside={aside}>
            <ToggleButton onClick={() => toggleAside(aside)}>
              <div>
                {aside ? (
                  <img src={closeImg} style={{ objectFit: "contain" }} alt="" />
                ) : (
                  <img src={openImg} style={{ objectFit: "contain" }} alt="" />
                )}
              </div>
            </ToggleButton>
            <MainBody aside={aside}>
              <div id="wrap-main">
                <div id="scroll_section">
                  <HeadContent />
                  <div id="wrap_main_content">
                    <MainRoutes />
                  </div>
                </div>
              </div>
            </MainBody>
          </MainContentWrap>
        </Fragment>
      </TronWrap>
      <ToastContainer />
      <ReactTooltip />
    </WrapBody>
  );
};
const WrapBody = memo(styled.div`
  background-size: cover;
  background-position: center;
  background-color: ${Colors.white};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`);
const ToggleButton = memo(styled.div`
  border-radius: 50%;
  background-color: ${Colors.mainbodyBg};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10%;
  left: -20px;
  z-index: 2;
  width: 40px;
  height: 40px;
  cursor: pointer;
  div {
    background-color: ${Colors.green1};
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`);
const MainContentWrap = memo(styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${Colors.green1};
  ${(props: any) =>
    props.aside
      ? css`
          width: 80%;
        `
      : css`
          width: calc(100% - 70px);
        `};
  height: 100%;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

  .hash {
    position: fixed;
    top: 1em;
    left: 1em;
    width: calc(10% - 2em);
    padding: 20px;
    z-index: 9;
    display: flex;
    align-items: center;
    animation: notifyBalances 3s;
    animation-fill-mode: forwards;
    border-radius: 5px;
    img {
      max-height: 20px;
    }
    &.minus {
      background: #d02a00;
    }
    &.add {
      background: #41ad41;
    }
    @keyframes notifyBalances {
      0% {
        opacity: 0;
        transform: scale(0.1);
      }
      5% {
        opacity: 1;
        transform: scale(1);
      }
      75% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0.1);
      }
    }
  }
`);

const MainBody = memo(styled.div`
    width: calc(100% - 60px);
    padding: 0 20px;
    height:calc(100% - 40px);
    background-color:${Colors.mainbodyBg};
    border-top-left-radius:30px;
    border-top-right-radius:30px;
    transition: all 0.3s cubic-bezier(0.215,0.61,0.355,1);
    position: relative;
    align-items:center;
    justify-content:center;
    /* ${(props: any) =>
      props.aside !== 3
        ? css`
            padding: 0 16% 0 12%;
          `
        : css`
            padding: 0 16% 0 0;
          `} */
    #wrap-main{
        width:calc(100% - 40px);
        height:calc(100% - 40px);
        justify-content:flex-start;
        flex-direction:column;
        overflow:scroll;
        #scroll_section{
            width:100%;
            flex-direction:column;
            min-height:100%;
        }
    }
    #wrap_main_content{
        height: calc(100% - (1em*2));
        width:100%;
        overflow:hidden;
        flex:1;
    }
    @media (min-width:992px) and (max-width:1199px){
    }
`);
