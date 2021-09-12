import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AssetTableHead from './AssetTableHead';
import DisplayRow from './DisplayRow'

interface DisplayTableProps {
    user: string
}

interface UserResponse {
    id: string
    authUID: string
    stocks: [StockJSON]
}

export interface StockJSON {
    numberHeld: number
    symbol: string
    costBasis: number
}

function AssetDisplayTable(props: DisplayTableProps) {
    const [assets, setAssets] = useState<StockJSON[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${props.user}/stocks`).then((response) => {
            const data = response.data as UserResponse
            console.log(data.stocks)
            setAssets(data.stocks)
        })
    },  [props.user]);

    return (
        <table className="table-auto">
            <AssetTableHead/>

            <tbody>
                {assets.map((asset, idx) => {
                    return <DisplayRow asset={asset} key={idx}/>
                })}
            </tbody>
        </table>

    )
}

export default AssetDisplayTable