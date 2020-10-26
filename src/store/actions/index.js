import action_types from './action-types';

let actions = {
    setConfig: function(payload){
        return {
            type: action_types.set_config,
            payload
        }
    },
    setUser: function(payload){
        return {
            type: action_types.set_user,
            payload
        }
    }
}

export default actions;