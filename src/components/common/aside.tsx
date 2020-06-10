import React, { memo, useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { SiteContext } from "../../contexts/siteContext";
import Colors from "../../constants/Colors";
import Texts from "../../constants/Texts";
import { Link, useLocation } from "react-router-dom";
import i18n from "i18n-js";
const logoutImg = require("../../assets/images/ic-logout.svg");
const logoImg = require('../../assets/images/logo-defi-white.svg')
const iconLogo = require('../../assets/images/icon-defi-white.svg')
const toggleMenuImg = require('../../assets/images/open-menu.svg')
export default () => {
  let mount = true
  let currentPath = useLocation();
  const { siteState, toggleAside } = useContext(SiteContext);
  const [showDropMenu, setShowDropMenu] = useState(false)
  const listmenu = [
    {
      name: "dashboard",
      url: "/",
      img: require("../../assets/images/ic-dashboard.svg"),
      imgActive: require("../../assets/images/ic-dashboard-active.svg"),
    },
    {
      name: "sunNetwork",
      url: "/sun-network",
      img: require("../../assets/images/ic-network.svg"),
      imgActive: require("../../assets/images/ic-network-active.svg"),
    },
    {
      name: "matrixNetwork",
      url: "/matrix-network",
      img: require("../../assets/images/ic-network.svg"),
      imgActive: require("../../assets/images/ic-network-active.svg"),
    },
    {
      name: "partners",
      url: "/partners",
      img: require("../../assets/images/ic-partner.svg"),
      imgActive: require("../../assets/images/ic-partner-active.svg"),
    },
    {
      name: "transactionHistory",
      url: "/transaction-history",
      img: require("../../assets/images/ic-ds-giaodich.svg"),
      imgActive: require("../../assets/images/ic-ds-giaodich-active.svg"),
    },
    {
      name: "buyDfc",
      url: "/buy-dfc",
      img: require("../../assets/images/ic-mua-dfc.svg"),
      imgActive: require("../../assets/images/ic-mua-dfc-active.svg"),
    },
    {
      name: "usageInstruction",
      url: "/instructions",
      img: require("../../assets/images/ic-logout.svg"),
      imgActive: require("../../assets/images/ic-logout-active.svg"),
    },
  ];
  let check = (window as any).innerHeight
  useEffect(() => {
    
  }, [])
  console.log('siteState.aside', check)
  return (
    <AsideWrap aside={siteState.aside}>
      <Logo aside={siteState.aside}>
        {siteState.aside ? <img src={logoImg} alt="" /> : <img src={iconLogo} alt="" />}
      </Logo>
      <ToggleMenu onClick={() => setShowDropMenu(!showDropMenu)}>
        <img src={toggleMenuImg} alt="" />
      </ToggleMenu>
      <MainMenu showDropMenu={showDropMenu}>
        <div id="mainmenu-wrapper">
          {listmenu.map((item, index) => {
            return (
              <div style={{ alignItems: "center", width: "100%" }} key={index}>
                <Link
                  to={item.url}
                  key={index}
                  // data-tip-disable={siteState.aside}
                  data-tip={`${i18n.t(`${item.name}`)}`}
                  data-delay-show={500}
                  style={{ width: "100%" }}
                >
                  <MenuItemWrapper
                    aside={siteState.aside}
                    mobile={(window as any).innerHeight < 992}
                    active={
                      item.url === currentPath.pathname ||
                      (currentPath.pathname.includes(item.url) &&
                        item.url !== "/")
                    }
                  >
                    <img src={
                      item.url === currentPath.pathname ||
                        (currentPath.pathname.includes(item.url) &&
                          item.url !== "/")
                        ? item.imgActive
                        : item.img
                    }
                      style={{
                        marginRight: siteState.aside ? "20px" : 0,
                        objectFit: "contain",
                        width: "20px",
                      }}
                      alt=""
                    />
                    {siteState.aside ? <span>{i18n.t(item.name)}</span> : null}
                  </MenuItemWrapper>
                </Link>
              </div>
            );
          })}
        </div>
      </MainMenu>
      {/* <Logout>
        <div
          onClick={() => { }}
          style={{ width: "100%" }}
          // data-tip-disable={siteState.aside}
          data-tip={`${i18n.t("logout")}`}
          data-delay-show={500}
        >
          <InnerLogout
            style={{
              flex: 1,
              display: "flex",
              padding: "20px",
              alignItems: "center",
            }}
            aside={siteState.aside}
          >
            <img 
              src={logoutImg}
              style={{
                marginRight: siteState.aside ? "20px" : 0,
                width:'20px'
              }}
              alt=""
            />
            {siteState.aside ? <span>{i18n.t("logout")}</span> : null}
          </InnerLogout>
        </div>
      </Logout> */}
    </AsideWrap>
  );
};
const AsideWrap = memo(styled.div`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${Colors.green1};
    padding: 20px 0;
    height: calc(100% - 40px);
    ${(props: any) => props.aside ? css`width: 20%;` : css`width: 70px;`}
    @media (max-width:991px){
      flex-direction:row;
      height:40px;
      width:100%;
      padding:0;
      position:relative;
    }
`);
const ToggleMenu = memo(styled.div`
  padding:10px;
  align-items:center;
  justify-content:center;
  img{
    max-width:30px;
  }
  @media (min-width:992px){
    display:none;
  }
`)
const Logo = memo(styled.div`
  display: flex;
  justify-content: center;
  img{
    ${(props: any) => props.aside ?
    css`max-width:120px;`
    :
    css`max-width:35px;`
  }
  }
  @media (max-width:991px){
    flex:1;
  }
`);

const MainMenu = memo(styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex-grow: 2;
  margin-top: 40px;
  #mainmenu-wrapper {
    flex-direction: column;
  }
  @media (max-width:991px){
    position:absolute;
    top:100%;
    left:0;
    right:0;
    width:100%;
    margin:0;
    z-index:2;
    ${(props: any) => props.showDropMenu ?
    css`display:flex`
    :
    css`display:none`
  }
  }
`);

const MenuItemWrapper = memo(styled.div`
  font-size: ${Texts.size.large};
  flex: 1;
  display: flex;
  padding: 20px;
  align-items:center;
  ${(props: any) =>
    props.aside
      ? css`
          justify-content: flex-start;
        `
      : css`
          justify-content: center;
        `};
  ${(props: any) =>
    props.active
      ? css`
          background-color: ${Colors.white};
          color: ${Colors.black};
        `
      : css`
          background-color: none;
          color: ${Colors.white};
        `};
  &:hover {
    background-color: ${Colors.white};
    span {
      color: ${Colors.black};
    }
  }
  @media (max-width:991px){
    background-color:${Colors.white};
    color: ${Colors.black};
    img{
      display:none;
    }
  }
`);
const Logout = memo(styled.div`
  display: flex;
  /* flex:0.1; */
  > div {
    cursor: pointer;
  }
`);
const InnerLogout = memo(styled.div`
  ${(props: any) =>
    props.aside
      ? css`
          justify-content: flex-start;
        `
      : css`
          justify-content: center;
        `}
  &:hover {
    background-color: ${Colors.white};
    span {
      color: ${Colors.black};
    }
  }
`);
