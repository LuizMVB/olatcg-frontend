import { useDispatch } from "react-redux";

const useStepResponse = () => {
    const dispatch = useDispatch();

    const setStepResponse = (response) => {
        dispatch({ type: 'SET_STEP_RESPONSE', 
                payload: response});
    }

    return [setStepResponse];
};

export default useStepResponse;