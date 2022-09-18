import { actionTypes } from "../constants/actionTypes";

const stepChangeConditionsActions = {
    setPrevious: (condition) => ({
        type: actionTypes.SET_PREVIOUS_CONDITION,
        payload: condition
    }),
    setNext: (condition) => ({
        type: actionTypes.SET_NEXT_CONDITION,
        payload: condition
    }),
    returnToInitialState: () => ({
        type: actionTypes.RETURN_TO_STEP_CHANGE_CONDITIONS_INITIAL_STATE
    })
}

export { stepChangeConditionsActions };