import React, { memo, useState, useContext, useEffect, Fragment } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import Pagination from "../../../components/common/core/Pagination";
import PartnerSearchList from "./partnerSearchList";
import { TronContract } from "../../../contexts/tronWeb";
import WAValidator from 'multicoin-address-validator'
export default () => {
  const { address } = useContext(TronContract);
  const [startUser, setStartUser] = useState(address);
  const [level, setLevel] = useState('');
  const [page, setPage] = useState(1)
  const { matrixMember, member, userData } = useContext(TronContract);
  const [validAddress, setValidAddress] = useState(false)
  const [data, setData] = useState({
    total: 0,
    partnersList: []
  })
  const validate = () => {
    let valid = WAValidator.validate(startUser, "trx")
    setValidAddress(valid)
  }
  const getPartners = async (_startUser, _level, _size, _page) => {
    let result = await matrixMember
      .getBranch(_startUser, _level, _size, _page * _size)
      .call();
    let partnersList = [] as any;
    for (let i = 0; i < result.list.length; i++) {
      const [partner, username, level] = await Promise.all([
        matrixMember.getNode(result.list[i]).call(),
        member.getUsername(result.list[i]).call(),
        userData.getLevel(result.list[i]).call(),
      ]);
      partnersList.push({
        username,
        level,
        address: result.list[i],
        sponsor: partner.sponsor,
        parent: partner.parent,
        numberF1: partner.F1.filter((item) => item !== "").length,
      });
    }
    setData({
      total: result.total,
      partnersList
    })
    return {
      partnersList,
      total: result.total,
    };
  };
  // console.log('data',data)
  return (
    <PartnerskWrap>
      <span id="partner_main_title">{i18n.t("partners")}</span>
      <div id="partner_mainbody">
        <div id="pm_filter">
          <span id="pmf_title">{i18n.t("filter")}:</span>
          <div id="pmf_1">
            <div id="pmf1_left">
              <div className="pmf1l_block">
                <span className="pmf_label">{i18n.t("inputStartUser")}:</span>
                <input
                  defaultValue={startUser}
                  onChange={(e) => setStartUser(e.target.value)}
                  onBlur={() => validate()}
                  placeholder={i18n.t("username")}
                />
              </div>
              <div className="pmf1l_block">
                <span className="pmf_label">{i18n.t("inputSearchLevel")}:</span>
                <input
                  onChange={(e) => setLevel(e.target.value)}
                  placeholder={i18n.t("level")}
                />
              </div>
            </div>
            <div id="pmf1_right">
              <div className="pmfr_action">
                <button disabled={!(level !== '' && ((startUser !== address && validAddress) || startUser === address))} onClick={() => getPartners(startUser, +level, 8, +page)}>{i18n.t("filterV")}</button>
              </div>
            </div>
          </div>
          {/* <div id="pmf_2">
            <div id="pmf2_left">
              <div id="pmf2l_block">
                <span className="pmf_label">
                  {i18n.t("inputStartUser")}/{i18n.t("searchAddress")} :
                </span>
                <input
                  onChange={(e) => setStartUser(e.target.value)}
                  placeholder={`${i18n.t("username")} / ${i18n.t("address")}`}
                />
              </div>
            </div>
            <div id="pmf2_right">
              <div className="pmfr_action">
                <button>{i18n.t("filterV")}</button>
              </div>
            </div>
          </div> */}
        </div>
        <div id="pm_filter_result">
          <PartnerSearchList
            data={data}
          />
          {data.partnersList.length > 0 ?
            <div id="pmfr_pagination_wrap">
              <Pagination
                currentPage={page}
                totalPage={1}
                size={8}
                url="/partners"
                setPage={setPage}
              />
            </div>
            : null
          }
        </div>
      </div>
    </PartnerskWrap>
  );
};

const PartnerskWrap = memo(styled.div`
  flex: 1;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  #partner_main_title {
    font-size: ${Texts.size.huge};
    line-height: ${Texts.size.huge};
    color: ${Colors.black};
    margin-bottom: 10px;
    font-weight: 500;
  }
  #partner_mainbody {
    background-color: ${Colors.white};
    flex-direction: column;
    flex: 1;
    border-radius: 10px;
    #pm_filter_result {
      flex: 1;
      flex-grow: 4;
      flex-direction: column;
      #pmfr_pagination_wrap {
        /* width:300px;
            height:40px; */
      }
    }
    #pm_filter {
      padding: 20px;
      flex-direction: column;
      flex: 1;
      #pmf_title {
        font-size: ${Texts.size.huge};
        line-height: ${Texts.size.huge};
        color: ${Colors.black};
        margin-bottom: 10px;
        font-weight: 500;
      }
      #pmf_1 {
        align-items: flex-end;
        justify-content: space-between;
        #pmf1_left {
          flex: 0.6;
          justify-content: space-between;
          .pmf1l_block {
            flex-direction: column;
            flex: 1;
            &:first-child {
              margin-right: 30px;
            }
          }
        }
        #pmf1_right {
          flex: 0.3;
        }
      }
      #pmf_2 {
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 30px;
        #pmf2_left {
          flex: 0.6;
          #pmf2l_block {
            flex-direction: column;
            flex: 1;
          }
        }
        #pmf2_right {
          flex: 0.3;
        }
      }
      .pmfr_action {
        button {
          margin-top: 20px;
          border-radius: 5px;
          background-color: ${Colors.orange};
          box-shadow: none;
          color: ${Colors.white};
          font-size: ${Texts.size.large};
          border: solid 1px ${Colors.orange};
          padding: 10px 40px;
          &:hover {
            background-color: ${Colors.orange1};
            box-shadow: 0 3px 6px 1px rgba(255, 159, 91, 0.2);
          }
          &:disabled {
            background-color: ${Colors.orange2};
            color: ${Colors.orange3};
            box-shadow: none;
            cursor: not-allowed;
          }
        }
      }
      .pmf_label {
        font-size: ${Texts.size.large};
        line-height: ${Texts.size.large};
        color: ${Colors.black};
        margin-bottom: 10px;
      }
      input {
        flex: 1;
        padding: 10px;
        border: solid 1px ${Colors.black9};
        border-radius: 5px;
        &::placeholder {
          color: ${Colors.black3};
          font-style: italic;
        }
      }
    }
  }
`);
