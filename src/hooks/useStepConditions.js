import { useDispatch } from "react-redux";

const useStepConditions = () => {
    const dispatch = useDispatch();

    const setNextCondition = (condition) => {
        dispatch({
            type: 'SET_NEXT_CONDITION',
            payload: condition,
        });
    };

    return [setNextCondition];
};

export default useStepConditions;