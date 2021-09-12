import React, { useState, useEffect } from 'react'
import axios from 'axios'
import roundTo from 'round-to'

interface DisplayRowProps {
    symbol: string
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
        axios.get("http://localhost:8080/stock/quote/" + props.symbol).then((response) => {
            const data = response.data as QuoteResponse
            setPrice(data.latestPrice)
            setName(data.companyName)
            setPercentChange(data.changePercent)
        })
    }), [props.symbol];

    return (
        <tr className="h-20">
            <td className="text-center">
                <img 
                    className="transform w-20 scale-75"
                    src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${props.symbol.toUpperCase()}.png`}
                />
            </td>
            <td className="text-center">
                {props.symbol.toUpperCase()}
            </td>
            <td>
                {name}
            </td>
            <td className="text-center">
                {"$" + roundAndAddTrailing(price)}
            </td>
            <td className="text-center">
                <b className={percentChange == 0 ? "text-black" : (percentChange > 0 ? "text-green-500" : "text-red-500")}>
                    {roundAndAddTrailing(percentChange*100) + "%"}
                </b>
            </td>
        </tr>
    )
}

export default DisplayRow