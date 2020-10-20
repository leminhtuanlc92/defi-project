import React, { memo, useContext } from 'react'
import styled, { css } from 'styled-components/macro'
import Colors from '../../constants/Colors'
import Texts from '../../constants/Texts'
import i18n from 'i18n-js'
import Language from '../../components/common/core/Language'
import { SiteContext } from '../../contexts/siteContext'
const errorImg = require('../../assets/images/not-login.svg')
const tronImg = require('../../assets/images/tronlink.png')
const tronScan = require('../../assets/images/tronscan.png')
const defiImg = require('../../assets/images/icon-defi.png')
export default () => {
    const { siteState: { horizontalView } } = useContext(SiteContext)
    return (
        <LoginNotifyWrapper horizontalView={horizontalView}>
            <div id="login_notify_head">
                <img id="lnh_logo" src={defiImg} alt="" />
                <div id="login_notify_lang">
                    <Language />
                </div>
            </div>
            <div id="inner-content">
                <div id="ic_wrap">
                    <div>
                        <img src={errorImg} style={{ height: '40vh' }} alt="" />
                    </div>
                    <div id="content">
                        <span className="content_title">Oops</span>
                        <span style={{ color: Colors.black, fontSize: Texts.size.large }}>{i18n.t('tronLoginErorquote1')}</span>
                        <span style={{ color: Colors.black, fontSize: Texts.size.large }}>{i18n.t('tronLoginErorquote2')}</span>
                        <span style={{ color: Colors.black, fontSize: Texts.size.large }}>{i18n.t('tronLoginErorquote3')}</span>
                        <div id="setup_button">
                            <a className="pc_link" target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec">
                                <div style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                    <span style={{ fontSize: Texts.size.larger, color: Colors.green1 }}>TRX</span>
                                    <span style={{ color: Colors.black, fontSize: Texts.size.large }}>{i18n.t('installTronLink')}</span>
                                </div>
                                <img src={tronImg} style={{ objectFit: "contain" }} alt="" />
                            </a>
                            <div className="mobile_link">
                                <a className="" href="https://www.tronwallet.me/">
                                    <img src={tronImg} alt="" />
                                    <span>Tron Wallet</span>
                                </a>
                                <a className="" href="https://www.tronlink.org/">
                                    <img src={tronScan} alt="" />
                                    <span>Tron Link</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </LoginNotifyWrapper >
    )
}

const LoginNotifyWrapper = memo(styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color:${Colors.mainbodyBg};
    height:100%;
    flex:1;
    background-color:${Colors.white};
    div{
        display:flex;
    }
    #login_notify_head{
        width: calc(100% - 60px);
        justify-content:space-between;
        align-items:center;
        padding:10px 30px;
        #lnh_logo{
            width:40px;
            object-fit:contain;
        }
        #login_notify_lang{
            flex-direction:flex-end;
            align-self:flex-end;
        }
    }
    #inner-content{
        padding:40px;
        display:flex;
        justify-content:space-around;
        align-items:center;
        flex:1;
        width:100%;
        #ic_wrap{
            padding:20px 30px;
            background-color:${Colors.mainbodyBg};
            >div{
                flex:0.5;
                padding:0 30px;
                &:nth-child(1){
                    align-items: center;
                    justify-content: center;
                }
                @media (max-width:767px){
                    padding:0;
                    &:first-child{
                        display:none;
                    }
                }
            }
            #content{
                flex-direction:column;
                align-items:flex-start;
                .content_title{
                    color: ${Colors.orange};
                    font-size: 45px;
                    font-weight: bold;
                    line-height: 45px;
                    margin-bottom: 30px;
                    @media (max-width:767px){
                        ${(props: any) => props.horizontalView && css`margin:0;`}
                    }
                }
                span{
                    margin-bottom:10px;
                    @media (max-width:480px){
                        &:first-child{
                            text-align:center;
                        }
                    }
                }
                @media (max-width:767px){
                    flex:1;
                    align-items:center;
                    justify-content:center;
                    ${(props: any) => props.horizontalView && css`
                        display:block;
                        text-align:center;
                        span{
                            display:inherit;
                        }
                    `}
                }
            }
            #setup_button{
                margin-top:20px;
                border: solid 1px ${Colors.green1};
                border-radius:5px;
                box-shadow:0px 3px 6px 0px rgba(0,0,0,0.16);
                justify-content:center;
                a.pc_link{
                    display:flex;
                    flex:1;
                    padding:20px 30px;
                    border-radius:5px;
                    &:hover{
                        background-color:#f5f5f5;
                    }
                    img{
                        width:70px;
                        margin-left:10px;
                    }
                    @media (max-width:767px){
                        display:none;
                    }
                }
                .mobile_link{
                    justify-content:space-around;
                    align-items:center;
                    width: 300px;
                    padding: 20px 0;
                    @media (min-width:768px){
                        display:none;
                    }
                    img{
                        width:60px;
                        object-fit:contain;
                    }
                    a{
                        display:flex;
                        flex-direction:column;
                        align-items:center;
                        span{
                            color:${Colors.black};
                            margin-top:10px;
                        }
                    }
                }
                @media (max-width:767px){
                    ${(props: any) => props.horizontalView && css`margin-bottom:20px;`}
                }
            }
            @media (max-width:767px){
                ${(props: any) => props.horizontalView && css`padding:0;`}
            }
        }
        @media (max-width:767px){
            padding:0;
            ${(props: any) => props.horizontalView && css`overflow-y:scroll;overflow-x:hidden;display:block;`}
        }
    }
    @media (max-width:991px){
        width:100vw;
        height:100vh;
    }

`)