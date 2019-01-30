import { ADD_NEW_MATRIX } from "./PairingActions"

const initialState = {
    data: []
}

function pairings(state = initialState, action) {
    switch (action.type) {
        case ADD_NEW_MATRIX:
            return {
                ...state,
                data: [...state.data, action.data]
            };
        default:
            return state;
    }
}

export default (pairings);