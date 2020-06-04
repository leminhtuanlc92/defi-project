import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import SunUserItemChild from "./sunUserItemChild";
import i18n from 'i18n-js'
const arrowImg = require('../../../assets/images/ic-have-child.svg')
const avtImg = require('../../../assets/images/avt.png');
interface SunUserItemProps {
    item: any;
}
export default ({ item }: SunUserItemProps) => {
    const [showChild, setShowChild] = useState(false)
    return (
        <SunUserItemWrap showChild={showChild}>
            <SunUserItemNodeMain showChild={showChild} onClick={() => { item.nodes && setShowChild(!showChild) }}>
                <SunChildNodeImage src={arrowImg} alt="" showChild={showChild} />
                <div className="sunm_info">
                    <div className="sunmi_avt">
                        <img src={avtImg} alt="" />
                        <span>{i18n.t('level')}: {item.level}</span>
                    </div>
                    <div className="sunmi_bio">
                        <span className="sunuser_nodename">{item.name}</span>
                        <span className="sunuser_address">{item.address}</span>
                    </div>

                </div>
            </SunUserItemNodeMain>
            {item.nodes && showChild ?
                <div className="su_childnodes">
                    {item.nodes.map((data: any, index: number) => {
                        return <SunUserItemChild data={data} key={index} />
                    })}
                </div>
                :
                null
            }
        </SunUserItemWrap>
    )
}

const SunUserItemWrap = memo(styled.div`
    flex-direction:column;
    position:relative;
    margin-bottom:10px;
    .su_childnodes{
        flex-direction:column;
        padding-left:10px;
        /* border-left: solid 1px ${Colors.green}; */
        position:relative;
        /* &:after{
            content:'',
            position
        } */
    }
`)

const SunChildNodeImage = memo(styled.img`
    width:24px;
    object-fit:contain;
    margin:10px;
    ${(props: any) => props.showChild ?
        css`transform: rotate(90deg);`
        :
        css`transform: rotate(0deg);`
    };
`)

const SunUserItemNodeMain = memo(styled.div`
    align-items:center;
    flex:1;
    padding:10px;
    margin-bottom:10px;
    border: solid 1px ${Colors.green};
    ${(props: any) => props.showChild ?
        css`border-radius:0px;`
        :
        css`border-radius:10px;`
    };
    .sunm_info{
        margin-left:10px;
        .sunmi_avt{
            flex-direction:column;
            justify-content:center;
            align-items:center;
            img{
                object-fit:contain;
                width:30px;
                margin-bottom:5px;
            }
            span{
                font-size: ${Texts.size.normal};
                line-height: ${Texts.size.normal};
                color: ${Colors.black};
            }
        }
    }
    .sunmi_bio{
        margin-left:10px;
        flex-direction:column;
        justify-content:space-between;
        span{
            font-size: ${Texts.size.large};
            line-height: ${Texts.size.large};
            color: ${Colors.black};
        }
        .sunuser_nodename{
            margin-bottom:10px;
        }
    }
`)