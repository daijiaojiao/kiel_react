// action 类型
export const ADD_TODO = 'ADD_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

// 其他常量
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL'
}

// action创建函数
function addTodo(text){
    return {
        type: 'ADD_TODO',
        text
    }
}

export function setVisibilityFilter(filter){
    return {type: SET_VISIBILITY_FILTER, filter}
}
export default addTodo;