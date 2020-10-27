import React from 'react';
import { Pagination } from 'antd';

function PaginationCom(props){
    return (
        <div className="t-right">
            <Pagination
                total={props.total}
                defaultPageSize={props.pageSize}
                current={props.pageNum}
                onShowSizeChange={props.onShowSizeChange}
                onChange={props.onPageNumChange}
            />
        </div>
    )
}

export default PaginationCom;