import React, { useEffect, useReducer, useRef } from "react";
import i18n from "i18n-js";
import SiteLocale from "../language";
import Loading from '../components/common/loading'
i18n.fallbacks = false;
i18n.translations = SiteLocale;
i18n.missingTranslationPrefix = "miss: ";
const initState = {
  aside: true,
  baseCurrency: "usd",
  isLoading: true,
  locale: "en",
  horizontalView: window.innerWidth > window.innerHeight
};
const initSiteContext = {
  siteState: initState,
  changeLocale: (locale: string) => {},
  toggleAside: (aside: boolean) => {},
  checkScreen: (value: boolean)=>{}
};
const SiteContext = React.createContext(initSiteContext);
export default ({ children }: any) => {
  const initSiteState = (state: any) => state;
  const isInit = useRef(true);
  const siteReducer = (preState: any, action: any) => {
    switch (action.type) {
      case "init": {
        return action.initState;
      }
      case "changeLocale": {
        return { ...preState, locale: action.locale };
      }
      case "toggleAside": {
        return { ...preState, aside: action.aside };
      }
      case "checkScreen": {
        return { ...preState, horizontalView: action.horizontalView };
      }
      default:
        return preState;
    }
  };
  const [siteState, dispatchSite] = useReducer(
    siteReducer,
    initState,
    initSiteState
  );
  const initConfig = async () => {
    const lastState = localStorage.getItem("siteState");
    let preState = initState;
    if (lastState !== null) {
      preState = JSON.parse(lastState);
    }
    if (!!preState) {
      i18n.locale = preState.locale;
      localStorage.setItem(
        "siteState",
        JSON.stringify({ ...siteState, locale: preState.locale })
      );
      dispatchSite({
        type: "init",
        initState: { ...preState, isLoading: false },
      });
    } else {
      i18n.locale = initState.locale;
      localStorage.setItem(
        "siteState",
        JSON.stringify({ ...siteState, locale: initState.locale })
      );
      dispatchSite({
        type: "init",
        initState: { ...initState, isLoading: false },
      });
    }
    isInit.current = false;
  };
  const changeLocale = (locale: string) => {
    i18n.locale = locale;
    localStorage.setItem("siteState", JSON.stringify({ ...siteState, locale }));
    dispatchSite({
      locale,
      type: "changeLocale",
    });
  };
  const toggleAside = (aside: boolean) => {
    localStorage.setItem("siteState", JSON.stringify({ ...siteState, aside }));
    dispatchSite({
      aside: aside,
      type: "toggleAside",
    });
  };

  const checkScreen = (value) => {
    dispatchSite({
      horizontalView: value,
      type: "checkScreen",
    });
  };
  useEffect(() => {
    initConfig();
    const handleResize = () => {
      if (window.innerWidth < 992) {
        if (window.innerWidth > window.innerHeight) {
          checkScreen(true)
        }
        else {
          checkScreen(false)
        }
      }
    }
    window.addEventListener('resize', () => handleResize());
    return () => {
      window.removeEventListener('resize', () => handleResize());
    }
  }, []);
  // console.log('site', siteState)
  return (
    <SiteContext.Provider
      value={{
        siteState,
        changeLocale,
        toggleAside,
        checkScreen
      }}
    >
      {siteState.isLoading ? <Loading/> : children}
    </SiteContext.Provider>
  );
};
export { SiteContext };
