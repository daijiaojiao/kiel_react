
import { createStore } from 'redux'
import todoApp from './reducer';
import { addTodo, VisibilityFilters } from './action';
// 提供 getState() 方法获取state
// 提供 dispatch(action) 方法更新state
// subscribe(listener) 注册监听器
// 通过subscribe(listener) 返回的函数注销监听器 

let store = createStore(todoApp);

console.log(store.getState())

export default store;