import React from 'react';
import { getConfigVal } from '../../common.js';
import store from '../../store/index.js';

function Suggestion(props){
    let titles = {
        1: '专业资料',
        2:'知识产权',
        3: '成品芯片'
    }
    
    if(props.item>3){
        return '';
    }else{
        let suggestions = getConfigVal('home','suggestion'+props.item).split(',');
        if(props.item===3){
            suggestions = [];
            let {category} = store.getState();
            for(let c of category['0']){
                suggestions.push(c.name)
            }
        }
        return (
            <div className="suggestion-father">
                <span className="suggestion-title">{titles[props.item]}</span>
                {suggestions.map(item=>
                    // <>
                        <span key={item} className="suggestion">{item}</span>
                    // </>
                )}
            </div>
        )
    }
    
}

export default Suggestion;