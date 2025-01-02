import {createContext, useContext, useState} from 'react'
import {InputsContext} from "./InputsContext";
export const TableContext  = createContext()
export const TableState = (props) => {

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [marketPrice, setMarketPrice] = useState(0)
  const [sumCallOi, setSumCallOi ] = useState(0)
  const [sumCallOiChg, setSumCallOiChg] = useState(0)
  const [sumCallVol, setSumCallVol] = useState(0)
  const [sumPutOi, setSumPutOi ] = useState(0)
  const [sumPutOiChg, setSumPutOiChg] = useState(0)
  const [sumPutVol, setSumPutVol] = useState(0)
  const fetchRows = async (index, expiry, rowCount) => {
    try {
      console.log("fetching..")
      const url = "http://127.0.0.1:5002/api/getChain";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            index: index,
            expiry: expiry,
            rows: rowCount
        })
      });
      const finalResponse = await response.json();
      setRows(finalResponse.rows);
      console.log(finalResponse.trueValue)
      setMarketPrice(finalResponse.marketPrice)
      await setSumCallOi(finalResponse.sumCallOi)
      await setSumPutOi(finalResponse.sumPutOi)
      await setSumCallVol(finalResponse.sumCallVol)
      await setSumPutVol(finalResponse.sumPutVol)
      await setSumCallOiChg(finalResponse.sumCallOiChg)
      await setSumPutOiChg(finalResponse.sumPutOiChg)
      console.log("fetched")
    } catch (error) {
      console.error("Error fetching rows:", error);
    } finally {
      setIsLoading(false);
    }
  };


    return <TableContext.Provider value={{ sumCallOi, sumCallVol, sumCallOiChg,sumPutOi, sumPutVol, sumPutOiChg,
      rows, isLoading, marketPrice, fetchRows}}>
        {props.children}
    </TableContext.Provider>
}
