import action_types from '../actions/action-types';

let initState = {
    config: {},
    category:{},
    user:{}
}

function reducer(state = initState, action){
    let newState;
    switch(action.type){
        case action_types.set_config:
            newState = {
                ...state,
                config: action.payload.config,
                category: action.payload.category
            }
            break;
        case action_types.set_user:
            newState = {
                ...state,
                user: action.payload
            }
            break;
        default:
            newState = state;
    }
    return newState;
}

export default reducer;