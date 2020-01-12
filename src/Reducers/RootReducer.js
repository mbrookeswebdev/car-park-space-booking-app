const initState = {
    id: localStorage.getItem('id')
};

const rootReducer = (state = initState, action) => {
    if (action.type === 'DELETE_ID') {
        localStorage.clear();
        let newId = null;
        return {
            ...state,
            id: newId
        }
    } else {
        if (action.type === 'SET_ID') {
            console.log('I am action id', action.id);
            localStorage.setItem('id', action.id);
            let newId = action.id;
            return {
                ...state,
                id: newId
            }
        }
    }
    return state;
};

export default rootReducer;