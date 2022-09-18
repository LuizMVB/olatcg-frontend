import { combineReducers } from "redux";

import pendingRequests from "./PendingRequests.reducer.js";
import selectedItemInContentList from "./SelectedItemInContentList.reducer.js";
import stepActualPosition from "./StepActualPosition.js";
import stepChangeConditions from "./StepChangeConditions.reducer.js";
import stepForm from "./StepForm.reducer.js";
import stepResponse from "./StepResponse.reducer.js";

const reducers = combineReducers({
    pendingRequests,
    selectedItemInContentList,
    stepForm,
    stepChangeConditions,
    stepResponse,
    stepActualPosition,
});

export { reducers };