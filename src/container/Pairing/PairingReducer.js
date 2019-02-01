import { ADD_NEW_MATRIX, MAP_MEMBERS_TO_TABLE } from "./PairingActions"

const initialState = {
    data: [],
    columns: [{
        dataIndex: 'name'
    }],
    rows: []
}

function test(data) {
    console.log(data);
    console.log("asdasbdkajsbdlkas");
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
        default:
            return state;
    }
}

export default (pairings);