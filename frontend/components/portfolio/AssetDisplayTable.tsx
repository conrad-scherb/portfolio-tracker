import React, { useState, useEffect } from 'react'
import AssetTableHead from './AssetTableHead';
import DisplayRow from './DisplayRow'

function AssetDisplayTable() {
    const [assets, setAssets] = useState(["aapl"]);

    return (
        <table className="table-auto">
            <AssetTableHead/>
            
            {assets.map((asset) => {
                return <DisplayRow symbol={asset}/>
            })}
        </table>

    )
}

export default AssetDisplayTable