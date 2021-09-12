import React, { useState, useEffect } from 'react'
import AssetTableHead from './AssetTableHead';
import DisplayRow from './DisplayRow'

function AssetDisplayTable() {
    const [assets, setAssets] = useState(["aapl", "tqqq", "team"]);

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