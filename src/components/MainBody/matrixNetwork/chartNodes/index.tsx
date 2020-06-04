import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../../constants/Colors";
import Texts from "../../../../constants/Texts";

export default () => {
    return (
        <ChartNodesWrap>

        </ChartNodesWrap>
    )
}


const ChartNodesWrap = memo(styled.div`
    background-color:${Colors.white};
    flex-direction:column;
    flex:1;
    padding:15px;
    border-radius:10px;
    margin-bottom:30px;
    flex-grow:2;
`)