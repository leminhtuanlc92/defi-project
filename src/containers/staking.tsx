import React, { useContext, useEffect, useState } from "react";
import StakingComp from "components/MainBody/staking";
import { TronContract } from "contexts/tronWeb";
import * as Config from "../config";
export default () => {
  const { isConnect } = useContext(TronContract);
  const [contract, setContract] = useState({
    lumi: undefined,
    staking: undefined,
  });
  const getContract = async () => {
    const [lumi, staking] = await Promise.all([
      (window as any).tronWeb.contract().at(Config.contract.lumiAddress),
      (window as any).tronWeb.contract().at(Config.contract.stakingAddress),
    ]);
    setContract({
      lumi,
      staking,
    });
  };
  useEffect(() => {
    if (isConnect) {
      getContract();
    }
  }, [isConnect]);
  return <StakingComp contract={contract} />;
};
