import { actionTypes } from "../constants/actionTypes";

const INITIAL_STATE = {previous: true, next: true};

export default function StepChangeConditionsReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case actionTypes.SET_PREVIOUS_CONDITION:
            return {previous: action.payload, next: state.next}
        case actionTypes.SET_NEXT_CONDITION:
            return {previous: state.previous, next: action.payload};
        case actionTypes.RETURN_TO_STEP_CHANGE_CONDITIONS_INITIAL_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}