const initialState = {};

export default function StepRequestReducer(state = initialState, action){
    switch(action.type){
        case 'SET_STEP_REQUEST':
            return action.payload;
        case 'RETURN_STEP_REQUEST_TO_INITIAL_STATE':
            return initialState;
        default:
            return state;
    }
}