import React, { memo, useState, useContext } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import Pagination from "../../../components/common/core/Pagination";
import PartnerSearchList from "./partnerSearchList";
import { TronContract } from "../../../contexts/tronWeb";
import WAValidator from "multicoin-address-validator";
import Select from "../../common/core/Select";
import Loading from "../../common/loading";
import { toast } from "react-toastify";
import { SiteContext } from "../../../contexts/siteContext";
export default () => {
  const { address } = useContext(TronContract);
  const { siteState: { horizontalView } } = useContext(SiteContext)
  const [startUser, setStartUser] = useState(address);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState({
    title: `${i18n.t("level")} 1`,
    value: "1",
  });
  const [page, setPage] = useState(1);
  const { matrixMember, member, userData } = useContext(TronContract);
  const [validAddress, setValidAddress] = useState(false);
  const [data, setData] = useState({
    total: 0,
    partnersList: [],
  });
  const validate = () => {
    let valid = WAValidator.validate(startUser, "trx");
    setValidAddress(valid);
  };
  const getPartners = async (_startUser, _level, _size, _page) => {
    setLoading(true);
    let isParent = await matrixMember.isParent(address, _startUser).call();
    if (!isParent) {
      toast.error(i18n.t("noPermission"), { position: "top-center" });
      return { partnersList: [], total: 0 };
    }
    try {
      let result = await matrixMember
        .getBranch(_startUser, _level - 1, _size, (_page - 1) * _size)
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
          level: Number(level),
          address: result.list[i],
          sponsor: partner.sponsor,
          parent: partner.parent,
          numberF1: partner.F1.filter((item) => item !== "").length,
        });
      }
      setData({
        total: result.total,
        partnersList,
      });
      setLoading(false);
      return {
        partnersList,
        total: result.total,
      };
    } catch (error) {
      console.log("get partner data fail", error);
      toast.error(i18n.t(error.message), { position: "top-center" });
      setLoading(false);
    }
  };
  return (
    <PartnerskWrap
      validAddress={validAddress}
      startUser={startUser}
      address={address}
      horizontalView={horizontalView}
    >
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
                <Select
                  listSelect={[
                    { title: `${i18n.t("level")} 1`, value: "1" },
                    { title: `${i18n.t("level")} 2`, value: "2" },
                    { title: `${i18n.t("level")} 3`, value: "3" },
                    { title: `${i18n.t("level")} 4`, value: "4" },
                    { title: `${i18n.t("level")} 5`, value: "5" },
                    { title: `${i18n.t("level")} 6`, value: "6" },
                    { title: `${i18n.t("level")} 7`, value: "7" },
                    { title: `${i18n.t("level")} 8`, value: "8" },
                  ]}
                  currentSelect={level}
                  action={setLevel}
                  defaultSelect={i18n.t("selectLevel")}
                />
              </div>
            </div>
            <div id="pmf1_right">
              <div className="pmfr_action">
                <button
                  disabled={
                    !(
                      (startUser !== address && validAddress) ||
                      startUser === address
                    )
                  }
                  onClick={() =>
                    !loading && getPartners(startUser, +level.value, 10, +page)
                  }
                >
                  {loading ? (
                    <Loading color={Colors.white} size={18} />
                  ) : (
                      i18n.t("filterV")
                    )}
                </button>
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
          <PartnerSearchList data={data} loading={loading} />
          {data.partnersList.length > 0 ? (
            <div id="pmfr_pagination_wrap">
              <Pagination
                currentPage={page}
                totalPage={1}
                size={8}
                url="/partners"
                setPage={setPage}
              />
            </div>
          ) : null}
        </div>
      </div>
    </PartnerskWrap>
  );
};

const PartnerskWrap = memo(styled.div`
  flex: 1;
  display:flex;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x:hidden;
  div{
    display:flex;
  }
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
        display:block;
      }
      #pmf_1 {
        align-items: flex-end;
        justify-content: space-between;
        #pmf1_left {
          flex: 0.6;
          justify-content: space-between;
          flex-wrap:wrap;
          .pmf1l_block {
            flex-direction: column;
            flex: 1;
            height: auto;
            width: 100%;
            flex-wrap:wrap;
            &:first-child {
              margin-right: 30px;
              @media (max-width: 767px) {
                margin-right: 0;
                margin-bottom: 15px;
              }
              input {
                ${(props: any) =>(props.startUser !== props.address && props.validAddress) ||props.startUser === props.address?
                 css`
                    border-color: ${Colors.black};
                  `: 
                  css`
                    border-color: ${Colors.red};
                  `
                }
              }
            }
          }
          @media (max-width: 767px) {
            flex: 1;
            width: 100%;
            ${(props:any)=>props.horizontalView && css`flex-direction: column;`}
          }
          @media (max-width: 480px) {
            flex-direction: column;
          }
        }
        #pmf1_right {
          flex: 0.3;
        }
        @media (max-width: 767px) {
          flex-direction: column;
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
          display: flex;
          justify-content: center;
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
