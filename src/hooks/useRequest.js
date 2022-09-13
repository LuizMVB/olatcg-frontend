import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../services/MessageService";

const useRequest = () => {
    const dispatch = useDispatch();
    const pendingRequestsCount = useSelector(state => state.pendingRequests);
    const makeRequest = (
        action, 
        method, 
        body,
        onSuccess, 
        onFailure, 
        withLoading=true
    ) => {
        if(withLoading){
            dispatch({
                type: 'ADD_PENDING_REQUEST',
                payload: pendingRequestsCount,
            });
        }

        let headers = {
            "Content-Type": "application/json"        
        };

        let config = {
            method: method
        };
        
        if(body){
            config = {...config, ...{body: JSON.stringify(body)}};
            config = {...config, ...{headers: headers}};
        };

        fetch(action, config)
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    onFailure?.(data);
                    return;
                }
                onSuccess?.(data);
            }).catch(() => {
                onFailure?.({
                    error: 'CANT_CONNECT_TO_API',
                    errorCode: 0,
                    errorDescription: getMessage('error.general'),
                });
            }).finally(() => {
                if(withLoading){
                    dispatch({
                        type: 'REMOVE_PENDING_REQUEST',
                        payload: pendingRequestsCount + 1, //async correction
                    });
                }
            });
    };

    return [makeRequest];
};

export default useRequest;