const initialState = 0;

export default function PendingRequestsReducer(state = initialState, action){
    switch(action.type){
        case 'ADD_PEDING_REQUEST':
            return action.payload + 1;
        case 'REMOVE_PEDING_REQUEST':
            return action.payload - 1;
        default:
            return state;
    }
}