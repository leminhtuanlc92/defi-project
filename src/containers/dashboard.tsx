import React, { memo } from 'react'
import styled from 'styled-components'
export default () => {
    return (
        <DashboardWrap />
    )
}

const DashboardWrap = memo(styled.div`
    flex:1;
    height:100%;
    background-color:'#c7c7c7'
`)