import React from 'react';
import { Row, Col } from 'antd';
import getDefaultImg from '../../common'
import { Link } from 'react-router-dom';

function ChipItem(props){
    let ip = props.doc;
    return (
        <div className="flex-bd chip-flex">
            {
                ip.map((item,index)=>
                    <div className={["flex-item",(index+1)%props.showCount?'':'flex-item-right'].join(' ')} key={item.id}>
                        <Link to={'/detail/'+item.id}>
                            <img src={props.imgPre+item.img} alt="图片" onError={(e)=>getDefaultImg('defaultChipImg',e)} />
                            <p className="chip-name">{item.name}</p>
                            <Row>
                                <Col span={12} className="t-blue t-bold">{item.priceFrom<0?'面议':(item.priceFrom+ ' 元')} </Col>
                                <Col span={12} className="t-right">{item.creatorName}</Col>
                            </Row>
                        </Link>
                        
                    </div>
                )
            }
        </div>
    )
    
    
}

export default ChipItem;