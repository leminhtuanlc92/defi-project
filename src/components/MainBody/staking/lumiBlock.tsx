import React, { memo } from 'react'
import styled from 'styled-components'
import Colors from 'constants/Colors'
const icons = {
    earned: require('assets/images/fee.svg'),
    lumi: require('assets/images/coin-lumi.svg')
}
export default ({ type, value }) => {
    return (
        <LumiBlockWrap>
            <div className="lb">
                <div className="lb_logo">
                    <img src={icons[type]} alt="" />
                </div>
                <div className="lb_input">
                    <span>{type}</span>
                    <input value={`${value}`} readOnly />
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
    div{
        display:flex;
    }
    .lb{
        .lb_logo{
            background:${Colors.white};
            align-items:center;
            justify-content:center;
            width:48px;
            height:48px;
            border-radius:5px;
            img{
                width:30px;
                height:30px;
            }
        }
        .lb_input{
            align-items: flex-start;
            justify-content: center;
            flex-direction:column;
            flex: 1;
            span{
                color:${Colors.black10};
                padding: 0 10px;
                text-transform:capitalize;
            }
            input {
                padding: 0 10px;
                height:37px;
                width:calc(100% - 20px);
                border: none;
                background:none;
                cursor:default;
                color:${Colors.orange7};
                font-weight:bold;
            }
        }
    }
`)