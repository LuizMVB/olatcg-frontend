import { combineReducers, createStore } from "redux";

import PendingRequests from "./reducer/PendingRequests.reducer.js";
import SelectedItemInContentList from "./reducer/SelectedItemInContentList.reducer.js";
import StepChangeConditionsReducer from "./reducer/StepChangeConditions.reducer.js";
import StepFormReducer from "./reducer/StepForm.reducer.js";
import StepRequestReducer from "./reducer/StepRequest.reducer.js";

const rootReducer = combineReducers({
    pendingRequests: PendingRequests,
    selectedItemInContentList: SelectedItemInContentList,
    stepForm: StepFormReducer,
    stepChangeConditions: StepChangeConditionsReducer,
    stepRequest: StepRequestReducer,
});

const store = createStore(rootReducer);

export default store;