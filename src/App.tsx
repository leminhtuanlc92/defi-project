import React from "react";
import "./App.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import SiteContextWrapper from "./contexts/siteContext";
import Body from "../src/components/common/body";
import GlobalStyle from "../src/components/common/globalStyle";
import TronContract from "./contexts/tronWeb";
const history = createBrowserHistory();

export default () => {
  return (
    <SiteContextWrapper>
      <TronContract>
        <Router history={history}>
          <GlobalStyle />
          <Body />
        </Router>
      </TronContract>
    </SiteContextWrapper>
  );
};
export { history };
