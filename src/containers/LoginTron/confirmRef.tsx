import React, { memo } from 'react'
import styled from 'styled-components/macro'
import Colors from '../../constants/Colors'
import Texts from '../../constants/Texts'
import i18n from 'i18n-js'
const confirmImg = require('../../assets/images/confirm-ref.png')
export default () => {
    return (
        <ConfirmRefWrap>
            <div id="left-part">
                <img src={confirmImg} style={{ objectFit: 'contain' }} />
            </div>
            <div id="right-part">
                <div id="inner-right">
                    <h4 style={{ fontSize: Texts.size.extra, color: Colors.green1, textTransform: 'uppercase', marginBottom: '40px' }}>
                        {i18n.t('confirmrefInfo')}
                    </h4>
                    <div id="form-confirm">
                        <div id="inner-form">
                            <div id="user-wrap">
                                <span style={{ color: Colors.black1, fontSize: Texts.size.large }}>{i18n.t('username')}:</span>
                                <span style={{ color: Colors.black, fontSize: Texts.size.large }}>Dungmama</span>
                            </div>
                            <div id="addres-wrap">
                                <span style={{ color: Colors.black1, fontSize: Texts.size.large }}>{i18n.t('address')}:</span>
                                <span style={{ color: Colors.black, fontSize: Texts.size.large }}>0x5ac6hd3kuf9uo10ce9vkndln…ce5ac6hd3kuf9uo10ce9</span>
                            </div>
                            <button onClick={() => { }}>{i18n.t('confirm')}</button>
                        </div>

                    </div>
                </div>
            </div>
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
                }
            }
        }
       
    }
`)