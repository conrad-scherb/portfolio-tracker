import React from 'react'

function AssetTableHead() {
    return(
        <thead>
            <tr>
                <th></th>
                <th className="px-4">Holding</th>
                <th className="px-4"># Owned</th>
                <th className="px-4">Avg Cost</th>
                <th className="px-4">Current Price</th>
                <th className="px-4">Current Value</th>
                <th className="px-4">% change (24H)</th>
                <th className="px-4">Total Return</th>
            </tr>
        </thead>
    )
}

export default AssetTableHead;