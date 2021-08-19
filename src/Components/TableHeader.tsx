
interface ItableData{
    headerData :Array<string>,
    type:'buy' | 'sell'
}

const TableHeader  = ({headerData,type}:ItableData): JSX.Element => {
    return <div>
        <div className={`table-header table-header-${type}`}>{
            headerData.map((key, index) => {
                return <div className="header-cell" key={index}>{key.toUpperCase()}</div>
            })
            }</div>
    </div>

}


  export default TableHeader;