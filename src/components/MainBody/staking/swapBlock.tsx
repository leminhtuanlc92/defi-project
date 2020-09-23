import React, { memo, useState } from 'react'
import styled from 'styled-components'
import i18n from 'i18n-js'
import Colors from 'constants/Colors'
import Regex from 'constants/Regex'
const coinImg = {
    lumi: require('assets/images/icon-defi.png'),
    trx: require('assets/images/tron.svg')
}
interface SwapBlockProps {
    value: number;
    setAmountSwap?: any;
    type: string;
    balance: number;
    errorInput?: string;
    setErrorInput?: any
}
export default ({ value, setAmountSwap, type, balance, errorInput, setErrorInput }: SwapBlockProps) => {
    return (
        <SwapBlockWrap>
            <div className="sb">
                <div className="sb_logo">
                    <img src={coinImg[type]} alt="" />
                </div>
                <div className="sb_input">
                    <input
                        type="number"
                        value={value}
                        readOnly={type === 'trx'}
                        onChange={(e) => {
                            if (type === 'lumi') {
                                setAmountSwap(+e.target.value)
                                if (e.target.value.match(Regex.money) !== null) {
                                    if (+e.target.value > balance) {
                                        setErrorInput('amountExceededBalance')
                                    }
                                    else {
                                        setErrorInput('')
                                    }
                                }
                                else {
                                    setErrorInput('invalidInput')
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </SwapBlockWrap>
    )
}

const SwapBlockWrap = memo(styled.div`
    width:40%;
    display:block;
    .sb{
        display:block;
        text-align:center;
        .sb_logo{
            margin-bottom:1rem;
            display:block;
            text-align:center;
            img{
                width:40px;
                height:40px;
            }
        }
        .sb_input{
            display:block;
            text-align:center;
            input {
                padding: 0 10px;
                height:37px;
                width:calc(100% - 20px);
                border-radius: 5px;
                border: solid 1px ${Colors.black9};
                @media (min-width:992px){
                    min-width:200px;
                }
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
            }
        }
    }
`)