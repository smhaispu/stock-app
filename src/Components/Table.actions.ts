//Actions defined for our redux Setup
interface IADD_BOOK {
    readonly type: 'ADD_TO_BUY',
    payload: Array<Array<number>>
}


interface IREMOVE_BOOK {
    readonly type: 'ADD_TO_SELL',
    payload: Array<Array<number>>
}

interface ADD_THROTTLE {
    readonly type: 'ADD_THROTTLE',
    payload: boolean
}

interface IFetchData {
    readonly type: 'FETCH_DATA'
}


export type tTableActions =
    | IADD_BOOK
    | IREMOVE_BOOK
    | IFetchData
    | ADD_THROTTLE
