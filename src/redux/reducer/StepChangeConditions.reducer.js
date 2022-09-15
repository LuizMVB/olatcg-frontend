const initialState = {previous: true, next: true};

export default function StepChangeConditionsReducer(state = initialState, action){
    switch(action.type){
        case 'SET_NEXT_CONDITION':
            return {previous: state.previous, next: action.payload};
        case 'SET_PREVIOUS_CONDITION':
            return {previous: action.payload, next: state.next}
        case 'RETURN_TO_STEP_CHANGE_CONDITIONS_INITIAL_STATE':
            return initialState;
        default:
            return state;
    }
}