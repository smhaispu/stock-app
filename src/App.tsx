import React from 'react';
import Table from'./Components/Table'
import Header from './Components/Header'
import './App.css';
import {useSelector} from 'react-redux'
import { IRootState } from './Components/Table.model';
import Loader from './Utils/Loader'
function App() {
  const isLoading = useSelector((state:{tableData:IRootState}) => state.tableData.isLoading)
  return (
    <div className="App">
        <Header/>
        {isLoading && <Loader/>}
        {!isLoading && <Table/>}
    </div>
  );
}

export default App;
