import React, { memo, Fragment, useState } from 'react'
import styled from 'styled-components/macro'
import Colors from '../../constants/Colors'
import Texts from '../../constants/Texts'
import i18n from 'i18n-js'
const avatImg = require('../../assets/images/avt.png')
export default () => {
    const [userInfo, setUserInfo] = useState({
        username: 'dunglovely',
        address: '0x667715028667715028667715028',
        level: 0,
        avatar: ''
    })
    return (
        <HeadContentWrap>
            <div id="affilate-link">

            </div>
            <div id="top-account-info">
                <div id="avt-lvl">
                    <img src={avatImg} alt="" />
                    <span>{i18n.t('level')}: {userInfo.level}</span>
                </div>
                <div id="username-address">

                </div>
            </div>
        </HeadContentWrap>
    )
}

const HeadContentWrap = memo(styled.div`
    width:100%;
    justify-content:space-between;
    align-items:center;
    background-color:red;
`)