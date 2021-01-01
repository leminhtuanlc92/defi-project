import React, { memo, useState, Fragment, useContext, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import i18n from "i18n-js";
import Select from "../../common/core/Select";
import ClickOutside from "../../../utils/clickOutSide";
import { TronContract } from "../../../contexts/tronWeb";
import Loading from "../../common/loading";
import { toast } from "react-toastify";
import { SiteContext } from "../../../contexts/siteContext";
const closeImg = require("../../../assets/images/close.png");
const checkImg = require("../../../assets/images/ic-green-check.png");
const upgradeSuccess = require("../../../assets/images/upgrade-successful.svg");
const backImg = require("../../../assets/images/white-back.png");
interface PopUpgradeProps {
  showPop: boolean;
  setShowPop: any;
}

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

export default ({ showPop, setShowPop }: PopUpgradeProps) => {
  const {
    siteState: { horizontalView },
  } = useContext(SiteContext);
  const [step, setStep] = useState(1);
  const [currentSelect, setCurrentSelect] = useState({ title: "", value: 0 });
  const [loading, setLoading] = useState(false);
  let dataSelect = [] as Array<any>;

  const {
    matrixMarketing,
    ref,
    usdt,
    address,
    userData,
    refConfirm,
  } = useContext(TronContract);
  const pricePackage = [0, 15, 45, 90, 180, 240, 420, 600, 900];
  const getAmountUpgrade = (currentLevel: any, upgradeLevel: any) => {
    let total = 0;
    let detail = [] as any;
    for (let i = currentLevel + 1; i <= upgradeLevel; i++) {
      total += pricePackage[i];
      detail.push({
        level: i,
        price: pricePackage[i],
      });
    }
    return {
      total,
      detail,
    };
  };
  const [level, setLevel] = useState(0);
  for (let i = 0; i <= 8; i++) {
    if (i > level) {
      dataSelect.push({ value: i, title: `${i18n.t("level")} ${i}` });
    }
  }
  useEffect(() => {
    userData
      .getLevel(address)
      .call()
      .then((data: any) => {
        setLevel(Number(data));
      });
  }, []);

  const [detail, setDetail] = useState({
    total: 0,
    detail: [],
  });
  useEffect(() => {
    if (currentSelect.value > 0) {
      setDetail(getAmountUpgrade(level as any, currentSelect.value) as any);
    }
  }, [currentSelect]);

  //Upgrade funtion
  const upgrade = async (upgradeLevel: number) => {
    try {
      let trueRef = ref;
      if (ref === null && refConfirm === true) {
        trueRef = address;
      }
      let result = await matrixMarketing
        .upgradePackage(upgradeLevel, trueRef)
        .send({
          callValue: 0,
          feeLimit: 4e7,
          shouldPollResponse: true,
        });
      setLoading(false);
      setStep(2);
    } catch (error) {
      console.log("Upgrade Error", error);
      toast.error(i18n.t(error.message), { position: "top-center" });
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setLoading(true);
    upgrade(currentSelect.value);
  };

  return (
    <PopUpgradeWrap horizontalView={horizontalView}>
      <ClickOutside
        handleClickOutSide={() => {
          setShowPop(false);
          step === 2 && setStep(1);
        }}
      >
        <div id="pop-upgrade-content">
          <div id="pop-upgrade-content-inner">
            <span id="pop-upgrade-title">{i18n.t("upgradeAccount")}</span>
            <span id="pop-upgrade-quote">{i18n.t("upgradeAccountquote")}</span>
            <div id="pop-upgrade-main">
              <div id="pum_inner">
                <div id="pumi_wrap">
                  <div id="pum_step">
                    <PumStep1 step={step}>
                      <div className="p-u-m-icon">
                        <img src={checkImg} alt="" />
                      </div>
                      <span className="pum-title">{i18n.t("approveUsdt")}</span>
                    </PumStep1>
                    <PumDivider step={step}>
                      <div></div>
                    </PumDivider>
                    <PumStep2 step={step}>
                      <div className="p-u-m-icon">
                        {step === 2 ? (
                          <img src={checkImg} alt="" />
                        ) : (
                          <span className="pum-">2</span>
                        )}
                      </div>
                      <span className="pum-title">
                        {i18n.t("upgradePackage")}
                      </span>
                    </PumStep2>
                  </div>
                  <div id="pum_current_lv">
                    <div id="pumclv_inner">
                      {step === 1 ? (
                        <Fragment>
                          <div id="pumclvi_lv">
                            <span>{i18n.t("currentLevel")}:</span>
                            <span>{level}</span>
                          </div>
                          <div id="pumclvilv_upgrade">
                            <span id="pumclvilvu_title">
                              {i18n.t("levelUpgrade")}:
                            </span>
                            <div id="pumcl_select">
                              <Select
                                listSelect={dataSelect}
                                action={setCurrentSelect}
                                defaultSelect={i18n.t("selectUpdate")}
                                currentSelect={currentSelect}
                              />
                            </div>
                          </div>
                          {detail.total > 0 ? (
                            <div id="pumclvi_purchase">
                              <div id="pumclvip_amount">
                                <span>{i18n.t("purchaseAmount")}</span>
                                <span>{detail.total} USDT</span>
                              </div>
                              {detail.detail.map((item: any, index: any) => (
                                <div
                                  id="pumclvip_cal1"
                                  key={`detail-level-${index}`}
                                >
                                  <span>
                                    {i18n.t("level")} {item.level} -{" "}
                                    {LevelLabel[item.level]}
                                  </span>
                                  <span>{item.price} USDT</span>
                                </div>
                              ))}
                            </div>
                          ) : null}
                          <div id="pumclvi_button">
                            <div id="pumclvib_inner">
                              <button
                                onClick={() => !loading && handleConfirm()}
                                disabled={!(currentSelect.title !== "")}
                              >
                                {loading ? (
                                  <Loading color={Colors.white} size={20} />
                                ) : (
                                  i18n.t("confirm")
                                )}
                              </button>
                            </div>
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <div id="pumclvi_success">
                            <img src={upgradeSuccess} alt="" />
                          </div>
                          <div id="pumclvi_quote">
                            <span>{i18n.t("upgradeSuccessQuote1")}</span>
                            <span>{i18n.t("upgradeSuccessQuote2")}</span>
                          </div>
                          <div id="pumclvi_button">
                            <div id="pumclvib_inner">
                              <button
                                onClick={() => {
                                  setShowPop(false);
                                  setStep(1);
                                }}
                              >
                                <img src={backImg} alt="" />{" "}
                                {i18n.t("backToDashboard")}
                              </button>
                            </div>
                          </div>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="pop-upgrade-close-button"
            onClick={() => {
              setShowPop(!showPop);
              step === 2 && setStep(1);
            }}
          >
            <img src={closeImg} alt="" />
          </div>
        </div>
      </ClickOutside>
    </PopUpgradeWrap>
  );
};

const PopUpgradeWrap = memo(styled.div`
  position: fixed;
  display: flex;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: rgba(34, 34, 34, 0.8);
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  > div {
    width: 60%;
    /* height: 70%; */
    @media (min-width: 768px) and (max-width: 1199px) {
      width: 80%;
      height: 70%;
    }
    @media (max-width: 991px) {
      width: 100%;
      max-height: 100%;
      ${(props: any) =>
        props.horizontalView &&
        css`
          height: 100%;
        `}
    }
  }
  #pop-upgrade-content {
    flex: 1;
    background: ${Colors.white};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    padding: 40px 50px;
    align-items: center;
    justify-content: center;
    position: relative;
    @media (max-width: 991px) {
      padding: 20px;
    }
    #pop-upgrade-content-inner {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      #pop-upgrade-title {
        font-size: ${Texts.size.extra};
        line-height: ${Texts.size.extra};
        color: ${Colors.green};
      }
      #pop-upgrade-quote {
        font-size: ${Texts.size.large};
        line-height: ${Texts.size.larger};
        color: ${Colors.black};
        text-align: center;
      }
      #pop-upgrade-main {
        margin-top: 30px;
        width: 95%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media (max-width: 991px) {
          margin-top: 20px;
        }
        @media (max-width: 399px) {
          margin-top: 10px;
        }
        #pum_inner {
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          #pumi_wrap {
            display: block;
            background: ${Colors.white4};
            border-radius: 10px;
            padding: 20px;
            width: calc(100% - 40px);
            @media (max-width: 991px) {
              padding: 10px;
              width: calc(100% - 20px);
            }
            #pum_step {
              display: flex;
              align-items: flex-start;
              justify-content: center;
              margin-bottom: 30px;
              width: calc(100% - 40px);
              position: relative;
              left: 50%;
              transform: translate(-50%, 0);
              @media (max-width: 991px) {
                margin-bottom: 10px;
                width: calc(100% - 20px);
              }
              div {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img {
                  width: 20px;
                  object-fit: contain;
                }
              }
              .p-u-m-icon {
                width: 40px;
                height: 40px;
              }
            }
            #pum_current_lv {
              flex: 1;
              width: 80%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              border: solid 1px ${Colors.green};
              border-radius: 5px;
              position: relative;
              left: 50%;
              transform: translate(-50%, 0);
              @media (max-width: 991px) {
                width: 90%;
                display: block;
                height: 90%;
                padding: 0;
              }
              #pumclv_inner {
                padding: 5%;
                width: 90%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                #pumclvi_lv {
                  justify-content: space-between;
                  align-items: center;
                  display: flex;
                  margin-bottom: 20px;
                  span {
                    font-size: ${Texts.size.large};
                    line-height: ${Texts.size.large};
                    color: ${Colors.black};
                    &:first-child {
                      text-transform: uppercase;
                    }
                  }
                }
                #pumclvilv_upgrade {
                  display: flex;
                  flex-direction: column;
                  margin-bottom: 20px;
                  #pumclvilvu_title {
                    font-size: ${Texts.size.large};
                    line-height: ${Texts.size.large};
                    color: ${Colors.black};
                    text-transform: uppercase;
                  }
                  #pumcl_select {
                    width: 100%;
                    margin-top: 10px;
                    > div {
                      width: 100%;
                    }
                  }
                }
                #pumclvi_purchase {
                  #pumclvip_amount {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    span {
                      font-size: ${Texts.size.large};
                      line-height: ${Texts.size.large};
                      color: ${Colors.black};
                      &:first-child {
                        text-transform: uppercase;
                      }
                      &:nth-child(2) {
                        font-weight: 700;
                      }
                    }
                  }
                  #pumclvip_cal1 {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 5px;
                    span {
                      &:first-child {
                        font-size: ${Texts.size.normal};
                        line-height: ${Texts.size.normal};
                        color: ${Colors.black};
                      }
                      &:nth-child(2) {
                        font-size: ${Texts.size.large};
                        line-height: ${Texts.size.large};
                        color: ${Colors.black};
                      }
                    }
                  }
                  #pumclvip_cal2 {
                    margin-bottom: 5px;
                    span {
                      &:first-child {
                        font-size: ${Texts.size.normal};
                        line-height: ${Texts.size.normal};
                        color: ${Colors.black};
                      }
                      &:nth-child(1) {
                        font-size: ${Texts.size.large};
                        line-height: ${Texts.size.large};
                        color: ${Colors.black};
                      }
                    }
                  }
                }
                #pumclvi_button {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  #pumclvib_inner {
                    width: 60%;
                    justify-content: center;
                    button {
                      width: 100%;
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
                }
                #pumclvi_success {
                  display: flex;
                  justify-content: center;
                  margin: 10px 0;
                }
                #pumclvi_quote {
                  margin: 10px 0 20px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  span {
                    font-size: ${Texts.size.large};
                    line-height: ${Texts.size.large};
                    color: ${Colors.black8};
                  }
                }
                #pumclvi_button {
                  button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  #pop-upgrade-close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
`);
const PumDivider = memo(styled.div`
  width: 10%;
  height: 40px;
  div {
    width: 100%;
    height: 5px;
    ${(props: any) =>
      props.step === 2
        ? css`
            background-color: ${Colors.orange};
          `
        : css`
            background-color: ${Colors.green3};
          `}
    margin: 0 2%;
  }
  margin: 0 20px 10px 20px;
`);
const PumStep1 = memo(styled.div`
  width: 25%;
  .p-u-m-icon {
    border-radius: 50%;
    background-color: ${Colors.orange};
    margin-bottom: 5px;
    span {
      color: ${Colors.orange};
    }
  }
  .pum-title {
    font-size: ${Texts.size.normal};
    line-height: ${Texts.size.large};
    text-transform: uppercase;
    color: ${Colors.orange};
    text-align: center;
  }
`);
const PumStep2 = memo(styled.div`
  width: 25%;
  .p-u-m-icon {
    border-radius: 50%;
    margin-bottom: 5px;
    ${(props: any) =>
      props.step === 2
        ? css`
            background-color: ${Colors.orange};
            span {
              color: ${Colors.orange};
            }
          `
        : css`
            background-color: ${Colors.green};
            span {
              color: ${Colors.green3};
            }
          `}
  }
  .pum-title {
    font-size: ${Texts.size.normal};
    line-height: ${Texts.size.large};
    text-transform: uppercase;
    text-align: center;
    ${(props: any) =>
      props.step === 2
        ? css`
            color: ${Colors.orange};
          `
        : css`
            color: ${Colors.green3};
          `}
  }
`);
