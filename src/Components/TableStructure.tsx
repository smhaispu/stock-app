//Reusable table structure component
import React from "react";
import { tableHeaderData } from "../Utils/Constants";
import TableHeader from "./TableHeader";
import Row from "./TableRow";
import { FixedSizeList as List} from 'react-window'

interface ITableStructure{
    data:Array<Array<Number>>,
    len:number,
    reference:any,
    type:'buy' | 'sell'
}
 const TableStructure = ({data,len,reference,type}:ITableStructure) =>( 
    <div className={`table table-${type}`}> 
    <TableHeader headerData={tableHeaderData} type={type}/>
    <div className={`table-body table-body-buy`}>
        <List
          className="List"
          height={500}
          itemCount={len}
          itemSize={35}
          width={'100%'}
          itemData={data}
          ref={reference}
        >
          {Row}
        </List>
    </div>
    </div>);

    export default React.memo(TableStructure)