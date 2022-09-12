import { useDispatch } from "react-redux";

const useStepForm = () => {
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        dispatch({ type: 'ADD_PAIR_NAME_VALUE', 
                payload: {[name]: value}});
    };

    return [handleInputChange];
};

export default useStepForm;