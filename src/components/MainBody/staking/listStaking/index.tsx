import React, { memo, useState, Fragment } from 'react'
import styled from 'styled-components'
import i18n from 'i18n-js'
import Texts from 'constants/Texts'
import Colors from 'constants/Colors'
import StakingItem from 'components/MainBody/staking/listStaking/stakingItem'
import Pagination from 'components/common/core/Pagination'
export default () => {
    //TODO get Data
    // const [data, setData] = useState([] as any)
    const [page, setPage] = useState(1)
    const data = [
        { amount: 0.001, time: 1601434610, fullfill: false, coin: 'eth' },
        { amount: 0.002, time: 1601438210, fullfill: true, coin: 'eth' },
        { amount: 0.003, time: 1601441810, fullfill: false, coin: 'eth' },
        { amount: 0.004, time: 1601445410, fullfill: true, coin: 'eth' },
        { amount: 0.005, time: 1601434610, fullfill: false, coin: 'eth' },
        { amount: 0.006, time: 1601434610, fullfill: true, coin: 'eth' },
        { amount: 0.007, time: 1601434610, fullfill: false, coin: 'eth' },
        { amount: 0.008, time: 1601434610, fullfill: true, coin: 'eth' },
        { amount: 0.009, time: 1601434610, fullfill: false, coin: 'eth' },
        { amount: 0.010, time: 1601434610, fullfill: true, coin: 'eth' }
    ]
    return (
        <ListStakingWrap>
            <div className="ls_inner">
                <span className="lsi_title">{i18n.t("listStaking")}:</span>
                <div className="lsi_body">
                    <div className="lsib_header">
                        <div className="lsibh_number">
                            <span>{i18n.t("numberShorthand")}</span>
                        </div>
                        <div className="lsibh_amount">
                            <span>{i18n.t("amount")}</span>
                        </div>
                        <div className="lsibh_time">
                            <span>{i18n.t("time")}</span>
                        </div>
                        <div className="lsibh_fullfill">
                            <span>{i18n.t("fullfill")}</span>
                        </div>
                    </div>
                    <div className="lsib_list">
                        {data.length > 0 ?
                            <Fragment>
                                {(data as any).map((item, index) => {
                                    return (
                                        <StakingItem
                                            key={index}
                                            index={index}
                                            amount={item.amount}
                                            time={item.time}
                                            fullfill={item.fullfill}
                                            coin={item.coin}
                                        />
                                    )
                                })}
                            </Fragment>
                            :
                            <div className="empty_list">
                                <span>{i18n.t('emptyList')}</span>
                            </div>
                        }

                        {data.length > 0 ? (
                            <div className="lsibl_pagination">
                                <Pagination
                                    currentPage={page}
                                    totalPage={1}
                                    size={8}
                                    url="/staking"
                                    setPage={setPage}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </ListStakingWrap>
    )
}
const ListStakingWrap = memo(styled.div`
    display: block;
    margin: 0 auto;
    .ls_inner {
        display: block;
        width: 100%;
        .lsi_title {
            font-size: ${Texts.size.huge};
            line-height: ${Texts.size.huge};
            color: ${Colors.black};
            margin-bottom: 1rem;
            font-weight: 500;
            display: block;
            text-align: left;
        }
        .lsi_body{
            display:block;
            .lsib_header{
                padding:1rem 0;
                border-bottom: solid 1px ${Colors.black};
                >div{
                    display:block;
                    &:first-child{  
                        flex:1;
                        text-align:left;
                    }
                    &:nth-child(2){
                        flex:3;
                        text-align:center;
                    }
                    &:nth-child(3){
                        flex:4;
                        text-align:center;
                    }
                    &:last-child{
                        flex:2;
                        text-align:right;
                    }
                    span{
                        color:${Colors.black};
                        font-weight:500;
                    }
                }
            }
            .lsib_list{
                display:block;
                .empty_list{
                    align-items:center;
                    justify-content:center;
                    padding:1rem 0;
                    span{
                        color:${Colors.black1};
                        font-size:0.8rem;
                    }
                }
                .lsibl_pagination{
                    margin-top:1rem;
                }
            }
        }
    }
`)