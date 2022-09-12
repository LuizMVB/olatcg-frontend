import { useDispatch } from "react-redux";

const useContentList = () => {
    const dispatch = useDispatch();

    const selectItem = (index) => {
        dispatch({
            type: 'SELECT_ITEM',
            payload: index,
        });
    };

    return [selectItem];
};

export default useContentList;