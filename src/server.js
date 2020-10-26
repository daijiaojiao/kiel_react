import axios from 'axios';
// import qs from 'qs';


let http = function(url,method, params, ajaxMethod = "post"){
    // let ajaxParams = JSON.stringify(Object.assign({id:1,jsonrpc: "2.0"},{method,params:[params]}));
    let ajaxParams = Object.assign({id:1,jsonrpc: "2.0"},{method,params:[params]});
    return new Promise((resolve,reject)=>{
        axios[ajaxMethod](url,ajaxParams).then((res)=>{
            // console.log(res)
            resolve(res.data.result);
        })
    })
}
export default http;