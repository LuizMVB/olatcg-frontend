import { combineReducers, createStore } from "redux";

import pedingRequests from "./reducer/pendingRequests.reducer.js";

const rootReducer = combineReducers({
    pedingRequests: pedingRequests,
});

const store = createStore(rootReducer);

export default store;