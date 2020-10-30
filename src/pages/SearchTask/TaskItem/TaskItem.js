import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './TaskItem.scss';

function ItemPrice(props){
    if(props.priceFrom){
        return(
            <>
                ￥ {props.priceFrom}
                <span className="font-gray">&nbsp;起</span>
            </>
        )
    }else{
        return (
            <React.Fragment>
                项目需求
            </React.Fragment>
        )
    }
}

function TaskItem(props){
    return (
        <div>
            {props.list.map(item=>
                <div key={item.id} className="task-item">
                    <Link className="tit-1" to={'/taskDetail/'+item.id}>{item.name}</Link>
                    <div className="item-middle">
                        <p>{item.description}</p>
                        <p className="t-right">
                            <ItemPrice priceFrom={item.priceFrom}/>
                        </p>
                    </div>
                    <div className="bottom">
                        <div className="inline-bk">
                            <span>{item.creatorName}</span>
                            <span>{item.updated}</span>
                        </div>
                        <Button className="right">click me</Button>
                    </div>
                </div>    
            )}
        </div>
    )
}

export default TaskItem;