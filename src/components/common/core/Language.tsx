import React, { useState, memo, useContext } from "react";
import styled, { css } from "styled-components";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import ListLang from '../../../constants/ListLang'
import { SiteContext } from '../../../contexts/siteContext'
import i18n from 'i18n-js'
const arrowImg = require('../../../assets/images/down-arrow.png')
const flags = {
    en: require('../../../assets/images/en.svg'),
    vi: require('../../../assets/images/vn.svg'),
    zh: require('../../../assets/images/zh.svg')
}
interface MultiLangProps {
    width?: number;
    colorInner?: string
}
export default ({ width = 10, colorInner = Colors.black }) => {
    const [show, setShow] = useState(false)
    const { siteState, changeLocale } = useContext(SiteContext)
    return (
        <MultiLanguageWrap width={width} colorInner={colorInner}>
            <div id="mlc">
                <div id="mlc_inner" onClick={() => setShow(!show)}>
                    <img className="mlc_flag" src={flags[siteState.locale]} alt="" />
                    <span>{siteState.locale}</span>
                    <img className="mlc_arrow" src={arrowImg} alt="" />
                </div>
            </div>
            {show ?
                <div id="mlc_list">
                    {ListLang.map((item, index) => {
                        return (
                            <MLCItem onClick={() => {
                                changeLocale(item)
                                setShow(false)
                            }
                            } key={index} active={siteState.locale === item}>
                                <img src={flags[item]} alt="" />
                                <span>{item}</span>
                            </MLCItem>
                        )
                    })}
                </div>
                :
                null
            }
        </MultiLanguageWrap>
    )
}
const MultiLanguageWrap = memo(styled.div`
    flex:1;
    align-items:flex-end;
    position:relative;
    min-width: ${(props: any) => props.width}vw;
    flex-direction:column;
    #mlc{
        flex:1;
        justify-content:flex-end;
        cursor:pointer;
        #mlc_inner{
            align-items:center;
            padding:10px 0;
            span{
                font-size:${Texts.size.larger};
                line-height: ${Texts.size.larger};
                color: ${(props: any) => props.colorInner};
                text-transform:uppercase;
                padding:0 10px;
            }
            .mlc_flag{
                width:25px;
            }
            .mlc_arrow{
                width:15px;
                object-fit:contain;
            }
        }
    }
    #mlc_list{
        position:absolute;
        top:100%;
        width:100%;
        min-width:100px;
        right:0;
        left:0;
        z-index:3;
        background-color:${Colors.white};
        flex-direction:column;
        box-shadow: 0 3px 6px 1px rgba(100, 161, 94, 0.2);
        @media (max-width:499px){
            left:-10px;
        }
    }
`)

const MLCItem = memo(styled.div`
    padding:8px 15px;
    align-items:center;
    cursor:pointer;
    ${(props: any) => props.active ?
        css`background-color: ${Colors.green1};` :
        css`background-color: ${Colors.white};`
    }
    img{
        width:25px;
        margin-right:10px;
    }
    span{
        font-size:${Texts.size.large};
        line-height: ${Texts.size.large};
        text-transform:uppercase;
        ${(props: any) => props.active ?
        css`color: ${Colors.white};` :
        css`color: ${Colors.black};`
    }
    }
    &:hover{
        background-color: ${Colors.green4};
        span{
            color: ${Colors.white}
        }
    }
`)