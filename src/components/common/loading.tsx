import React from 'react'
import i18n from 'i18n-js'
import Colors from '../../constants/Colors'
import Texts from '../../constants/Texts'
export default () => {
    return (
        <div>
            <span style={{ color: Colors.black, fontSize: Texts.size.large }}>{i18n.t('loading')}</span>
        </div>
    )
}