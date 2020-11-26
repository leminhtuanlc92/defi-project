import React, { memo, Fragment } from "react";
import styled from "styled-components";
import i18n from "i18n-js";
import Texts from "constants/Texts";
import Colors from "constants/Colors";
import StakingItem from "components/MainBody/staking/listStaking/stakingItem";
import Pagination from "components/common/core/Pagination";
export default ({ list, page, setPage, current, maxPage }) => {
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
            {list.length > 0 ? (
              <Fragment>
                {(list as any).map((item, index) => {
                  return (
                    <StakingItem
                      key={index}
                      index={index}
                      amount={item.amount}
                      time={item.time}
                      fullfill={index + page * 10 < current}
                      coin={item.coin}
                    />
                  );
                })}
              </Fragment>
            ) : (
                <div className="empty_list">
                  <span>{i18n.t("emptyList")}</span>
                </div>
              )}
            {list.length > 0 &&
              <div className="lsibl_pagination">
                <Pagination
                  currentPage={page}
                  totalPage={maxPage}
                  size={10}
                  url="/staking"
                  setPage={setPage}
                />
              </div>
            }
          </div>
        </div>
      </div>
    </ListStakingWrap>
  );
};
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
    .lsi_body {
      display: block;
      .lsib_header {
        display:flex;
        padding: 1rem 0;
        border-bottom: solid 1px ${Colors.black};
        > div {
          display: block;
          &:first-child {
            width:10%;
            text-align: left;
          }
          &:nth-child(2) {
            width:30%;
            text-align: center;
          }
          &:nth-child(3) {
            width: 40%;
            text-align: center;
          }
          &:last-child {
            width: 20%;
            text-align: right;
          }
          span {
            color: ${Colors.black};
            font-weight: 500;
          }
        }
      }
      .lsib_list {
        display: block;
        .empty_list {
          display:flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 0;
          span {
            color: ${Colors.black1};
            font-size: 0.8rem;
          }
        }
        .lsibl_pagination {
          margin-top: 1rem;
        }
      }
    }
  }
`);
