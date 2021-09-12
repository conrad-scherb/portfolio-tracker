import React, { useState, useEffect } from 'react'
import axios from 'axios'
import roundTo from 'round-to'
import { StockJSON } from "./AssetDisplayTable"

interface DisplayRowProps {
    asset: StockJSON
}

interface QuoteResponse {
    companyName: string
    changePercent: number
    latestPrice: number
}

function roundAndAddTrailing(num: number) {
    return parseFloat(roundTo(num, 2).toString()).toFixed(2);
}

function DisplayRow(props: DisplayRowProps) {
    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");
    const [percentChange, setPercentChange] = useState(0)

    useEffect(() => {
        axios.get("http://localhost:8080/stock/quote/" + props.asset.symbol).then((response) => {
            const data = response.data as QuoteResponse
            setPrice(data.latestPrice)
            setName(data.companyName)
            setPercentChange(data.changePercent)
        })
    }), [props.asset.symbol];

    return (
        <tr className="h-20">
            <td className="text-center">    {/* Image */}
                <img 
                    className="transform w-20 scale-75"
                    src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${props.asset.symbol.toUpperCase()}.png`}
                />
            </td>
            <td className="text-center">
                {`${name} (${props.asset.symbol.toUpperCase()})`}
            </td>
            <td> {/* Number Owned*/}
                {props.asset.numberHeld}
            </td>
            <td> {/* Avg Cost */}
                {props.asset.costBasis}
            </td>
            <td className="text-center">  {/* Current Price */}
                {"$" + roundAndAddTrailing(price)}
            </td>
            <td> {/* Current Value */}
                {"$" + roundAndAddTrailing(price*props.asset.numberHeld)}
            </td>
            <td className="text-center"> {/* Daily change */}
                <b className={percentChange == 0 ? "text-black" : (percentChange > 0 ? "text-green-500" : "text-red-500")}>
                    {roundAndAddTrailing(percentChange*100) + "%"}
                </b>
            </td>
            <td> {/* Total Return */}
                <b className={price == props.asset.costBasis  ? "text-black" 
                                : (price > props.asset.costBasis ? "text-green-500" : "text-red-500")}>
                    {"$" + roundAndAddTrailing(price*props.asset.numberHeld-props.asset.costBasis*props.asset.numberHeld) 
                        + ` (${roundAndAddTrailing((price/props.asset.costBasis-1)*100)}%)`}
                </b>
            </td>
        </tr>
    )
}

export default DisplayRow