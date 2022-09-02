const initialState = 0;

export default function SelectedItemInContentListReducer(state = initialState, action){
    switch(action.type){
        case 'SELECT_ITEM':
            return action.payload;
        default:
            return state;
    }
}