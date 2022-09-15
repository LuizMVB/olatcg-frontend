const initialState = 0;

export default function PendingRequestsReducer(state = initialState, action){
    switch(action.type){
        case 'ADD_PENDING_REQUEST':
            return action.payload + 1;
        case 'REMOVE_PENDING_REQUEST':
            return action.payload - 1;
        default:
            return state;
    }
}