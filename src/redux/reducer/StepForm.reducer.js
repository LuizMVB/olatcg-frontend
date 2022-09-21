import { actionTypes } from "../constants/actionTypes";

const initialState = {};

export default function StepFormReducer(state = initialState, action){
    switch(action.type){
        case actionTypes.ADD_STEP_FORM_FIELD:
            return {...state, ...action.payload};
        case actionTypes.SET_STEP_FORM:
            return action.payload;
        case actionTypes.UPDATE_STEP_FORM:
            return Object.assign(state, action.payload);
        case actionTypes.RETURN_TO_STEP_FORM_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}