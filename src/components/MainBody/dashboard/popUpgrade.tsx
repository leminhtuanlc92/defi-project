import React, { memo, useState, Fragment, useContext } from 'react';
import styled, { css } from 'styled-components/macro';
import Colors from '../../../constants/Colors';
import Texts from '../../../constants/Texts';
import i18n from 'i18n-js';
import moment from 'moment';
import Select from '../../common/core/Select'
import ClickOutside from '../../../utils/clickOutSide'
import { TronContract } from "../../../contexts/tronWeb";
import { contract } from "../../../config";

const closeImg = require('../../../assets/images/close.png')
const checkImg = require('../../../assets/images/ic-green-check.png')
const upgradeSuccess = require('../../../assets/images/upgrade-successful.svg')
const backImg = require('../../../assets/images/white-back.png')
interface PopUpgradeProps {
    showPop: boolean;
    setShowPop: any;
    selectPlan: number;
    setSelectPlan: any;
}

export default ({ showPop, setShowPop, selectPlan, setSelectPlan }: PopUpgradeProps) => {
    const [step, setStep] = useState(1)
    const [currentSelect, setCurrentSelect] = useState({ title: '', value: '' })
    let dataSelect = [] as Array<any>
    for (let i = 1; i <= 8; i++) {
        if (i > selectPlan) { dataSelect.push({ value: i, title: `${i18n.t('level')} ${i}` }) }
    }
    const { matrixMarketing, ref, usdt, address } = useContext(TronContract);
    const pricePackage = [0, 15, 45, 90, 180, 240, 420, 600, 900];
    const getAmountUpgrade = (currentLevel: number, upgradeLevel: number) => {
        let total = 0;
        let detail = [];
        for (let i = currentLevel + 1; i <= upgradeLevel; i++) {
            total += pricePackage[i];
            detail.push({
                level: i,
                price: pricePackage[i],
            });
        }
        //Total là tổng số tiền
        // Detail là danh sách các level nâng cấp
        // console.log('BBBB', { total, detail })
        return {
            total,
            detail
        };

    };
    const handleConfirm = () => {
        // setSelectPlan(value)
        // getAmountUpgrade(selectPlan, 8)
        setSelectPlan()
    }
    //Upgrade funtion
    const upgrade = async (upgradeLevel: number) => {
        let result = await matrixMarketing.upgradePackage(upgradeLevel, ref);
        console.log(result);
    };

    return (
        <PopUpgradeWrap>
            <ClickOutside style={{ minWidth: '60%', minHeight: '70%' }}
                handleClickOutSide={() => {
                    setShowPop(false)
                    step === 2 && setStep(1)
                }}>
                <div id="pop-upgrade-content">
                    <div id="pop-upgrade-content-inner">
                        <span id="pop-upgrade-title">{i18n.t('upgradeAccount')}</span>
                        <span id="pop-upgrade-quote">{i18n.t('upgradeAccountquote')}</span>
                        <div id="pop-upgrade-main">
                            <div id="pum-inner">
                                <div id="p-u-m-step">
                                    <PumStep1 step={step}>
                                        <div className="p-u-m-icon">
                                            <img src={checkImg} alt="" />
                                        </div>
                                        <span className="pum-title">{i18n.t('approveUsdt')}</span>
                                    </PumStep1>
                                    <PumDivider step={step}></PumDivider>
                                    <PumStep2 step={step}>
                                        <div className="p-u-m-icon">
                                            {step === 2 ?
                                                <img src={checkImg} alt="" />
                                                :
                                                <span className="pum-">2</span>
                                            }
                                        </div>
                                        <span className="pum-title">{i18n.t('approveUsdt')}</span>
                                    </PumStep2>
                                </div>
                                <div id="pum_current_lv">
                                    <div id="pumclv_inner">
                                        {step === 1 ?
                                            <Fragment>
                                                <div id="pumclvi_lv">
                                                    <span>{i18n.t('currentLevel')}:</span>
                                                    <span>{selectPlan}</span>
                                                </div>
                                                <div id="pumclvilv_upgrade">
                                                    <span id="pumclvilvu_title">{i18n.t('levelUpgrade')}:</span>
                                                    <div id="pumcl_select">
                                                        <Select
                                                            listSelect={dataSelect}
                                                            action={setCurrentSelect}
                                                            defaultSelect={i18n.t('selectUpdate')}
                                                            currentSelect={currentSelect}
                                                        />
                                                    </div>
                                                </div>
                                                <div id="pumclvi_purchase">
                                                    <div id="pumclvip_amount">
                                                        <span>{i18n.t('purchaseAmount')}</span>
                                                        <span>45 USDT</span>
                                                    </div>
                                                    <div id="pumclvip_cal1">
                                                        <span>{i18n.t('level')} {selectPlan}</span>
                                                        <span>15 USDT</span>
                                                    </div>
                                                    {currentSelect.title !== '' ?
                                                        <div id="pumclvip_cal2">
                                                            <span>{i18n.t('level')} {currentSelect.value}</span>
                                                            <span>45 USDT</span>
                                                        </div>
                                                        :
                                                        null
                                                    }
                                                </div>
                                                <div id="pumclvi_button">
                                                    <div id="pumclvib_inner">
                                                        <button onClick={() => handleConfirm()}
                                                            disabled={!(currentSelect.title !== '')}>
                                                            {i18n.t('confirm')}
                                                        </button>
                                                    </div>
                                                </div>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <div id="pumclvi_success">
                                                    <img src={upgradeSuccess} alt="" />
                                                </div>
                                                <div id="pumclvi_quote">
                                                    <span>{i18n.t('upgradeSuccessQuote1')}</span>
                                                    <span>{i18n.t('upgradeSuccessQuote2')}</span>
                                                </div>
                                                <div id="pumclvi_button">
                                                    <div id="pumclvib_inner">
                                                        <button onClick={() => {
                                                            setShowPop(false)
                                                            setStep(1)
                                                        }}>
                                                            <img src={backImg} alt="" /> {i18n.t('backToDashboard')}
                                                        </button>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="pop-upgrade-close-button" onClick={() => {
                        setShowPop(!showPop)
                        step === 2 && setStep(1)
                    }}>
                        <img src={closeImg} alt="" />
                    </div>
                </div>
            </ClickOutside>
        </PopUpgradeWrap>
    )
}

const PopUpgradeWrap = memo(styled.div`
    position:fixed;
    z-index:2;
    top:0;
    left:0;
    background-color:rgba(34,34,34,.8);
    align-items:center;
    justify-content:center;
    width:100vw;
    height:100vh;
    #pop-upgrade-content{
        flex:1;
        background:${Colors.white};
        border-radius:15px;
        flex-direction:column;
        padding:40px 50px;
        align-items:center;
        justify-content:center;
        position:relative;
        #pop-upgrade-content-inner{
            flex:1;
            flex-direction:column;
            align-items:center;
            width:100%;
            #pop-upgrade-title{
                font-size:${Texts.size.extra};
                line-height: ${Texts.size.extra};
                color: ${Colors.green};
            }
            #pop-upgrade-quote{
                font-size:${Texts.size.large};
                line-height: ${Texts.size.large};
                color: ${Colors.black};
            }
            #pop-upgrade-main{
                background:${Colors.white4};
                border-radius:10px;
                margin-top:30px;
                width:95%;
                flex:1;
                flex-direction:column;
                align-items:center;
                #pum-inner{
                    padding: 20px;
                    flex: 1;
                    flex-direction: column;
                    align-items:center;
                    justify-content:space-between;
                    width: calc(100% - 40px);
                    #p-u-m-step{
                        align-items:center;
                        margin-bottom:30px;
                        div{
                            flex-direction: column;
                            align-items:center;
                            justify-content:center;
                            img{
                                width:20px;
                                object-fit:contain;
                            }
                        }
                        .p-u-m-icon{
                            width:40px;
                            height:40px;
                        }
                    }
                    #pum_current_lv{
                        flex:1;
                        width: 80%;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        border:solid 1px ${Colors.green};
                        border-radius:5px;
                        #pumclv_inner{
                            flex: 1;
                            padding: 20px 0;
                            width: 80%;
                            flex-direction:column;
                            justify-content:space-between;
                            #pumclvi_lv{
                                justify-content:space-between;
                                align-items:center;
                                margin-bottom:20px;
                                span{
                                    font-size:${Texts.size.large};
                                    line-height: ${Texts.size.large};
                                    color: ${Colors.black};
                                    &:first-child{
                                        text-transform:uppercase;
                                    }
                                }
                            }
                            #pumclvilv_upgrade{
                                flex-direction:column;
                                margin-bottom:20px;
                                #pumclvilvu_title{
                                    font-size:${Texts.size.large};
                                    line-height: ${Texts.size.large};
                                    color: ${Colors.black};
                                    text-transform:uppercase;
                                }
                                #pumcl_select{
                                    width:100%;
                                    margin-top:10px;
                                }
                            }
                            #pumclvi_purchase{
                                flex-direction:column;
                                #pumclvip_amount{
                                    align-items:center;
                                    justify-content:space-between;
                                    span{
                                        font-size:${Texts.size.large};
                                        line-height: ${Texts.size.large};
                                        color: ${Colors.black};
                                        &:first-child{
                                            text-transform:uppercase
                                        }
                                        &:nth-child(2){
                                            font-weight:700;
                                        }
                                    }
                                }
                                #pumclvip_cal1{
                                    align-items:center;
                                    justify-content:space-between;
                                    span{
                                        &:first-child{
                                            font-size:${Texts.size.normal};
                                            line-height: ${Texts.size.normal};
                                            color: ${Colors.black};
                                        }
                                        &:nth-child(2){
                                            font-size:${Texts.size.large};
                                            line-height: ${Texts.size.large};
                                            color: ${Colors.black};
                                        }
                                    }
                                }
                                #pumclvip_cal2{
                                    span{
                                        &:first-child{
                                            font-size:${Texts.size.normal};
                                            line-height: ${Texts.size.normal};
                                            color: ${Colors.black};
                                        }
                                        &:nth-child(1){
                                            font-size:${Texts.size.large};
                                            line-height: ${Texts.size.large};
                                            color: ${Colors.black};
                                        }
                                    }
                                }
                            }
                            #pumclvi_button{
                                width:100%;
                                align-items:center;
                                justify-content:center;
                                #pumclvib_inner{
                                    width:60%;
                                    justify-content:center;
                                    button{
                                        width:100%;
                                        border-radius:5px;
                                        background-color:${Colors.orange};
                                        box-shadow:none;
                                        color:${Colors.white};
                                        font-size: ${Texts.size.large};
                                        border: none;
                                        padding:15px 40px;
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
                            #pumclvi_success{
                               justify-content:center;
                               margin:10px 0;
                            }
                            #pumclvi_quote{
                                margin:10px 0 20px;
                                flex-direction:column;
                                align-items:center;
                                span{
                                    font-size:${Texts.size.large};
                                    line-height: ${Texts.size.large};
                                    color: ${Colors.black8};
                                }
                            }
                            #pumclvi_button{
                                margin:10px 0;
                                button{
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    #pop-upgrade-close-button{
        position:absolute;
        top:20px;
        right:20px;
        cursor: pointer;
    }
`)
const PumDivider = memo(styled.div`
    width: 50px;
    height: 5px;
    ${(props: any) => props.step === 2 ?
        css`background-color: ${Colors.orange};`
        :
        css`background-color: ${Colors.green3};`
    };
    margin: 0 20px 10px 20px;
`)
const PumStep1 = memo(styled.div`
    .p-u-m-icon{
        border-radius:50%;
        background-color: ${Colors.orange};
        span{
            color: ${Colors.orange}
        }
    }
    .pum-title{
        font-size:${Texts.size.normal};
        line-height: ${Texts.size.normal};
        color: ${Colors.orange};
    }
`)
const PumStep2 = memo(styled.div`
    .p-u-m-icon{
        border-radius:50%;
        ${(props: any) => props.step === 2 ? css`
            background-color: ${Colors.orange};
            span{
                color: ${Colors.orange}
            }
        `: css`
            background-color: ${Colors.green};
            span{
                color: ${Colors.green3}
            }
        `}
    }
    .pum-title{
        font-size:${Texts.size.normal};
        line-height: ${Texts.size.normal};
        ${(props: any) => props.step === 2 ?
        css`
            color: ${Colors.orange};
        `:
        css`
            color: ${Colors.green3};
        `
    }
    }
`)