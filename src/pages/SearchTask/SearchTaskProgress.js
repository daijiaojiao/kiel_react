import React from 'react';
import { Timeline } from 'antd';

function SearchTaskProgress(){
    const progress = [
        {
            title: '项目悬赏',
            content: '雇主填写项目需求，发布项目信息',
        },
        {
            title: '参与投标',
            content: '雇员筛选项目，填写竞标理由，提出报价并参与投标',
        },
        {
            title: '授予中标',
            content: '雇主选择合适的竞标者并支付保证金',
        },
        {
            title: '接受项目',
            content: '雇员可以选择接受或拒绝雇主提出的保证金计划',
        },
        {
            title: '开始工作',
            content: '双方达成一致，雇员开始工作，分阶段提交交付成果',
        },
        {
            title: '支付报酬',
            content: '雇主对项目满意，支付项目保证金',
        },
        {
            title: '项目完成',
            content: '项目保证金支付完毕，项目结束',
        }
    ]
    return (
        <div className="progress">
            <Timeline>
                {progress.map((item,index)=>
                    <Timeline.Item color="blue" key={item.index}>
                        <h1>{item.title}</h1>
                        <p>{item.content}</p>
                    </Timeline.Item>
                )}
                
            </Timeline>
        </div>
    )
}

export default SearchTaskProgress;