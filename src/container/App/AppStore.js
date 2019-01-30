import { createStore } from "redux";
import rootReducer from "./AppReducer";

const AppStore = createStore(rootReducer);
export default AppStore;