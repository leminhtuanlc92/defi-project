import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import SunUserItemChild from "./sunUserItemChild";
import i18n from 'i18n-js'
import { TronContract } from "../../../contexts/tronWeb";
const arrowImg = require('../../../assets/images/ic-have-child.svg')
const avtImg = require('../../../assets/images/avt.png');
const endNodeImg = require('../../../assets/images/ic-k-nhanh.svg')
interface SunUserItemProps {
    item: any;
}
export default ({ item }: SunUserItemProps) => {
    const [showChild, setShowChild] = useState(false)
    const { member, userData } = useContext(TronContract);
    const [nodeData, setNodeData] = useState({ user: null, level: 0 } as any)
    const getUser = async (_userAddress) => {
        let user = await member.getUser(_userAddress).call();
        let level = await userData.getLevel(_userAddress).call();
        setNodeData({ user, level })
    };
    useEffect(() => {
        getUser(item.user.parent)
    }, [])
    return (
        <SunUserItemWrap showChild={showChild}>
            <SunUserItemNodeMain showChild={showChild} onClick={() => { nodeData.user.refs.length > 0 && setShowChild(!showChild) }}>
                {nodeData.user !== null?
                    <SunChildNodeImage src={nodeData.user.refs.length === 0 ? endNodeImg : arrowImg} alt="" showChild={showChild} />
                    :
                    null
                }
                <div className="sunm_info">
                    <div className="sunmi_avt">
                        <img src={avtImg} alt="" />
                        <span>{i18n.t('level')}: {item.level}</span>
                    </div>
                    <div className="sunmi_bio">
                        <span className="sunuser_nodename">{item.user.userId !== '' ? item.user.userId : i18n.t('unSet')}</span>
                        <span className="sunuser_address">{item.user.parent}</span>
                    </div>

                </div>
            </SunUserItemNodeMain>
            {nodeData.user !== null && nodeData.user.refs.length > 0 && showChild ?
                <div className="su_childnodes">
                    {nodeData.user.refs.map((data: any, index: number) => {
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