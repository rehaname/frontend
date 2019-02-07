import { createStore, applyMiddleware } from "redux";
import rootReducer from "./AppReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const AppStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default AppStore;