import { ADD_NEW_MATRIX, MAP_MEMBERS_TO_TABLE, ADD_NEW_PAIR } from "./PairingActions"

const initialState = {
    data: [],
    columns: [{
        dataIndex: 'name'
    }],
    rows: [],
    pairingColumn: [{
        title: 'Pairs',
        colSpan: 2,
        dataIndex: 'name'
    }, {
        colSpan: 0,
        dataIndex: 'name1'
    }],
    pairingRows: []
}

function pairings(state = initialState, action) {
    switch (action.type) {
        case ADD_NEW_MATRIX:
            return {
                ...state,
                data: [...state.data, action.data]
            };
        case MAP_MEMBERS_TO_TABLE:
            return {
                ...state,
                columns: [...state.columns, action.data.column],
                rows: [...state.rows, action.data.row]
            };
        case ADD_NEW_PAIR:
            return {
                ...state,
                pairingRows: [...state.pairingRows, action.data]
            }
        default:
            return state;
    }
}

export default (pairings);