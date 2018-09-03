let defaultState = {
    examplePropOne: 'example!',
    examplePropTwo: 'example!!',
}

const reducers = (state = defaultState, action) => {
    switch(action.type) {
        case 'EXAMPLE':
            return {
                ...state,
                examplePropOne: 'YEET!'
            }
        default: return state;
    }
}

export default reducers;