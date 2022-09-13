import { useDispatch } from "react-redux";

const useStepConditions = () => {
    const dispatch = useDispatch();

    const setPreviousCondition = (condition) => {
        dispatch({
            type: 'SET_PREVIOUS_CONDITION',
            payload: condition,
        });
    }

    const setNextCondition = (condition) => {
        dispatch({
            type: 'SET_NEXT_CONDITION',
            payload: condition,
        });
    };

    return [setPreviousCondition, setNextCondition];
};

export default useStepConditions;