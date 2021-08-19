
import { tTableActions } from './Table.actions';
import {IRootState} from './Table.model'


const INITIAL_STATE:IRootState = {
    buy: [],
    sell: [],
    throttle: false,
    isLoading:true
};

const reducer = (state = INITIAL_STATE, action:tTableActions) => {

    switch (action.type) {

        case 'ADD_TO_BUY':
          const buyArr = state.buy.length ? [...state.buy,...action.payload] : [...action.payload];
           return {

             ...state, buy: [...buyArr],

           };

        case 'ADD_TO_SELL':
          const sellArr = state.sell.length ? [...state.sell,...action.payload] : [...action.payload];
        
           return {
              ...state, sell: [...sellArr],

           };


        case 'ADD_THROTTLE':
           return {
             ...state,
             throttle :action.payload
           }

        case 'SET_LOADING':
          return {
            ...state,
            isLoading:action.payload
          }

         default: return state;

    }

};

export default reducer;