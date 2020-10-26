import React from 'react';
import { getConfigVal } from '../../common.js';
import { Link } from 'react-router-dom';

function IpItem(props){
    let ip = props.ip;
    return (
        <div className="flex-bd ip-flex">
            {
                ip.map((item,index)=>
                    <div className={["flex-item",(index+1)%5?'':'flex-item-right'].join(' ')} key={item.id}>
                        <Link to={'/detail/'+item.id}>
                            <div className="ip-img-bd">
                                <img src={props.imgPre+item.img} alt="图片" onError={(e)=>props.getDefaultImg('defaultIpImg',e)} />
                            </div>
                            
                            <p className="ip-type">{getConfigVal('ip_open_cate',item.extType.ip_open_cate)}</p>
                        </Link>
                        
                    </div>
                )
            }
        </div>
    )
    
    
}

export default IpItem;