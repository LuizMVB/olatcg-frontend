import { combineReducers, createStore } from "redux";

import PendingRequests from "./reducer/PendingRequests.reducer.js";
import SelectedItemInContentList from "./reducer/SelectedItemInContentList.reducer.js";
import StepActualPosition from "./reducer/StepActualPosition.js";
import StepChangeConditionsReducer from "./reducer/StepChangeConditions.reducer.js";
import StepFormReducer from "./reducer/StepForm.reducer.js";
import StepResponseReducer from "./reducer/StepResponse.reducer.js";

const rootReducer = combineReducers({
    pendingRequests: PendingRequests,
    selectedItemInContentList: SelectedItemInContentList,
    stepForm: StepFormReducer,
    stepChangeConditions: StepChangeConditionsReducer,
    stepResponse: StepResponseReducer,
    stepActualPosition: StepActualPosition,
});

const store = createStore(rootReducer);

export default store;