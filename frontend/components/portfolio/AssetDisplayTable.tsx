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
    stocks: [string]
}

function AssetDisplayTable(props: DisplayTableProps) {
    const [assets, setAssets] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${props.user}/stocks`).then((response) => {
            const data = response.data as UserResponse
            console.log("Getting assets")
            setAssets(data.stocks)
        })
    },  [props.user]);

    return (
        <table className="table-auto">
            <AssetTableHead/>

            <tbody>
                {assets.map((asset, idx) => {
                    return <DisplayRow symbol={asset} key={idx}/>
                })}
            </tbody>
        </table>

    )
}

export default AssetDisplayTable