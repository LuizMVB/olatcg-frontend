import { useDispatch } from "react-redux";

const useStepRequest = () => {
    const dispatch = useDispatch();

    const setStepRequest = (request) => {
        dispatch({ type: 'SET_STEP_REQUEST', 
                payload: request});
    }

    return [setStepRequest];
};

export default useStepRequest;