import React from 'react'
import i18n from "i18n-js";
interface TextProps {
    text: string;
    weight?:
    | 'light'
    | 'normal'
    | 'medium'
    | 'bold';
    size?:
    | 'tiny'
    | 'small'
    | 'normal'
    | 'large'
    | 'larger'
    | 'huge'
    | 'extra';
    style?: any;
    raw?: boolean;
    textProps?: object
}
const sizeText = {
    tiny: '.72em',
    small: '.85em',
    normal: '1em',
    large: '1.16em',
    larger: '1.3em',
    huge: '1.43em',
    extra: '2em'
};
const weightText = {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700
};
export default ({ text, size = 'normal', weight = 'normal', style, raw, textProps }: TextProps) => {
    return (
        <span style={{ ...style, fontSize: sizeText[size], fontWeight: weightText[weight], lineHeight: sizeText[size], alignSelf: 'center' }}>
            {raw ? text : i18n.t(text, textProps || {})}
        </span>
    )
}

//on hold