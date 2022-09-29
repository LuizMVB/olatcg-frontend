import { actionTypes } from "../constants/actionTypes";

const initialState = {};

export default function StepResponseReducer(state = initialState, action){
    switch(action.type){
        case actionTypes.SET_STEP_RESPONSE:
            return action.payload;
        case actionTypes.RETURN_STEP_RESPONSE_TO_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}