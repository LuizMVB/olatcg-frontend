const initialState = 0;

export default function SelectedItemInContentListReducer(state = initialState, action){
    switch(action.type){
        case 'SELECT_ITEM':
            return action.payload;
        case 'RETURN_TO_INITIAL_STATE':
            return initialState;
        default:
            return state;
    }
}