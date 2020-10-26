import React from 'react';
import ReactDOM from 'react-dom';
import RouterPage from './router.js';
import { Provider } from 'react-redux'
import store from './store/index';
import http from './server.js';
import { createBrowserHistory } from 'history'
import './index.css';
import 'antd/dist/antd.css';
import './assets/css/main.css';
import * as serviceWorker from './serviceWorker';



async function getUserMsg(){
  let user = await http('/api/user/rpc','getUserInfoById',{})
  store.dispatch({type:'set_user',payload:user})
}
async function getConfigAndCategory(){
  let res = await http('/api/resource/rpc','getConfigs',{});
  let config = {
    category:res.categoryMap.cn,
    config:res.configMap.cn,
  }
  store.dispatch({type: 'set_config',payload:config})
}
getUserMsg();
getConfigAndCategory();

ReactDOM.render(
  <Provider store={store}>
    <RouterPage/>
  </Provider>
  ,
  document.getElementById('root')
)


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//     element,
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
