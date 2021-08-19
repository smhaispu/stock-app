//Middleware for redux.
//Redux saga is used.
//It uses eventChannel to get the websocket data
import { eventChannel } from 'redux-saga';
import { all, call, put, take } from 'redux-saga/effects'
import store from '../app/store';
import _ from 'underscore';


function initWebsocket() {
    return eventChannel(emitter => {
        let ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
        let throttleVal = store?.getState()?.tableData?.throttle ? 3000 : 100;
        var throttledEmitter = _.throttle(emitter, throttleVal);
        ws.onopen = () => {
            console.log('opening...')
            store.dispatch({ type: 'SET_LOADING', payload: true });
            ws.send('hello server')
        }
        ws.onerror = (error) => {
            console.log('WebSocket error ' + error)
            console.dir(error)
        }
        ws.onopen = () => {
            ws.send(JSON.stringify(
                {
                    "event": "subscribe",
                    "channel": "book",
                    "symbol": "tBTCUSD"
                }))

        }

        ws.onmessage = (e) => {
            let msg = null;
            try {
                msg = JSON.parse(e.data)
            } catch (e) {
                console.error(`Error parsing : ${e.data}`)
            }
            if (msg && !msg['event']) {
                const oldBuyData = store?.getState().tableData.buy;
                const oldSellData = store.getState().tableData.sell;

                let buy: Array<Array<number>> = [];
                let sell: Array<Array<number>> = [];
                if (oldBuyData.length > 1 && msg[1] && msg[1][2] && msg[1][2] > 0 && msg[1][1] > 0) {
                    buy.push([...msg[1], e.timeStamp]);
                    throttledEmitter({ type: 'ADD_TO_BUY', payload: buy });
                } else if (oldSellData.length > 1 && msg[1][1] > 0) {
                    sell.push([...msg[1], e.timeStamp]);
                    throttledEmitter({ type: 'ADD_TO_SELL', payload: sell });
                } else if (msg.length && msg.length > 0 && typeof msg[1] === 'object') {
                    msg[1].forEach((trade: Array<number>, index: number) => {
                        if (trade[2] > 0 && trade[1] > 0) {
                            buy.push([...trade, e.timeStamp + index]);
                        } else if (trade[1] > 0) {
                            sell.push([...trade, e.timeStamp + index]);
                        }
                    })


                    if (buy.length) {
                        emitter({ type: 'ADD_TO_BUY', payload: buy })
                    }
                    if (sell.length) {
                        emitter({ type: 'ADD_TO_SELL', payload: sell })
                    }
                    store.dispatch({ type: 'SET_LOADING', payload: false });
                }



            }
        }

        // unsubscribe function
        return () => {
            console.log('Socket off')
        }
    })
}
function* wsSagas(): any {
    const channel = yield call(initWebsocket)
    while (true) {
        const action = yield take(channel)
        yield put(action)
    }
}


export default function* rootSaga() {
    yield all([
        wsSagas()
    ])
}