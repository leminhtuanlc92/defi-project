import React, { memo } from 'react'
import styled from 'styled-components/macro'
import Colors from '../../constants/Colors'
import Texts from '../../constants/Texts'
import i18n from 'i18n-js'
const errorImg = require('../../assets/images/noLoginTron.png')
const tronImg = require('../../assets/images/Tron-icon.png')

export default () => {
    return (
        <LoginNotifyWrapper>
            <div id="inner-content">
                <div>
                    <img src={errorImg} style={{ maxWidth: '400px', objectFit: "contain" }} alt=""/>
                </div>
                <div id="content">
                    <h3 style={{ color: Colors.orange, fontSize: '45px', fontWeight: 'bold', lineHeight: "45px", marginBottom: '30px' }}>Oops</h3>
                    <span style={{ color: Colors.black, fontSize: Texts.size.large }}>{i18n.t('tronLoginErorquote1')}</span>
                    <span style={{ color: Colors.black, fontSize: Texts.size.large }}>{i18n.t('tronLoginErorquote2')}</span>
                    <span style={{ color: Colors.black, fontSize: Texts.size.large }}>{i18n.t('tronLoginErorquote3')}</span>
                    <div id="setup-button">
                        <div style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ fontSize: Texts.size.larger, color: Colors.green1 }}>TRX</span>
                            <span style={{ color: Colors.black, fontSize: Texts.size.large }}>{i18n.t('installTronLink')}</span>
                        </div>
                        <img src={tronImg} style={{ objectFit: "contain" }} alt=""/>
                    </div>
                </div>
            </div>
        </LoginNotifyWrapper >
    )
}

const LoginNotifyWrapper = memo(styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:${Colors.mainbodyBg};
    /* width: calc(100vw*0.8);
    height: calc(100vh*0.8); */
    #inner-content{
        padding:40px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        flex:1;
        >div{
            flex:0.5;
            padding:0 30px;
        }
        #content{
            flex-direction:column;
            align-items:flex-start;
            span{
                margin-bottom:10px;
            }
        }
        #setup-button{
            margin-top:20px;
            cursor:pointer;
            padding:20px 30px;
            border: solid 1px ${Colors.green1};
            border-radius:5px;
            box-shadow:0px 3px 6px 0px rgba(0,0,0,0.16);
        }
    }
    @media (max-width:991px){
        width:100vw;
        height:100vh;
    }
`)