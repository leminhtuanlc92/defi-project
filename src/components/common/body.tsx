import React, { memo, Fragment, useContext } from 'react'
import styled, { css } from 'styled-components/macro'
import { ToastContainer } from 'react-toastify'
import { SiteContext } from '../../contexts/SiteContext'
import Aside from './aside'
import MainRoutes from '../../router'
export default () => {
    const { siteState: { aside } } = useContext(SiteContext)
    return (
        <Fragment>
            <WrapBody>
                <Aside />
                <MainContentWrap aside={aside}>
                    <MainBody aside={aside}>
                        <MainRoutes/>
                    </MainBody>
                </MainContentWrap>
                <ToastContainer />
            </WrapBody>
        </Fragment>
    )
}
const WrapBody = memo(styled.div`
    background-size:cover;
    background-position:center;
    background-color: #fff;
    height:100vh;
    overflow:hidden;
    display: flex;
    flex:1
`)
const MainContentWrap = memo(styled.div`
    position:relative;
    /* @media (min-width:992px){
        height:calc(100vh - 90px);
    } */
    @media (max-width:991px){
        height:100vh;
        transition: all 0.3s cubic-bezier(0.215,0.61,0.355,1);
        flex:1;
        ${(props: any) => props.aside ?
        css`width:80%` :
        css`width:calc(100% - 30px);`
    }
    }
    .hash{
        position:fixed;
        top: 1em;
        left: 1em;
        width: calc(10% - 2em);
        padding:20px;
        z-index:9;
        display:flex;
        align-items:center;
        animation: notifyBalances 3s;
        animation-fill-mode:forwards;
        border-radius: 5px;
        img{
            max-height:20px;
        }
        &.minus{
            background:#d02a00;
        }
        &.add{
            background:#41ad41;
        }
        @keyframes notifyBalances{
            0% {
                opacity:0;
                transform: scale(0.1);
            }
            5% {
                opacity:1;
                transform: scale(1);
            }
            75% {
                opacity:1;
                transform: scale(1);
            }
            100% {
                opacity:0;
                transform: scale(0.1);
            }
        }
    }
`)

const MainBody = memo(styled.div`
    height:100%;
    transition: all 0.3s cubic-bezier(0.215,0.61,0.355,1);
    position: relative;
    ${(props: any) => props.aside !== 3 ?
        css`padding: 0 16% 0 12%;`
        :
        css`padding:0 16% 0 0;`
    }
    @media (min-width:992px) and (max-width:1199px){
        ${(props: any) => props.aside !== 3 ?
        css`padding:0 20% 0 15%;`
        :
        css`padding:0 20% 0 0;`
    }
    }
    @media (max-width:991px){
        padding:0;
    }
`)