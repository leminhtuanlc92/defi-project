import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import i18n from 'i18n-js'
import Colors from '../../constants/Colors'
import Texts from '../../constants/Texts'
interface LoadingProps {
    color?: string;
    size?: number
}
export default ({ color = Colors.green1, size = 25 }: LoadingProps) => {
    return (
        <LoadingWrap color={color} size={size}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </LoadingWrap>
    )
}

const LoadingWrap = memo(styled.div`
    position: relative;
    width: ${(props: any) => props.size}px;
    height: ${(props: any) => props.size}px;
    div{
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: ${(props: any) => props.size}px;
        height: ${(props: any) => props.size}px;
        border: calc((${(props: any) => props.size}px) * .1) solid ${(props: any) => props.color};
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${(props: any) => props.color} transparent transparent transparent;
        &:nth-child(1){
            animation-delay: -0.45s;
        }
        &:nth-child(2){
            animation-delay: -0.3s;
        }
        &:nth-child(3){
            animation-delay: -0.15s;
        }
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`)



