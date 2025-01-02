import React, {useContext} from "react";
import {TableContext} from '../contexts/TableContext.js'
export const FinalRow = () => {
  const {sumCallOi, sumCallVol, sumCallOiChg,sumPutOi, sumPutVol, sumPutOiChg} = useContext(TableContext)
  return (
      <tr style={{fontSize: "10px"}}>
        <td>{sumCallOi}</td>
        <td>{sumCallOiChg}</td>
        <td>{sumCallVol}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>{sumPutVol}</td>
        <td>{sumPutOiChg}</td>
        <td>{sumPutOi}</td>
      </tr>
  );
};
