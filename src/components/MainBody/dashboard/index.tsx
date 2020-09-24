import React, { memo, useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import InfoBlock from "./infoBlocks";
import OfficeBlocks from "./officeBlocks";
import PopUpgrade from "./popUpgrade";
import { TronContract } from "../../../contexts/tronWeb";
import { contract } from "../../../config";
import Loading from "../../common/loading";
import { toast } from "react-toastify";
import { SiteContext } from "../../../contexts/siteContext";
const closeImg = require("../../../assets/images/close.png");
// const confirmImg = require("../../../assets/images/confirm-ref.svg");
const confirmImg1 = require("../../../assets/images/confirm.svg");
export default () => {
  const [showPop, setShowPop] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    siteState: { horizontalView },
  } = useContext(SiteContext);
  const {
    usdt,
    address,
    userData,
    token,
    matrixMember,
    matrixMarketing,
    fund,
  } = useContext(TronContract);

  const [userInfo, setUserInfo] = useState([
    { category: "totalReceive", value: 0 },
    { category: "stockRightBalance", value: 0 },
    { category: "fine", value: 0 },
    { category: "level", value: "" },
    { category: "shareHolding", value: 0 },
  ]);
  const LevelLabel = [
    "Not Active",
    "Immigrant",
    "Visa Holder",
    "Permanent Resident",
    "Citizen",
    "Ambassador",
    "Senator",
    "Vice President",
    "President",
  ];
  useEffect(() => {
    const getData = async () => {
      //TODO get Data
      const [data, tokenBalance, totalReceived] = await Promise.all([
        userData.users(address).call(),
        token.balanceOf(address).call(),
        fund.totalReceived(address).call(),
      ]);
      setUserInfo([
        {
          category: "totalReceive",
          value: Math.floor(Number(totalReceived) / 10 ** 6),
        },
        {
          category: "stockRightBalance",
          value: Math.floor(Number(data.stockRight) / 10 ** 6),
        },
        { category: "fine", value: Math.floor(Number(data.fine) / 10 ** 6) },
        { category: "level", value: LevelLabel[Number(data.level)] },
        {
          category: "shareHolding",
          value: Math.floor(Number(tokenBalance) / 10 ** 6),
        },
      ]);
    };
    getData();
  }, [userData, token]);

  const [userBranch, setUserBranch] = useState([
    { level: 1, time: 0, user: 0 },
    { level: 2, time: 0, user: 0 },
    { level: 3, time: 0, user: 0 },
    { level: 4, time: 0, user: 0 },
    { level: 5, time: 0, user: 0 },
    { level: 6, time: 0, user: 0 },
    { level: 8, time: 0, user: 0 },
    { level: 8, time: 0, user: 0 },
  ] as any);
  useEffect(() => {
    const getBranch = async () => {
      const branch = await matrixMember.getUserBranch(address).call();
      let branchInfo = [] as any;
      branch.timeAvaiable.map((item: any, index: any) => {
        branchInfo.push({
          level: index + 1,
          time: item * 1000,
          user: Number(branch.totalUsers[index]),
        });
      });
      setUserBranch(branchInfo);
    };
    getBranch();
  }, [matrixMember]);

  const [approve, setApprove] = useState(true);
  const [showPopApprove, setShowPopApprove] = useState(false);
  useEffect(() => {
    const checkApprove = async () => {
      let remaining = (
        await usdt.allowance(address, contract.matrixMarketingAddress).call()
      ).remaining;
      if (Number(remaining) > 10 ** 10) {
        setApprove(true);
      } else {
        setApprove(false);
      }
    };
    checkApprove();
  }, []);

  const approveUSDT = async () => {
    setLoading(true);
    try {
      await usdt.approve(contract.fundAddress, 10 ** 15).send({
        callValue: 0,
        feeLimit: 1e7,
        shouldPollResponse: false,
      });
      setLoading(false);
      toast.success(i18n.t("approveUsdtSuccess"), { position: "top-center" });
      setApprove(true);
      setShowPopApprove(false);
    } catch (error) {
      console.log("Approve USDT fail", error);
      setLoading(false);
      toast.error(i18n.t(error.message), { position: "top-center" });
    }
  };
  return (
    <DashboardWrap horizontalView={horizontalView}>
      <Hana>
        <div id="db_personal_info_panel">
          <span id="db_info_title">{i18n.t("personalInfo")}</span>
          <div id="db_blocks">
            {userInfo.map((item, index) => {
              return (
                <InfoBlock item={item} key={index} length={userInfo.length} />
              );
            })}
          </div>
        </div>
        <div id="db-back-office">
          <div id="db_back_office_top">
            <span id="db-back-office-title">{i18n.t("backOffice")}</span>
            <button
              onClick={() => {
                if (approve) {
                  setShowPop(true);
                } else {
                  setShowPopApprove(true);
                }
              }}
            >
              {i18n.t("upgrade")}
            </button>
          </div>

          <div id="db_blocks-office">
            {userBranch.map((item: any, index: any) => {
              return <OfficeBlocks item={item} key={index} />;
            })}
          </div>
        </div>
        {showPop ? (
          <PopUpgrade showPop={showPop} setShowPop={setShowPop} />
        ) : null}
      </Hana>
      {showPopApprove ? (
        <div id="confirm-pop">
          <div id="pop-content">
            <div id="pc_inner">
              <img src={confirmImg1} alt="" />
              <span id="pop-content-confirm-usdt-quote">
                {i18n.t("popConfirmUsdtquote")}
              </span>
              <div id="pop-confirm-usdt-buttons">
                <button
                  id="refuse-button"
                  onClick={() => setShowPopApprove(false)}
                >
                  {i18n.t("no")}
                </button>
                <button
                  id="confirm-button"
                  onClick={() => !loading && approveUSDT()}
                >
                  {loading ? (
                    <Loading color={Colors.white} size={20} />
                  ) : (
                    i18n.t("yes")
                  )}
                </button>
              </div>
              <div id="close-button" onClick={() => setShowPopApprove(false)}>
                <img src={closeImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </DashboardWrap>
  );
};

const DashboardWrap = memo(styled.div`
  flex: 1;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  padding:2rem;
  background:${Colors.white};
  border-radius:10px;
  @media (max-width:991px){
    padding:1rem;
  }
  #db_personal_info_panel {
    flex-direction: column;
    width: 100%;
    margin-bottom: 50px;
    #db_info_title {
      font-size: ${Texts.size.huge};
      line-height: ${Texts.size.huge};
      color: ${Colors.black};
      margin-bottom: 10px;
      font-weight: 500;
    }
    #db_blocks {
      width: 100%;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
  #db-back-office {
    flex-direction: column;
    width: 100%;
    flex: 1;
    #db_back_office_top {
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      #db-back-office-title {
        font-size: ${Texts.size.huge};
        line-height: ${Texts.size.huge};
        color: ${Colors.black};
        font-weight: 500;
      }
      button {
        border-radius: 5px;
        background-color: ${Colors.orange};
        box-shadow: none;
        color: ${Colors.white};
        font-size: ${Texts.size.large};
        border: none;
        padding: 15px 40px;
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
    #db_blocks-office {
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
  }
  #confirm-pop {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    background-color: rgba(34, 34, 34, 0.8);
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    #pop-content {
      min-width: 60%;
      min-height: 50%;
      background: ${Colors.white};
      border-radius: 15px;
      flex-direction: column;
      padding: 20px 40px;
      align-items: center;
      justify-content: center;
      position: relative;
      #pc_inner {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        flex-direction: column;
        align-items: center;
        img {
          max-width: 400px;
          margin-bottom: 40px;
        }
        #pop-content-confirm-usdt-quote {
          color: ${Colors.black1};
          font-size: ${Texts.size.large};
          line-height: ${Texts.size.large};
          margin-bottom: 40px;
          text-align: center;
          @media (max-width: 767px) {
            ${(props: any) =>
              props.horizontalView
                ? css`
                    margin-bottom: 15px;
                  `
                : css`
                    margin-bottom: 30px;
                  `}
          }
        }
        #close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          cursor: pointer;
        }
        #pop-confirm-usdt-buttons {
          align-items: center;
          justify-content: center;
          width: 80%;
          button {
            width: 40%;
            margin: 5px 10px;
            padding: 20px 0;
            border-radius: 5px;
            box-shadow: none;
            color: ${Colors.white};
            font-size: ${Texts.size.large};
            text-transform: uppercase;
            border: none;
            &#confirm-button {
              background-color: ${Colors.orange};
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
            &#refuse-button {
              background-color: ${Colors.black6};
              &:hover {
                background-color: ${Colors.black3};
                box-shadow: 0 3px 6px 1px rgba(0, 0, 0, 0.16);
              }
              &:disabled {
                background-color: ${Colors.black4};
                color: ${Colors.black7};
                box-shadow: none;
                cursor: not-allowed;
              }
            }
            @media (max-width: 767px) {
              padding: 10px 0;
            }
          }
        }
        @media (max-width: 767px) {
          ${(props: any) =>
            props.horizontalView
              ? css`
                  height: 90%;
                  padding: 10px 20px;
                  img {
                    max-width: 250px;
                    margin-bottom: 15px;
                  }
                `
              : css`
                  height: auto;
                  width: calc(90% - 40px);
                  padding: 20px;
                `}
        }
      }
    }
  }
`);
const Hana = memo(styled.div`
  /* background-color: orange; */
  flex-direction: column;
  flex: 1;
  border-radius: 10px;
`);
