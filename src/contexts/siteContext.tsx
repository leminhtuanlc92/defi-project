import React, { useEffect, useReducer, useRef } from "react";
import i18n from 'i18n-js'
import SiteLocale from '../language'
i18n.fallbacks = false;
i18n.translations = SiteLocale;
i18n.missingTranslationPrefix = "miss: ";
const initState = {
    isLoading: true,
    locale: 'en',
    baseCurrency: "usd",
    aside: true
}
const initSiteContext = {
    siteState: initState,
    changeLocale: (locale: string) => { }
}
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
            default:
                return preState;
        }
    }
    const [siteState, dispatchSite] = useReducer(
        siteReducer,
        initState,
        initSiteState
    );
    const initConfig = async () => {
        const lastState = localStorage.getItem('siteState')
        let preState = initState
        if (lastState !== null) {
            preState = JSON.parse(lastState)
        }
        if (!!preState) {
            // console.log('here', preState.locale)
            i18n.locale = preState.locale;
            localStorage.setItem('siteState', JSON.stringify({ ...siteState, locale: preState.locale }))
            dispatchSite({
                type: "init",
                initState: { ...preState, isLoading: false }
            });
        } else {
            i18n.locale = initState.locale;
            localStorage.setItem('siteState', JSON.stringify({ ...siteState, locale: initState.locale }))
            dispatchSite({
                type: "init",
                initState: { ...initState, isLoading: false }
            });
        }

        isInit.current = false;
    };
    const changeLocale = (locale: string) => {
        i18n.locale = locale;
        localStorage.setItem('siteState', JSON.stringify({ ...siteState, locale }))
        dispatchSite({
            locale,
            type: "changeLocale"
        });
    };
    useEffect(() => {
        initConfig();
    }, []);
    return (
        <SiteContext.Provider
            value={{
                siteState,
                changeLocale
            }}
        >
            {siteState.isLoading ? <div>...</div> : children}
        </SiteContext.Provider>
    )
}
export { SiteContext };