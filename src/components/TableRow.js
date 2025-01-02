import React from "react";

export const TableRow = ({ row, marketPrice }) => {
  const getColorScheme = (type) => {
    if (type === "call") {
      if ( parseFloat(marketPrice) < parseFloat(row.strike)) {
        // console.log(marketPrice, row.strike)
        return "call-td-otm";
      } else {
        // console.log(marketPrice, row.strike)
        return "call-td-itm";
      }
    } else if (type === "put") {
      if (parseFloat(marketPrice) < parseFloat(row.strike)) {
        return "put-td-otm";
      } else {
        return "put-td-itm";
      }
    } else if (type === "strike") {
      return "strike-td";
    }
    return ""; // Default fallback class
  };

  const callClass = getColorScheme("call");
  const putClass = getColorScheme("put");
  const strikeClass = getColorScheme("strike");

  return (
    <tr style={{fontSize: "10px"}}>
      <td className={callClass}>{row.calls.oi}</td>
      <td className={callClass}>{row.calls.oiChng}</td>
      <td className={callClass}>{row.calls.vol}</td>
      <td className={callClass}>{row.calls.IV}</td>
      <td className={callClass}>{row.calls.ltp}</td>
      <td className={callClass}>{row.calls.chg}</td>
      <td className={callClass}>{row.calls.bid}</td>
      <td className={callClass}>{row.calls.bid}</td>
      <td className={callClass}>{row.calls.ask}</td>
      <td className={callClass}>{row.calls.askQty}</td>
      <td className={strikeClass}>{row.strike}</td>
      <td className={putClass}>{row.puts.bidQty}</td>
      <td className={putClass}>{row.puts.bid}</td>
      <td className={putClass}>{row.puts.ask}</td>
      <td className={putClass}>{row.puts.askQty}</td>
      <td className={putClass}>{row.puts.chg}</td>
      <td className={putClass}>{row.puts.ltp}</td>
      <td className={putClass}>{row.puts.IV}</td>
      <td className={putClass}>{row.puts.vol}</td>
      <td className={putClass}>{row.puts.oiChng}</td>
      <td className={putClass}>{row.puts.oi}</td>
    </tr>
  );
};
