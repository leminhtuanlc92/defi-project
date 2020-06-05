import React, { memo } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
interface USDTItemProps {
    id: number;
    level: number;
    percent: number;
    lastItem: boolean
}
export default ({ id, level, percent, lastItem }: USDTItemProps) => {
    return (
        <USDTItemWrap lastItem={lastItem}>
            <div className="ui_id">
                <span>{id}</span>
            </div>
            <div className="ui_name">
                <span>{level}</span>
            </div>
            <div className="ui_volume">
                <span>{percent}</span>
            </div>
        </USDTItemWrap>
    )
}

const USDTItemWrap = memo(styled.div`
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
    .ui_id{
        span{
            text-align:left;
        }
    }
    .ui_level{
        span{
            text-align:center;
        }
    }
    .ui_percent{
        span{
            text-align:right;
        }
    }
`)