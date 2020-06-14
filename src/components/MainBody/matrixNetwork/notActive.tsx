import React, { useContext, useEffect, useState } from "react";
import i18n from "i18n-js";
import { TronContract } from "../../../contexts/tronWeb";
const notLogImg = require("../../../assets/images/contact.svg");
export default ({ sponsor }) => {
  const { userData, member } = useContext(TronContract);
  const [info, setInfo] = useState({
    username: "",
    level: 0,
  });
  useEffect(() => {
    const getInfo = async () => {
      const [user, level] = await Promise.all([
        member.users(sponsor).call(),
        userData.getLevel(sponsor).call(),
      ]);

      setInfo({
        username: user.username,
        level: Number(level),
      });
    };
    if (sponsor !== "") {
      getInfo();
    }
  }, [sponsor]);
  return (
    <div id="matrixnetwork_mainbody_nolog">
      <div id="mtnmb_notlog_left">
        <span>OOPS!</span>
        <span>{i18n.t("matrixNotLogQuote1")}</span>
        <span>{i18n.t("matrixNotLogQuote2")}</span>
        <img src={notLogImg} alt="" />
      </div>
      <div id="mtnmb_notlog_right">
        <span>{i18n.t("refferalInfo")}</span>
        <div id="mtnmbnlr_inner">
          <div>
            <span>{i18n.t("username")}:</span>
            <span>{info.username === "" ? "Not set" : info.username}</span>
          </div>
          <div>
            <span>{i18n.t("level")}:</span>
            <span>{info.level}</span>
          </div>
          <div>
            <span>{i18n.t("address")}:</span>
            <span>{sponsor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
