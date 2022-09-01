import { combineReducers, createStore } from "redux";

import PedingRequests from "./reducer/PendingRequests.reducer.js";
import SelectedItemInContentList from "./reducer/SelectedItemInContentList.reducer.js";

const rootReducer = combineReducers({
    PedingRequests: PedingRequests,
    SelectedItemInContentList: SelectedItemInContentList
});

const store = createStore(rootReducer);

export default store;