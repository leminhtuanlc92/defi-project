import React, { useEffect } from "react";
interface ClickOutsideProps {
    children: any;
    handleClickOutSide: (event?: any) => void;
    style?: any;
}
export default ({ children, handleClickOutSide, style }: ClickOutsideProps) => {
    let wrapperRef = {} as any
    const setWrapperRef = (node: any) => {
        wrapperRef = node;
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClick)
        document.addEventListener('touchstart', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
            document.removeEventListener('touchstart', handleClick)
        }
    }, [wrapperRef]);

    const handleClick = (event: any) => {
        if (wrapperRef && !wrapperRef.contains(event.target)) {
            handleClickOutSide(event)
        }
    }
    return <div ref={setWrapperRef} style={style}>
        {children}
    </div>;
}
