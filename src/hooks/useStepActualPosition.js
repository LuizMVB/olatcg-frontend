import { useDispatch, useSelector } from "react-redux";

const useStepActualPosition = () => {
    const actualPosition = useSelector(state => state.stepActualPosition);
    const dispatch = useDispatch();

    const getStepActualPosition = () => {
        return actualPosition;
    }

    const setStepActualPosition = (position) => {
        dispatch({
            type: 'SET_STEP_ACTUAL_POSITION',
            payload: position,
        });
    };

    return [getStepActualPosition, setStepActualPosition];
};

export default useStepActualPosition;