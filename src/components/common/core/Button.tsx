import React from 'react'
import i18n from "i18n-js";
interface ButtonProps {
    text: string;
    style?: any;
    raw?: boolean;
    action: () => void;
    disabled?: boolean
}
export default ({ text, style, raw, action, disabled = false }: ButtonProps) => {
    return (
        <button style={{...style, }} onClick={() => action()} disabled={disabled}>
            {raw ? text : i18n.t(text)}
        </button>
    )
}

//on Hold