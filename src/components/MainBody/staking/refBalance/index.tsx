import React, { memo, useState } from 'react'
import styled from 'styled-components'
import i18n from 'i18n-js'
import RefItem from 'components/MainBody/staking/refBalance/refItem'
import Colors from 'constants/Colors'
import Texts from 'constants/Texts'
const imgs = require('assets/images/coins-1.svg')
export default () => {
    //TODO get value, total
    const [refData, setRefData] = useState([
        { title: 'F1', value: 0 },
        { title: 'F2', value: 0 },
        { title: 'F3', value: 0 },
        { title: 'F4', value: 0 },
        { title: 'F5', value: 0 },
        { title: 'F6', value: 0 },
        { title: 'F7', value: 0 },
        { title: 'F8', value: 0 },
    ])
    const [total, setTotal] = useState(5000)
    return (
        <RefBalanceWrap>
            <span className="sm_title">{i18n.t("refBalance")}:</span>
            <div className="rb_total">
                <div className="rbt">
                    <div id="inner_content_info">
                        <div className="ici_icon">
                            <img src={imgs} alt="" />
                        </div>
                        <div id="inner_info_wrap">
                            <span id="info_content_title">{i18n.t('totalBalance')}</span>
                            <span id="info_content_value">
                                {i18n.toNumber(total, { precision: 2 })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rb_inner">
                {refData.map((item, index) => {
                    return (
                        <RefItem
                            key={index}
                            title={item.title}
                            value={item.value}
                        />
                    );
                })}
                <div className="clear" />
            </div>
        </RefBalanceWrap>
    )
}

const RefBalanceWrap = memo(styled.div`
    display:block;
    .rb_total{
        .rbt{
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            border-radius: 10px;
            background-color: ${Colors.orange5};
            border:solid 1px #EF89404D;
            position: relative;
            width: 30%;
            margin:0 auto 1rem;
            @media (max-width:767px){
                width:100%;
            }
            #inner_content_info {
                padding:1rem;
                width: calc(100% - 2rem);
                .ici_icon{
                    width:46px;
                    height:46px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    background-color:${Colors.white};
                    border:solid 1px ${Colors.orange6};
                    border-radius:5px;
                    img{
                        width:30px;
                    }
                }
                #inner_info_wrap {
                    flex-direction: column;
                    padding: 0 0 0 1rem;
                    #info_content_title {
                        font-size: ${Texts.size.large};
                        line-height: ${Texts.size.huge};
                        color: ${Colors.black1};
                        text-align: left;
                        max-width: 100%;
                        overflow: hidden;
                        white-space:nowrap;
                        text-overflow:ellipsis;
                    }
                    #info_content_value {
                        font-size: ${Texts.size.gigantic};
                        line-height: ${Texts.size.gigantic};
                        color: #ed8c47;
                        text-align: left;
                        font-weight: 700;
                        max-width: 100%;
                        overflow: hidden;
                        white-space:nowrap;
                        text-overflow:ellipsis;
                        @media (max-width: 480px) {
                            line-height: inherit;
                        }
                    }
                }
            }
        }
    }
    .rb_inner{
        display: block;
        margin-bottom: 2rem;
        >div {
        &:not(:last-child) {
          width: calc(22% - 2px);
          display: block;
          float: left;
          @media (min-width: 1600px) {
            &:nth-child(4n + 1) {
              margin: 0 2% 2rem 0;
            }
            &:nth-child(4n + 2) {
              margin: 0 2% 2rem;
            }
            &:nth-child(4n + 3) {
              margin: 0 2% 2rem;
            }
            &:nth-child(4n + 4) {
              margin: 0 0 2rem 2%;
            }
          }
          @media (min-width: 1200px) and (max-width: 1599px) {
            width: calc(30% - 2px);
            &:nth-child(3n + 1) {margin: 0 2.5% 2rem 0;}
            &:nth-child(3n + 2) {margin: 0 2.5% 2rem;}
            &:nth-child(3n + 3) {margin: 0 0 2rem 2.5%;}
          }
          @media (min-width: 992px) and (max-width: 1199px) {
            width: calc(48% - 2px);
            &:nth-child(2n + 1) {margin: 0 2% 2rem 0;}
            &:nth-child(2n + 2) {margin: 0 0 2rem 2%;}
          }
          @media (min-width: 768px) and (max-width: 991px) {
            width: calc(30% - 2px);
            &:nth-child(3n + 1) {margin: 0 2.5% 2rem 0;}
            &:nth-child(3n + 2) {margin: 0 2.5% 2rem;}
            &:nth-child(3n + 3) {margin: 0 0 2rem 2.5%;}
          }
          @media (min-width: 600px) and (max-width: 767px) {
            width: calc(48% - 2px);
            &:nth-child(2n + 1) {margin: 0 2% 2rem 0;}
            &:nth-child(2n + 2) {margin: 0 0 2rem 2%;}
          }
          @media (max-width: 599px) {
            width: calc(100% - 2px);
            margin-bottom: 1rem;
          }
        }
      }
        .clear {
            clear: both;
        }
    }
`)