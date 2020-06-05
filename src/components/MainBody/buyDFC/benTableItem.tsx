import React, { memo } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
interface BenItemProps {
    id: number;
    name: string;
    volume: number;
    bonus: number;
    txs: number;
    lastItem: boolean
}
export default ({ id, name, volume, bonus, txs, lastItem }: BenItemProps) => {
    return (
        <BenItemWrap lastItem={lastItem}>
            <div className="bdfcmmct_id">
                <span>{id}</span>
            </div>
            <div className="bdfcmmct_name">
                <span>{name}</span>
            </div>
            <div className="bdfcmmct_volume">
                <span>{volume}</span>
            </div>
            <div className="bdfcmmct_bonus">
                <span>{bonus}</span>
            </div>
            <div className="bdfcmmct_tx">
                <span>{txs}</span>
            </div>
        </BenItemWrap>
    )
}

const BenItemWrap = memo(styled.div`
    flex:1;
    justify-content:space-between;
    align-items:center;
    padding:15px 20px;
    position:relative;
    &:after{
        position:absolute;
        content:'';
        width:calc(100% - 40px);
        bottom:0;
        left:20px;
        ${(props: any) => props.lastItem ?
        css`height:0px;`
        :
        css`height:1px;`
    };
        background-color:${Colors.black};
    }
    div{
        overflow:hidden;
    }
    span{
        font-size: ${Texts.size.large};
        line-height: ${Texts.size.large};
        color: ${Colors.black};
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &:hover{
        background-color:${Colors.green6};
        box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, .1);
        &:after{
            height:0;
        }
    }
    .bdfcmmct_id{
        span{
            text-align:left;
        }
    }
    .bdfcmmct_name{
        span{
            text-align:center;
        }
    }
    .bdfcmmct_volume{
        span{
            text-align:center;
        }
    }
    .bdfcmmct_bonus{
        span{
            text-align:center;
        }
    }
    .bi_tx{
        span{
            text-align:right;
        }
    }
`)