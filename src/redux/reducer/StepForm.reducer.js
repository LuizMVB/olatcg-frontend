const initialState = {};

export default function StepFormReducer(state = initialState, action){
    switch(action.type){
        case 'ADD_PAIR_NAME_VALUE':
            return {...state, ...action.payload};
        case 'SET_STEP_FORM':
            return action.payload;
        case 'UPDATE_STEP_FORM':
            return Object.assign(state, action.payload);
        case 'RETURN_TO_STEP_FORM_INITIAL_STATE':
            return initialState;
        default:
            return state;
    }
}