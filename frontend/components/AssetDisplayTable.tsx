import React, { useState, useEffect } from 'react'
import DisplayRow from './DisplayRow'

function AssetDisplayTable() {
    return (
        <table class="table-auto">
            <thead>
                <tr>
                    <th></th>
                    <th>Symbol</th>
                    <th>Price</th>
                </tr>
            </thead>
            <DisplayRow symbol="cbt"/>
            <DisplayRow symbol="aapl"/>
            <DisplayRow symbol="nvda"/>
        </table>
    )
}

export default AssetDisplayTable