import React, { memo, useState, useContext, useEffect, Suspense } from "react";
import styled, { css } from "styled-components/macro";
import Colors from "../../../constants/Colors";
import Texts from "../../../constants/Texts";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "../../../App";
import i18n from "i18n-js";
import Pagination from "../../../components/common/core/Pagination";
import Loading from "../../../components/common/loading";
import SearchResult from "./searchResult";
interface PartnerSearchListProps {
  data: any;
  loading: boolean;
}
export default ({ data, loading }: PartnerSearchListProps) => {
  return (
    <PartnerSearchListWrap>
      <div id="partner_search_list_header">
        <div className="psl_number">
          <span>{i18n.t("noNumber")}</span>
        </div>
        <div className="psl_username">
          <span>{i18n.t("username")}</span>
        </div>
        <div className="psl_address">
          <span>{i18n.t("address")}</span>
        </div>
        <div className="psl_level">
          <span>{i18n.t("level")}</span>
        </div>
        <div className="psl_sponsor">
          <span>{i18n.t("sponsor")}</span>
        </div>
      </div>
      <div id="partner_search_list_body">
        <Router history={history}>
          <Suspense fallback={<Loading />}></Suspense>
          <Switch>
            <Route
              path="/partners"
              render={(props) => (
                <SearchResult {...props} data={data} loading={loading} />
              )}
            />
          </Switch>
        </Router>
      </div>
    </PartnerSearchListWrap>
  );
};
const PartnerSearchListWrap = memo(styled.div`
  flex: 1;
  flex-direction: column;
  margin-bottom:20px;
  #partner_search_list_header {
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px;
    border-bottom: solid 1px ${Colors.black};
    span {
      font-size: ${Texts.size.large};
      line-height: ${Texts.size.large};
      color: ${Colors.black};
      font-weight: 500;
    }
  }
  #partner_search_list_body {
    flex: 0.08;
    flex-grow: 9;
    overflow-y: scroll;
  }
  .psl_number {
    flex: 0.1;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 5px 0 0;
  }
  .psl_username {
    flex: 0.2;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
  }
  .psl_address {
    flex: 0.3;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
  }
  .psl_level {
    flex: 0.1;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
  }
  .psl_sponsor {
    flex: 0.2;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
  }
  .psl_partners {
    flex: 0.2;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    padding: 0 0 0 5px;
  }
`);
