import React, { memo, useState } from 'react'
import styled from 'styled-components'
import i18n from 'i18n-js'
import Colors from 'constants/Colors'
import Texts from 'constants/Texts'
import StatisticStaking from './statisticStaking'
import Regex from 'constants/Regex'
import Loading from 'components/common/loading'
import Swap from 'components/MainBody/staking/swap'
export default () => {
    const [amountStake, setAmountStake] = useState(0)
    const [loading, setLoading] = useState(false)
    const [stats, setStats] = useState([
        { title: 'totalStaking', value: 0 },
        { title: 'earned', value: 0 },
        { title: 'priceLumi', value: 0 },
        { title: 'maxPayout', value: 0 },
        { title: 'feeSwap', value: 0 },
        { title: 'lumiBalance', value: 0 },
        { title: 'currentPayout', value: 0 },
    ])
    const [errorInput, setErrorInput] = useState('')
    //TODO function stake
    const handleStake = () => { }
    

    return (
        <StakingWrap>
            <span id="staking_main_title">{i18n.t("staking")}</span>
            <div id="staking_mainbody">
                <div className="mb_input">
                    <div className="mbi_inner">
                        <div className="left_input">
                            <input type="number" placeholder={i18n.t('amount')}
                                onChange={(e) => {
                                    setAmountStake(+e.target.value)
                                    if (e.target.value.match(Regex.money) !== null) {
                                        if (+e.target.value < 10000) {
                                            setErrorInput('minimumAmount10k')
                                        }
                                        else {
                                            setErrorInput('')
                                        }
                                    }
                                    else {
                                        setErrorInput('invalidInput')
                                    }
                                }}
                            />
                            <div className="mbi_error">
                                {errorInput !== '' ?
                                    <span>{i18n.t(errorInput)}</span>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className="mbi_interest">
                            <span>{i18n.t('interest')}</span>
                            <span>{amountStake <= 100000 ? '8%' : amountStake <= 500000 ? '10%' : '12%'}</span>
                        </div>
                        <button onClick={() => handleStake()}
                            disabled={loading || errorInput !== '' || amountStake < 10000}
                        >
                            {loading ?
                                <Loading size={20} color={Colors.white} />
                                :
                                <span>{i18n.t('staking')}</span>
                            }
                        </button>
                    </div>
                </div>
                <div className="mb_statistic">
                    {stats.map((item, index) => {
                        return <StatisticStaking
                            key={index}
                            title={item.title}
                            value={item.value}
                        />
                    })}
                    <div className="clear" />
                </div>
                <Swap 
                    priceLumi={stats[2].value}
                    lumiBalance={stats[5].value}
                />
            </div>
        </StakingWrap>
    )
}

const StakingWrap = memo(styled.div`
    flex: 1;
    width: 100%;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x:hidden;
    #staking_main_title {
        font-size: ${Texts.size.huge};
        line-height: ${Texts.size.huge};
        color: ${Colors.black};
        margin-bottom: 10px;
        font-weight: 500;
    }
    #staking_mainbody {
        background-color: ${Colors.white};
        display: block;
        width: calc(100% - 4rem);
        height: calc(100% - 4rem);
        padding:2rem;
        border-radius: 10px;
        @media (max-width:767px){
            width: calc(100% - 2rem);
            height: calc(100% - 2rem);
            padding:1rem;
        }
        .mb_input{
            margin-bottom:3rem;
            display:inline-block;
            border-radius: 5px;
            @media (max-width:767px){
                width:100%;
            }
            .mbi_inner{
                border: solid 1px ${Colors.black9};
                border-radius: 5px;
                position:relative;
                @media (max-width:767px){
                    display:block;
                    border:none;
                }
                .left_input{
                    position:relative;
                    @media (max-width:767px){
                        margin-bottom:1rem;
                    }
                    input {
                        padding: 0 10px;
                        height:37px;
                        min-width:250px;
                        border:none;
                        border-top-left-radius: 5px;
                        border-bottom-left-radius: 5px;
                        &::placeholder {
                            color: ${Colors.black3};
                            font-style: italic;
                        }
                        &::-webkit-outer-spin-button, &::-webkit-inner-spin-button{
                            -webkit-appearance: none;
                            margin: 0;
                        }
                        &[type=number]{
                            -moz-appearance:textfield;
                        }
                        @media (max-width:767px){
                            width:calc(100% - 20px);
                            border: solid 1px ${Colors.black9};
                            border-radius:5px;
                            display: block;
                            min-width: initial;
                        }
                    }
                    .mbi_error{
                        height:20px;
                        width:100%;
                        line-height:20px;
                        position:absolute;
                        top:100%;
                        left:0;
                        span{
                            font-size:0.8rem;
                            color:${Colors.red};
                        }
                    }
                }
                .mbi_interest{
                    align-items:center;
                    justify-content:center;
                    padding: 0 10px;
                    position:relative;
                    margin-right:100px;
                    @media (min-width:768px){
                        &:before{
                            content:'';
                            left:0;
                            top:20%;
                            width:1px;
                            height:60%;
                            background:${Colors.black};
                            position:absolute;
                        }
                    }
                    @media (max-width:767px){
                        padding:0;
                        margin:1rem 0;
                        display:block;
                        text-align:center;
                    }
                    span{
                        color:${Colors.black};
                        &:nth-child(2){
                            margin-left:5px;
                        }
                    }
                }
                button{
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    background-color: ${Colors.orange};
                    box-shadow: none;
                    color: ${Colors.white};
                    font-size: ${Texts.size.large};
                    min-width:100px;
                    height:39px;
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    position: absolute;
                    top:-1px;
                    right:-1px;
                    border:none;
                    &:hover {
                        background-color: ${Colors.orange1};
                        box-shadow: 0 3px 6px 1px rgba(255, 159, 91, 0.2);
                    }
                    &:disabled {
                        background-color: ${Colors.orange2};
                        color: ${Colors.orange3};
                        box-shadow: none;
                        cursor: not-allowed;
                    }
                    @media (max-width:767px){
                        border-radius:5px;
                        margin:0 auto;
                        position:relative;
                    }
                }
            }
        }
        .mb_statistic{
            display:block;
            >div{
                &:not(:last-child){
                    width:22%;
                    display:block;
                    float:left;
                    @media (min-width:768px){
                        &:nth-child(4n+1){
                            margin:0 2% 2rem 0;
                        }
                        &:nth-child(4n+2){
                            margin:0 2% 2rem;
                        }
                        &:nth-child(4n+3){
                            margin:0 2% 2rem;
                        }
                        &:nth-child(4n+4){
                            margin:0 0 2rem 2%;
                        }
                    }
                   
                    @media (min-width:500px) and (max-width:767px){
                        width:48%;
                        &:nth-child(2n+1){
                            margin:0 2% 2rem 0;
                        }
                        &:nth-child(2n+2){
                            margin:0 0 2rem 2%;
                        }
                    }
                    @media (max-width:499px){
                        width:100%;
                        margin-bottom:1rem;
                    }
                }
            }
            .clear{
                clear:both;
            }
        }
    }
`)