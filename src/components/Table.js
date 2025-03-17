import React, {useEffect, useContext} from "react";
import {TableRow} from "./TableRow.js";
import {FinalRow} from "./FinalRow.js";
import {TableContext} from '../contexts/TableContext.js'
import {InputsContext} from '../contexts/InputsContext.js'

export const Table = () => {
    const {dropState, inputsState, getOptions, requestState} = useContext(InputsContext)
    const {fetchRows, rows, marketPrice, isLoading} = useContext(TableContext)
    useEffect(() => {
        console.log("hshfsd", inputsState["expiry-drop"], inputsState["rows-count"])
        const run = setInterval(() => {
            console.log("fetching with ", requestState["oc-symbol"], requestState["expiry-drop"], requestState["rows-count"], requestState["checkbox"])
            fetchRows(requestState["oc-symbol"], requestState["expiry-drop"], requestState["rows-count"], requestState["checkbox"])
        }, 2000)
        return () => clearInterval(run)
    }, [requestState])
    useEffect(() => {
        console.log(rows)
    }, [rows])
// Render loading message if data is still being fetched
    if (isLoading) {
        return <div>Loading...</div>;
    }

// Render table if data is available
    return (<div
        className="table-section"
        style={{overflowY: "auto", height: "80vh", width: "96.3vw"}}
    >
        {/* Sticky Div for CALLS and PUTS */}
        <div
            className="tableHeading flex"
            style={{
                backgroundColor: "#3b2c7d",
                width: "90vw",
                marginLeft: "5vw",
                height: "5vh",
                position: "sticky",
                top: 0,
                zIndex: 2,
            }}
        >
            <div className="heading1" style={{width: "45vw", color: "white"}}>
                <h1>CALLS</h1>
            </div>
            <div className="heading2" style={{width: "39vw", color: "white"}}>
                <h1>PUTS</h1>
            </div>
        </div>
        <table
            className="table-auto border-collapse border border-gray-200"
            style={{width: "90vw", marginLeft: "5vw"}}
        >
            <thead
                style={{
                    color: "white",
                    backgroundColor: "#3b2c7d",
                    position: "sticky",
                    top: "5vh",
                    zIndex: 1,
                    fontSize: "13px",
                }}
            >
            <tr>
                <th className="px-2 py-4 border-b">OI</th>
                <th className="px-2 py-4 border-b">Chng in OI</th>
                <th className="px-2 py-4 border-b">Volume</th>
                <th className="px-2 py-4 border-b">IV</th>
                <th className="px-2 py-4 border-b">LTP</th>
                <th className="px-2 py-4 border-b">CHNG</th>
                <th className="px-2 py-4 border-b">Bid Qty</th>
                <th className="px-2 py-4 border-b">Bid</th>
                <th className="px-2 py-4 border-b">Ask</th>
                <th className="px-2 py-4 border-b">Ask Qty</th>
                <th className="px-2 py-4 border-b">Strike Price</th>
                <th className="px-2 py-4 border-b">Synthetic</th>
                <th className="px-2 py-4 border-b">Bid Qty</th>
                <th className="px-2 py-4 border-b">Bid</th>
                <th className="px-2 py-4 border-b">Ask</th>
                <th className="px-2 py-4 border-b">Ask Qty</th>
                <th className="px-2 py-4 border-b">CHNG</th>
                <th className="px-2 py-4 border-b">LTP</th>
                <th className="px-2 py-4 border-b">IV</th>
                <th className="px-2 py-4 border-b">VOLUME</th>
                <th className="px-2 py-4 border-b">CHNG IN OI</th>
                <th className="px-2 py-4 border-b">OI</th>
            </tr>
            </thead>
            <tbody>
            {rows.map((e, idx) => (<TableRow key={idx} row={e} marketPrice={marketPrice}/>))}
            <FinalRow/>
            </tbody>
        </table>
    </div>);
};
