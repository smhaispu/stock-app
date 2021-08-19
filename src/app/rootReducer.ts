import { combineReducers } from 'redux';
import TableReducer from '../Components/Table.reducer';


const rootReducer = combineReducers({
    tableData: TableReducer,
});

export default rootReducer;