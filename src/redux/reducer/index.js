import { combineReducers } from "redux";

import selectedItemInContentList from "./SelectedItemInContentList.reducer.js";
import stepActualPosition from "./StepActualPosition.js";
import stepChangeConditions from "./StepChangeConditions.reducer.js";
import stepForm from "./StepForm.reducer.js";
import stepResponse from "./StepResponse.reducer.js";

const reducers = combineReducers({
    selectedItemInContentList,
    stepForm,
    stepChangeConditions,
    stepResponse,
    stepActualPosition,
});

export { reducers };