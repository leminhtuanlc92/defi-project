import React, { memo, useContext } from 'react'
import styled, { css } from 'styled-components'
import { SiteContext } from '../../contexts/SiteContext'
import Colors from '../../constants/Colors'
export default () => {
    const { siteState } = useContext(SiteContext)
    return (
        <AsideWrap aside={siteState.aside}>

        </AsideWrap>
    )
}
const AsideWrap = memo(styled.div`
    flex:1;
    background-color:${(props: any) => props.Colors.green2};
    ${(props: any) => props.aside ?
        css`width:20%` :
        css`width:30px`
    }
`)