import { combineReducers } from 'redux';
import { ADD_TODO, VisibilityFilters, SET_VISIBILITY_FILTER } from './action';

const { SHOW_ALL}  = VisibilityFilters;
// 指定state的初始化状态

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos:[]
}

// 处理多个action
function visibilityFilter(state = SHOW_ALL,action){
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state;
    }
}

function todos(state = [], action){
    switch (action.type) {
        case ADD_TODO:
            return [...state,{text: action.text,completed: false}]
    
        default:
            return state;
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp;