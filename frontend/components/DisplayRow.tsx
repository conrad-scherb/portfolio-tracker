import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface DisplayRowProps {
    symbol: string
}

function DisplayRow(props: DisplayRowProps) {
    const [price, setPrice] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8080/stock/delayedprice/" + props.symbol).then((response) => {
            setPrice(response.data)
        })
    });

    return (
        <tr>
            <td>
                <img src={`https://storage.googleapis.com/iex/api/logos/${props.symbol.toUpperCase()}.png`}/>
            </td>
            <td>
                {props.symbol.toUpperCase()}
            </td>
            <td>
                {price}
            </td>
        </tr>
    )
}

export default DisplayRow