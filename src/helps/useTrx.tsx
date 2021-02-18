import { TronContract } from 'contexts/tronWeb'
import React, { useContext, useEffect, useState } from 'react'

const useTrx = () => {
    const { tronWeb, address } = useContext(TronContract)
    const [balanceTrx, setBalanceTrx] = useState(0)

    useEffect(() => {
        const getBalanceTrx = async () => {
            const trx = await tronWeb.trx.getBalance(address) || ''
            if (trx !== '') {
                setBalanceTrx(Number(trx))
            }
        }
        getBalanceTrx()

    }, [address, tronWeb])
    return balanceTrx
}

export default useTrx
