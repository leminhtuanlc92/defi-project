import React, { memo, useState, useEffect } from 'react'
import styled from 'styled-components'
import i18n from 'i18n-js'
import Swal from 'sweetalert2'
import LumiBlock from 'components/MainBody/staking/lumiBlock'
import Loading from 'components/common/loading'
import Colors from 'constants/Colors'
import Texts from 'constants/Texts'
const convertImg = require('assets/images/convert.svg')
export default () => {
    const [earned, setEarned] = useState(0)
    const [loading, setLoading] = useState(false)
    const getLumi = (value: number) => {
        try {
            // TODO handle it
        } catch (error) {
            console.log('error')
            Swal.fire({
                title: i18n.t('error'),
                text: error.message ? error.message : error,
                icon: 'error',
                confirmButtonText: 'ok'
            })
        }
    }
    useEffect(() => {
        if (loading) {
            Swal.fire({
                title: i18n.t('processing'),
                icon: 'warning',
                confirmButtonText: 'ok',
                willOpen: () => {
                    Swal.showLoading()
                }
            })
        }
        else {
            Swal.close()
        }
    }, [loading])
    return (
        <GetLumiWrap>
            <div className="gl_input">
                <LumiBlock value={earned} type="earned" />
                <div className="gli_icon">
                    <img src={convertImg} alt="" />
                </div>
                {/* TODO calculate lumi value */}
                <LumiBlock value={earned * 1} type="lumi" />
                <div className="gl_btn">
                    <button onClick={() => getLumi(earned * 1)}                    >
                        {loading ?
                            <Loading size={20} color={Colors.white} />
                            :
                            <span>{i18n.t("getLumi")}</span>
                        }
                    </button>
                </div>
            </div>
        </GetLumiWrap>
    )
}
const GetLumiWrap = memo(styled.div`
    margin-bottom:3rem;
    .gl_input{
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        @media (min-width: 1600px) {
            width: 70%;
        }
        @media (min-width: 1200px) and (max-width:1599px) {
            width: 80%;
        }
        @media (min-width: 992px) and (max-width:1199px) {
            width: 90%;
        }
        @media (max-width: 991px) {
            width: 100%;
        }
        @media (max-width: 500px) {
            display: block;
        }
        .gli_icon {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0 2rem;
            @media (max-width: 767px) {
            margin: 0 1rem;
            }
            @media (max-width: 500px) {
            flex-direction: row-reverse;
            margin: 1rem 0;
            }
            span {
            color: ${Colors.black};
            }
            img {
            width: 35px;
            height: 35px;
            @media (max-width: 767px) {
                width: 20px;
                height: 20px;
            }
            @media (max-width: 500px) {
                transform: rotate(90deg);
                margin-right: 0.5rem;
            }
            }
        }
        .gl_btn {
            margin-left: 2rem;
            @media (max-width: 767px) {
                margin-left: 1rem;
            }
            @media (max-width: 500px) {
                margin: 1rem 0 0 0;
            }
            button {
                border-radius: 5px;
                background-color: ${Colors.orange};
                box-shadow: none;
                color: ${Colors.white};
                font-size: ${Texts.size.large};
                min-width: 100px;
                height: 37px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                @media (max-width: 500px) {
                    margin: 0 auto;
                }
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
`)