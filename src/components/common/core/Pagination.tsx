import React, { memo, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import Texts from '../../../constants/Texts'
import Colors from '../../../constants/Colors'
const arrowImg = require('../../../assets/images/white-back.png')
interface PaginationProps {
    currentPage: number;
    url: string;
    totalPage: number;
    size: number;
    setPage: any
}

const Pagination = ({ currentPage, url, totalPage, size, setPage }: PaginationProps) => {
    return (
        <PaginationWrap size={size}>
            {currentPage > 1 ?
                <Link className="button" to={`${url}/${currentPage - 1}`} onClick={() => setPage(currentPage - 1)}>
                    <span className="prev"><img src={arrowImg} alt="" /></span>
                </Link>
                :
                ''
            }
            {currentPage > 3 ?
                <Fragment>
                    <Link className="item" to={`${url}`} onClick={() => setPage(1)}>
                        <span>1</span>
                    </Link>
                    {
                        currentPage !== 4 ?
                            <span className="item">...</span>
                            :
                            ''
                    }
                </Fragment>
                :
                ''
            }
            {
                currentPage - 3 > -1 ?
                    <Link className="item" to={`${url}/${currentPage - 2}`} onClick={() => setPage(currentPage - 2)}>
                        <span>{currentPage - 2}</span>
                    </Link>
                    :
                    ''
            }
            {
                currentPage - 2 > -1 ?
                    <Link className="item" to={`${url}/${currentPage - 1}`} onClick={() => setPage(currentPage - 1)}>
                        <span>{currentPage - 1}</span>
                    </Link>
                    :
                    ''
            }

            <div className="active">
                <span>{currentPage}</span>
            </div>

            {totalPage - currentPage > 0 ?
                <Link className="item" to={`${url}/${currentPage + 1}`} onClick={() => setPage(currentPage + 1)}>
                    <span>{currentPage + 1}</span>
                </Link>
                :
                ''
            }
            {totalPage - currentPage > 1 ?
                <Link className="item" to={`${url}/${currentPage + 2}`} onClick={() => setPage(currentPage + 2)}>
                    <span>{currentPage + 2}</span>
                </Link>
                :
                ''
            }
            {totalPage - currentPage > 2 ?
                <Fragment>
                    {currentPage !== 2 ?
                        <span className="item">...</span>
                        :
                        ''}
                    <Link className="item" to={`${url}/${totalPage}`} onClick={() => setPage(totalPage)}>
                        <span>{totalPage}</span>
                    </Link>
                </Fragment>
                :
                ''
            }
            {totalPage - currentPage > 0 ?
                <Link className="button" to={`${url}/${currentPage + 1}`} onClick={() => setPage(currentPage + 1)}>
                    <span className="next"><img src={arrowImg} alt="" /></span>
                </Link>
                :
                ''
            }
        </PaginationWrap>
    )
}
export default Pagination

const PaginationWrap = memo(styled.div`
    --size: ${(props: any) => props.size};
    flex:1;
    justify-content: center;
    align-items: center;
    .prev{}
    .next{
        img{
            transform:rotate(180deg);
        }
    }
    a{
        
        span{
            font-size: ${Texts.size.large};
            line-height: ${Texts.size.large};
            color: ${Colors.black};
            padding: 0 12px;
        }
    }
    .active{
        span{
            font-size: ${Texts.size.large};
            line-height: ${Texts.size.large};
            color: ${Colors.orange};
            font-weight:700;
            margin-bottom:10px;
        }
    }
    .button{
        span{
            padding:5px 8px;
            border-radius:5px;
            background-color:${Colors.orange4};
            align-items: center;
            justify-content: center;
            display: flex;
            img{
                width:15px;
            }
            &:hover{
                background-color:${Colors.orange};
            }
        }
    }
    /* div{
        width:calc(45px * var(--size));
        height:calc(45px * var(--size));
        line-height:calc(45px * var(--size));
        text-align:center;
        border-radius: 50%;
        position:relative;
        color:#5e2983;
        @media (min-width:992px) and (max-width:1400px){
            width: calc(30px * var(--size));
            height:calc(30px * var(--size));
            line-height:calc(30px * var(--size));
        }
        @media (max-width:991px){
            width: calc(25px * var(--size));
            height: calc(25px * var(--size));
            line-height: calc(25px * var(--size));
        }
        @media (max-width:767px){
            width: calc(20px * var(--size));
            height: calc(20px * var(--size));
            line-height: calc(20px * var(--size));
        }
        span{
            width:calc(45px * var(--size));
            height:calc(45px * var(--size));
            line-height:calc(45px * var(--size));
            display: inline-block;
            @media (min-width:992px) and (max-width:1400px){
                width: calc(30px * var(--size));
                height:calc(30px * var(--size));
                line-height:calc(30px * var(--size));
            }
            @media (max-width:991px){
                width: calc(25px * var(--size));
                height: calc(25px * var(--size));
                line-height: calc(25px * var(--size));
            }
            @media (max-width:767px){
                width: calc(20px * var(--size));
                height: calc(20px * var(--size));
                line-height: calc(20px * var(--size));
            }
        }
    }
    a{
        width:calc(45px * var(--size));
        height:calc(45px * var(--size));
        line-height:calc(45px * var(--size));
        text-align:center;
        color:#fff;
        @media (min-width:992px) and (max-width:1400px){
            width: calc(30px * var(--size));
            height:calc(30px * var(--size));
            line-height:calc(30px * var(--size));
        }
        @media (max-width:991px){
            width: calc(25px * var(--size));
            height: calc(25px * var(--size));
            line-height: calc(25px * var(--size));
        }
        @media (max-width:767px){
            width: calc(20px * var(--size));
            height: calc(20px * var(--size));
            line-height: calc(20px * var(--size));
        }
        &.button{
            position:relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width:calc(90px * var(--size));
            height:calc(40px * var(--size));
            border-radius:calc(40px * var(--size));
            transition:linear 0.2s;
            box-shadow:0 1.5px 0 0 #1c2245, 0 -1.5px 0 0 #1c2245, 1.5px 0 0 0 #1c2245, -1.5px 0 0 0 #1c2245, 1.5px -1.5px 0 0 #1c2245, -1.5px 1.5px 0 0 #1c2245, 1.5px 1.5px 0 0 #1c2245, -1.5px -1.5px 0 0 #1c2245;
            svg{
                margin-left:5px;
            }
            &:hover{
                box-shadow:0 1.5px 0 0 #5e2983, 0 -1.5px 0 0 #36204a, 1.5px 0 0 0 #5e2983, -1.5px 0 0 0 #36204a, 1.5px -1.5px 0 0 #5e2983, -1.5px 1.5px 0 0 #36204a, 1.5px 1.5px 0 0 #5e2983, -1.5px -1.5px 0 0 #36204a;
                color:#5e2983;
            }
            @media (min-width:992px) and (max-width:1400px){
                width: calc(70px * var(--size));
                height: calc(30px * var(--size));
                line-height:calc(30px * var(--size));
            }
            @media (max-width:991px){
                width: calc(60px * var(--size));
                height: calc(25px * var(--size));
                line-height: calc(25px * var(--size));
            }
            @media (max-width:767px){
                width: calc(60px * var(--size));
                height: calc(20px * var(--size));
                line-height: calc(20px * var(--size));
            }
        }
    } */
`)