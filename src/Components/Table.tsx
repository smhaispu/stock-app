import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FixedSizeList} from 'react-window'
import TableStructure from './TableStructure'
import "./Table.scss"

function Table(): ReactElement {

const buy = useSelector((state:any) =>
  state.tableData.buy
);

const sell = useSelector((state:any) =>
  state.tableData.sell
);

const listRefSell = React.createRef<FixedSizeList>();
const listRefBuy = React.createRef<FixedSizeList>();

useEffect(()=>{
  listRefSell.current?.scrollToItem(sell.length -1 ,"end");
},[listRefSell,sell])
useEffect(()=>{
  listRefBuy.current?.scrollToItem(buy.length -1,"end");
},[listRefBuy,buy])

    return (
      <>
      <div className="container">
        <div className="buy-containter">
          <h1 className="box-header-buy">Buy</h1>
        <TableStructure type={'buy'} data={buy} len={buy.length} reference={listRefBuy}/>
        </div>
        <div className="sell-containter">
        <h1 className="box-header-sell">Sell</h1>
        <TableStructure  type={'sell'} data={sell} len={sell.length} reference={listRefSell}/>
        </div>
        
       
       </div>
      </>
    )
}

export default Table
