import React, { memo } from 'react'
import styled from 'styled-components'
import Colors from 'constants/Colors'
const icons = {
    earned: require('assets/images/fee.svg'),
    lumi: require('assets/images/coin.svg')
}
export default ({ type, value }) => {
    return (
        <LumiBlockWrap>
            <div className="lb">
                <div className="lb_logo">
                    <img src={icons[type]} alt="" />
                    <span>{type}</span>
                </div>
                <div className="lb_input">
                    <input value={value} readOnly />
                </div>
            </div>
        </LumiBlockWrap>
    )
}

const LumiBlockWrap = memo(styled.div`
    width:40%;
    display:block;
    @media (max-width:500px){
        width:100%;
    }
    .lb{
        text-align:center;
        border: solid 1px #EF89404D;
        border-radius:5px;
        .lb_logo{
            background:${Colors.white};
            align-items:center;
            justify-content:center;
            width:40%;
            border-top-left-radius:5px;
            border-bottom-left-radius:5px;
            span{
                color:${Colors.black10};
                text-transform:capitalize;
            }
            img{
                width:20px;
                height:20px;
                margin-right:8px;
            }
        }
        .lb_input{
            display:block;
            text-align:center;
            width:60%;
            border-top-right-radius:5px;
            border-bottom-right-radius:5px;
            input {
                padding: 0 10px;
                height:37px;
                width:calc(100% - 20px);
                border-radius: 5px;
                border: none;
                background:${Colors.orange5};
                cursor:default;
                color:${Colors.orange7};
                font-weight:bold;
            }
        }
    }
`)