import React from 'react';
import { Image } from 'antd';
import './IpItem.scss';
import {getConfigVal} from '../../../common';

function IpItem(props){
    console.log(props.list)
    const imgPre = getConfigVal('system','imgPath');
    const unit = getConfigVal('unit_name',1);
    console.log(unit)
    console.log(imgPre)
    return(
        <React.Fragment>
            {
                props.list.map(item=>
                    <div className="item" key={item.id}>
                        <div className="item-lft">
                            <Image
                                src={imgPre+item.img}
                                width={180}
                                height={180}
                                fallback={require('../../../assets/img/defaultChipImg.png')}
                            ></Image>
                        </div>
                        <div className="item-right">
                            <div className="grid-f">
                                <p className="tit-1">{item.name}</p>
                                <p className="t-right tit-blue-1">{item.priceFrom} {getConfigVal('unit_name',item.unit)}</p>
                            </div>
                            <p className="item-desc">{item.description}</p>
                            <div className="item-bottom">
                                <p className="item-create-time">
                                    <span>{item.creatorName}</span>
                                    <span>2019-04-09</span>
                                </p>
                                <p className="item-type t-right">
                                    <span>system on chip</span>
                                </p>
                            </div>
                        </div>
                    </div>    
                )
            }
        </React.Fragment>
        
    )
}

export default IpItem;