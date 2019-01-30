import { reducer as forms } from 'redux-form';
import { combineReducers } from "redux";
import { connect } from "react-redux";
import { COLLAPSE_APP } from "./AppActions";
import pairings from "../Pairing/PairingReducer";

const initialState = {
    collapsed: true
}

function collapseApp(state = initialState, action) {
    switch (action.type) {
        case COLLAPSE_APP:
            return {
                ...state,
                collapsed: false
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    collapseApp,
    pairings,
    form: forms
});

export default rootReducer;