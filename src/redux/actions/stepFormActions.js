import { actionTypes } from "../constants/actionTypes";

const stepFormActions = {
    addField: (event) => {
        let type = event.target.type;
        let name = event.target.name;

        if(type !== 'file'){
            let value = event.target.value;
            return {
                type: actionTypes.ADD_STEP_FORM_FIELD,
                payload: {[name]: value}
            }
        }

        let value = event.target.files[0];
        return {
            type: actionTypes.ADD_STEP_FORM_FIELD,
            payload: {[name]: value }
        }
    },

    set: (stepForm) => ({
        type: actionTypes.SET_STEP_FORM,
        payload: stepForm
    }),

    update: (formFields) => ({
        type: actionTypes.UPDATE_STEP_FORM,
        payload: formFields
    }),

    returnToInitialState: () => ({
        type: actionTypes.RETURN_TO_STEP_FORM_INITIAL_STATE
    })
}

export { stepFormActions };