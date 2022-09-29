import { getMessage } from "../services/MessageService";

const useRequest = () => {
    const makeRequest = (
        action, 
        method, 
        body,
        onSuccess, 
        onFailure
    ) => {
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
                    data.errorDescription = !data.errorDescription ? getMessage('error.general') : data.errorDescription;
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
            });
    };

    return [makeRequest];
};

export default useRequest;