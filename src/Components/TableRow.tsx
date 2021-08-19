import { ListChildComponentProps } from "react-window";
//Row component takes data and returns an table row component.
const Row = ({index ,style,data}:ListChildComponentProps) => {
    const trade = data[index];
  return <div key ={index} className="row" style={style} >
      <div className="row-cell">{trade[0]}</div>
      <div className="row-cell">{trade[1]}</div>
      <div className="row-cell">{trade[2]}</div>
  </div>
  }

  export default Row;