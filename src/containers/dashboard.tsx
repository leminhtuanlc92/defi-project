import React, { memo } from 'react'
import styled from 'styled-components'
import Colors from '../constants/Colors'
export default () => {
    return (
        <DashboardWrap>
            
        </DashboardWrap>
    )
}

const DashboardWrap = memo(styled.div`
    flex:1;
    height:100%;
    border-top-left-radius:30px;
    border-top-right-radius:30px;
    background-color: ${Colors.mainbodyBg}
`)