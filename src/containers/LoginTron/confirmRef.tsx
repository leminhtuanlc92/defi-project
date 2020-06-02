import React, { memo, Fragment, useState } from 'react'
import styled from 'styled-components/macro'
import Colors from '../../constants/Colors'
import Texts from '../../constants/Texts'
import i18n from 'i18n-js'
const confirmImg = require('../../assets/images/confirm-ref.svg')
const confirmImg1 = require('../../assets/images/confirm.svg')
const closeImg = require('../../assets/images/close.png')
export default () => {
    const [showPop, setShowPop] = useState(false)
    return (
        <ConfirmRefWrap>
            <Fragment>
                <div id="left-part">
                    <img src={confirmImg} style={{ objectFit: 'contain' }} alt="" />
                </div>
                <div id="right-part">
                    <div id="inner-right">
                        <h4 style={{ fontSize: Texts.size.extra, color: Colors.green1, textTransform: 'uppercase', marginBottom: '40px' }}>
                            {i18n.t('confirmrefInfo')}
                        </h4>
                        <div id="form-confirm">
                            <div id="inner-form">
                                <div id="user-wrap">
                                    <span style={{ color: Colors.black1, fontSize: Texts.size.large, lineHeight: Texts.size.large, marginBottom: '10px' }}>{i18n.t('username')}:</span>
                                    <span style={{ color: Colors.black, fontSize: Texts.size.large, lineHeight: Texts.size.large }}>Dungmama</span>
                                </div>
                                <div id="addres-wrap">
                                    <span style={{ color: Colors.black1, fontSize: Texts.size.large, lineHeight: Texts.size.large, marginBottom: '10px' }}>{i18n.t('address')}:</span>
                                    <span style={{ color: Colors.black, fontSize: Texts.size.large, lineHeight: Texts.size.large }}>0x5ac6hd3kuf9uo10ce9vkndln…ce5ac6hd3kuf9uo10ce9</span>
                                </div>
                                <button onClick={() => setShowPop(true)}>{i18n.t('confirm')}</button>
                            </div>

                        </div>
                    </div>
                </div>
                {showPop ?
                    <div id="confirm-pop">
                        <div id="pop-content">
                            <img src={confirmImg1} alt="" />
                            <span id="pop-content-confirm-usdt-quote">
                                {i18n.t('popConfirmUsdtquote')}
                            </span>
                            <div id="pop-confirm-usdt-buttons">
                                <button id="refuse-button" onClick={() => { }}>{i18n.t('no')}</button>
                                <button id="confirm-button" onClick={() => { }}>{i18n.t('yes')}</button>
                            </div>
                            <div id="close-button" onClick={() => setShowPop(!showPop)}>
                                <img src={closeImg} alt="" />
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </Fragment>
        </ConfirmRefWrap >
    )
}

const ConfirmRefWrap = memo(styled.div`
    width:100%;
    height:100%;
    flex:1;
    align-items:center;
    #left-part{
        flex:0.4;
        height:100%;
        background-color:#B5CE9F;
        align-items:center;
        justify-content:center;
    }
    #right-part{
        flex:0.6;
        height:100%;
        align-items:center;
        justify-content:center;
        #inner-right{
            max-width:680px;
            min-width:300px;
            width:60%;
            flex-direction:column;
            align-items:center;
            margin-bottom:40px;
            #form-confirm{
                border: solid 1px ${Colors.green1};
                border-radius:5px;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                width:100%;
                #inner-form{
                    flex:1;
                    padding:30px;
                    flex-direction:column;
                    align-items:center;
                    >div{
                        width:100%;
                        margin-bottom:20px;
                        flex-direction:column;
                        >span{
                            line-height:${Texts.size.large};
                        }
                    }
                    #user-wrap{
                        
                    }
                    #addres-wrap{

                    }
                }
                button{
                    width:80%;
                    margin-top:10px;
                    padding:20px 0;
                    border-radius:5px;
                    background-color:${Colors.orange};
                    box-shadow:none;
                    color:${Colors.white};
                    font-size: ${Texts.size.large};
                    text-transform:uppercase;
                    border: none;
                    &:hover{
                        background-color:${Colors.orange1};
                        box-shadow: 0 3px 6px 1px rgba(255, 159,91,.2)
                    }
                    &:disabled{
                        background-color:${Colors.orange2};
                        color: ${Colors.orange3};
                        box-shadow:none;
                        cursor: not-allowed;
                    }
                }
            }
        }
       
    }
    #confirm-pop{
        position:absolute;
        z-index:2;
        top:0;
        left:0;
        background-color:rgba(34,34,34,.8);
        align-items:center;
        justify-content:center;
        width:100%;
        height:100%;
        #pop-content{
            min-width:60%;
            min-height:50%;
            background:${Colors.white};
            border-radius:15px;
            flex-direction:column;
            padding:20px 40px;
            align-items:center;
            justify-content:center;
            position:relative;
            img{
                max-width:400px;
                margin-bottom:40px;
            }
            #pop-content-confirm-usdt-quote{
                color: ${Colors.black1};
                font-size: ${Texts.size.large};
                line-height: ${Texts.size.large};
                margin-bottom:40px
            }
            #close-button{
                position:absolute;
                top:20px;
                right:20px;
                cursor: pointer;
            }
            #pop-confirm-usdt-buttons{
                align-items:center;
                justify-content:center;
                width:80%;
                button{
                    width:40%;
                    margin:5px 10px;
                    padding:20px 0;
                    border-radius:5px;
                    box-shadow:none;
                    color:${Colors.white};
                    font-size: ${Texts.size.large};
                    text-transform:uppercase;
                    border: none;
                    &#confirm-button{
                        background-color:${Colors.orange};
                        &:hover{
                            background-color:${Colors.orange1};
                            box-shadow: 0 3px 6px 1px rgba(255, 159, 91, .2)
                        }
                        &:disabled{
                            background-color:${Colors.orange2};
                            color: ${Colors.orange3};
                            box-shadow:none;
                            cursor: not-allowed;
                        }
                    }
                    &#refuse-button{
                        background-color:${Colors.black6};;
                        &:hover{
                            background-color:${Colors.black3};
                            box-shadow: 0 3px 6px 1px rgba(0, 0, 0, .16)
                        }
                        &:disabled{
                            background-color:${Colors.black4};
                            color: ${Colors.black7};
                            box-shadow:none;
                            cursor: not-allowed;
                        }
                    }
                }
            }
        }
    }
`)