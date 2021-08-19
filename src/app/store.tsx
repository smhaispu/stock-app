import { createStore, applyMiddleware  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../Components/Table.effect'
import {loadState,saveState} from '../Utils/localStorage'

const persistedState = loadState();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,persistedState,composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga)
store.subscribe(() => {
    saveState({
      tableData: store.getState().tableData
    });
  });
export default store;