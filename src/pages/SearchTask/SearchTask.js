
import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import SearchTaskProgress from './SearchTaskProgress';
import TaskItem from './TaskItem/TaskItem';
import http from '../../server';
import './SearchTask.scss';
// import { Checkbox } from 'antd';
// import history from '../../util/history'


function ReactHookDemo(){

    // 声明一个count 的state变量
    const [ count, setCount ] = useState(1);
    const [ num, setNum ] = useState(2);
    const handleNum = ()=>{
        let newNum = num+10;
        setNum(newNum);
    }
    /**
     * useEffect 在函数组件中操作副作用
     * 设置订阅以及手动更改react组件中的dom都属于副作用
     * 如 发送网络请求  手动变更dom  记录日志
     * 可以在effect中直接访问 state中的值
     * useEffect会在每次渲染后和每次更新之后都执行
     * */ 
    useEffect(()=>{
        document.title = `you clicked ${num} times`;
    })
    return (
        <div>
            task
            <button onClick={handleNum}>add count 1 num:{num}</button>
            <button onClick={()=>setCount(count+1)}>add count</button>
            {count}
        </div>
    )
}

function SearchTask(props){console.log(props)
    const [list, setList] = useState([]);
    const [page, setPage] = useState({pageNum:1, pageSize: 20,total: 0});
    const [searchText, setSearchText] = useState('');
    useEffect(()=>{
        getSearchList();
    },[page.pageNum,searchText])
    async function  getSearchList(){ // 获取搜索列表
        let params = {
            ...page,
            mcid: 4,
            searchText: ''
        }
        let res = await http('/api/resource/rpc','searchResource',params);
        setList(res.data.list);
        setPage({...page,total: res.data.total});
        // return res;
        
    }
    function handlePageChange(pageNum){
        console.log(pageNum)
        setPage({...page,pageNum})
    }
    return (
        <div className="task">
            <div className="task-content">
                <SearchTaskProgress/>
                <TaskItem list={list} />
                {/* <div>
                    {list.map(item=>
                        <div key={item.id}>{item.name}</div>    
                    )}
                </div> */}
            </div>
            
            
            <Pagination total={page.total} current={page.pageNum} onChange={handlePageChange} defaultPageSize={page.pageSize} className="pagination"></Pagination>
            {page.pageNum}
        </div>
    )
}
export default SearchTask;