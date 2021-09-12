import React from 'react'

function AssetTableHead() {
    return(
        <thead>
            <tr>
                <th></th>
                <th className="px-4">Symbol</th>
                <th className="px-4">Name</th>
                <th className="px-4">Current Price</th>
                <th className="px-4">% change (24H)</th>
            </tr>
        </thead>
    )
}

export default AssetTableHead;