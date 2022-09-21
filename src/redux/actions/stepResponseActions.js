import { actionTypes } from "../constants/actionTypes";

const stepResponseActions = {
    set: (response) => ({
        type: actionTypes.SET_STEP_RESPONSE,
        payload: response
    }),
    returnToInitialState: () => ({
        type: actionTypes.RETURN_STEP_RESPONSE_TO_INITIAL_STATE
    })
}

export { stepResponseActions };