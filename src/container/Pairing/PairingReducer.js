import { ADD_NEW_MATRIX, MAP_MEMBERS_TO_TABLE, MAP_PAIRS_TO_TABLE } from "./PairingActions"

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

function getSecondPair(data) {
    return typeof data[1] != 'undefined' ? data[1].name : '';
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
                columns: [...state.columns, {
                    title: action.data.name
                }],
                rows: [...state.rows, action.data]
            };
        case MAP_PAIRS_TO_TABLE:
            return {
                ...state,
                pairingRows: [...state.pairingRows, {
                    name: action.data[0].name,
                    name1: getSecondPair(action.data)
                }]
            }
        default:
            return state;
    }
}

export default (pairings);