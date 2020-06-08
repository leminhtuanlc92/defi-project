import React, { memo } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../../constants/Colors";
import Texts from "../../../../constants/Texts";
import { TronContract } from "../../../../contexts/tronWeb";
export default () => {
    return (
        <NodeItemWrap>
                
        </NodeItemWrap>
    )
}


const NodeItemWrap = memo(styled.div`
    background-color:${Colors.white};
    flex-direction:column;
    flex:1;
    padding:15px;
    border-radius:10px;
    margin-bottom:30px;
    flex-grow:2;
`)