import React, { memo, useState, useContext, useEffect, useRef } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../../constants/Colors";
import Texts from "../../../../constants/Texts";
import { SiteContext } from '../../../../contexts/siteContext'
import { TronContract } from "../../../../contexts/tronWeb";
export default () => {
    const { matrixMember, address, member, userData } = useContext(TronContract);
    const { siteState } = useContext(SiteContext)

    const getNode = async (_startUser) => {
        let result = await matrixMember.getNode(_startUser).call();
        console.log(result);
    };
    useEffect(() => {
        getNode(address)
    }, [])

    let refChart
    const chartRef = node => { refChart = node }
    const [wrapSize, setWrapSize] = useState({ width: 0, height: 0 })
    const Calc = () => {
        let elHeight = refChart.clientHeight;
        let elWidth = refChart.clientWidth
        // console.log('AAA', elHeight, elWidth)
        setWrapSize({ width: elWidth, height: elHeight })
    }
    useEffect(() => {
        Calc()
    }, [siteState.aside]);
    console.log('wrapSize', wrapSize)
    return (
        <ChartNodesWrap ref={chartRef}>
            <div style={{
                // width: `${wrapSize.width - 30}px`,
                // height: `${(wrapSize.width - 30) /1.333}px`,
                aspectRatio: '4/3',
                backgroundColor:'orange',
                maxWidth:'100%',
                maxHeight:'100%'
            }}>
                <div id="cni_sponsor"></div>
                <div id="cni_user"></div>
                <div id="cni_F1"></div>
                <div id="cni_no"></div>
            </div>
        </ChartNodesWrap>
    )
}


const ChartNodesWrap = memo(styled.div`
    background-color:${Colors.white};
    flex-direction:column;
    align-items:center;
    justify-content:center;
    flex:1;
    padding:15px;
    border-radius:10px;
    margin-bottom:30px;
    flex-grow:2;
    ${(props: any) => css`
        transform: translate(-50%, -50%) scale()
    `}
`)