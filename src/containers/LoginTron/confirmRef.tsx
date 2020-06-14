import React, { memo, Fragment, useState, useContext, useEffect } from "react";
import styled from "styled-components/macro";
import Colors from "../../constants/Colors";
import Texts from "../../constants/Texts";
import i18n from "i18n-js";
import { TronContract } from "../../contexts/tronWeb";
import Language from "../../components/common/core/Language";
const confirmImg = require("../../assets/images/confirm-ref.svg");
const defiImg = require("../../assets/images/icon-defi.png");
interface ConfirmProps {
  confirm: any;
}
export default ({ confirm }: ConfirmProps) => {
  const { ref, member } = useContext(TronContract);
  const [username, setUsername] = useState("Not set");
  useEffect(() => {
    if (ref && member) {
      member
        .getUser(ref)
        .call()
        .then((user: any) => {
          setUsername(user?.userId === "" ? "Not set" : user?.userId);
        });
    }
  }, [ref, member]);

  return (
    <ConfirmRefWrap>
      <Fragment>
        <div id="left_part">
          <img src={defiImg} alt="" />
          <img src={confirmImg} alt="" />
        </div>
        <div id="right-part">
          <div id="crwrp_lang">
            <Language />
          </div>
          {ref !== null ? (
            <div id="inner-right">
              <h4
                style={{
                  fontSize: Texts.size.extra,
                  lineHeight: Texts.size.extra,
                  color: Colors.green1,
                  textTransform: "uppercase",
                  marginBottom: "40px",
                  textAlign: "center",
                }}
              >
                {i18n.t("confirmrefInfo")}
              </h4>
              <div id="form-confirm">
                <div id="inner-form">
                  <div id="user-wrap">
                    <span
                      style={{
                        color: Colors.black1,
                        fontSize: Texts.size.large,
                        lineHeight: Texts.size.large,
                        marginBottom: "10px",
                      }}
                    >
                      {i18n.t("username")}:
                    </span>
                    <span
                      style={{
                        color: Colors.black,
                        fontSize: Texts.size.large,
                        lineHeight: Texts.size.large,
                      }}
                    >
                      {username}
                    </span>
                  </div>
                  <div id="addres-wrap">
                    <span
                      style={{
                        color: Colors.black1,
                        fontSize: Texts.size.large,
                        lineHeight: Texts.size.large,
                        marginBottom: "10px",
                      }}
                    >
                      {i18n.t("address")}:
                    </span>
                    <span
                      style={{
                        color: Colors.black,
                        fontSize: Texts.size.large,
                        lineHeight: Texts.size.large,
                      }}
                    >
                      {ref}
                    </span>
                  </div>
                  <button onClick={() => confirm(true)}>
                    {i18n.t("confirm")}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div id="inner-right">
              <h4
                style={{
                  fontSize: Texts.size.extra,
                  lineHeight: Texts.size.extra,
                  color: Colors.green1,
                  textTransform: "uppercase",
                  marginBottom: "40px",
                  textAlign: "center",
                }}
              >
                {i18n.t("refError")}
              </h4>
              <div id="form-confirm">
                <div id="inner-form">
                  <div id="user-wrap">
                    <span
                      style={{
                        color: Colors.black1,
                        fontSize: Texts.size.large,
                        lineHeight: Texts.size.large,
                        marginBottom: "10px",
                      }}
                    >
                      {i18n.t("refErrorMessage")}:
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Fragment>
    </ConfirmRefWrap>
  );
};

const ConfirmRefWrap = memo(styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
  #left_part {
    flex: 0.4;
    height: 100%;
    background-color: #b5ce9f;
    align-items: center;
    justify-content: center;
    position: relative;
    img {
      &:nth-child(1) {
        width: 10%;
        object-fit: contain;
        position: absolute;
        top: 30px;
        left: 30px;
      }
      &:nth-child(2) {
        object-fit: contain;
      }
    }
  }
  #right-part {
    flex: 0.6;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    #crwrp_lang {
      position: absolute;
      top: 30px;
      right: 30px;
      width: 100px;
      justify-content: flex-end;
    }
    #inner-right {
      max-width: 680px;
      min-width: 300px;
      width: 60%;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;
      #form-confirm {
        border: solid 1px ${Colors.green1};
        border-radius: 5px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        #inner-form {
          flex: 1;
          padding: 30px;
          flex-direction: column;
          align-items: center;
          > div {
            width: 100%;
            margin-bottom: 20px;
            flex-direction: column;
            > span {
              line-height: ${Texts.size.large};
            }
          }
          #user-wrap {
          }
          #addres-wrap {
          }
        }
        button {
          margin-top: 10px;
          padding: 10px 40px;
          border-radius: 5px;
          background-color: ${Colors.orange};
          box-shadow: none;
          color: ${Colors.white};
          font-size: ${Texts.size.large};
          text-transform: uppercase;
          border: none;
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
  }
  #confirm-pop {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    background-color: rgba(34, 34, 34, 0.8);
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
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
      img {
        max-width: 400px;
        margin-bottom: 40px;
      }
      #pop-content-confirm-usdt-quote {
        color: ${Colors.black1};
        font-size: ${Texts.size.large};
        line-height: ${Texts.size.large};
        margin-bottom: 40px;
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
        }
      }
    }
  }
  @media (max-width: 991px) {
    width: 100vw;
    height: 100vh;
  }
  @media (max-width: 767px) {
    #left_part {
      display: none;
    }
    #right-part {
      flex: 1;
    }
  }
`);
