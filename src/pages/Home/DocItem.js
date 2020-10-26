import React from 'react';
import { Row, Col } from 'antd';
// import { getConfigVal } from '../../common.js';
import { Link } from 'react-router-dom';

function DocItem(props){
    let ip = props.doc;
    return (
        <div className="flex-bd book-flex">
            {
                ip.map((item,index)=>
                    <div className={["flex-item",(index+1)%5?'':'flex-item-right'].join(' ')} key={item.id}>
                        <Link to={'/detail/'+item.id}>
                            <img src={props.imgPre+item.img} alt="图片" onError={(e)=>props.getDefaultImg('defaultBookImg',e)} />
                            <p className="book-name">{item.name}</p>
                            <Row>
                                <Col span={12} className="t-blue t-bold">{item.priceFrom} 积分</Col>
                                <Col span={12} className="t-right">{item.creatorName}</Col>
                            </Row>
                        </Link>
                        
                    </div>
                )
            }
        </div>
    )
    
    
}

export default DocItem;