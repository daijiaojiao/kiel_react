import store from './store/index';

export function getConfigVal (type, key ){
    let configMap = store.getState().config;
    let config = {};
    for(let key in configMap){
        config[key] = {};
        for(let i of configMap[key]){
            let name = i.key,
                value = i.value;
            config[key][name] = value;
        } 
    }
    try{
        return config[type][key];
    }
    catch(err){
        return '';
    }
}

export default function getDefaultImg(type, e){
    e.target.src = require('./assets/img/'+type+'.png');
}

