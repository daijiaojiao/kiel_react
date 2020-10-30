import React, { useEffect,useState } from 'react';
import { Row, Col, Table, Popover, Button } from 'antd';
import http from '../../server';
// import formatDate  from '../../common';
import commonFun from '../../util/common';
import './BlockChain.scss';


// 区块链浏览器top 组件
function BlockChainTop(props){ 
    let { blockInfo } = props;
    return (
        <div className="blockchain-top">
            <Row className="top-1">
                <Col span={8}>区块高度：<span className="font-big">{blockInfo.blockNum}</span></Col>
                <Col span={8}>交易个数：<span className="font-big">{blockInfo.txCount}</span></Col>
                <Col span={8}>区块时间：<span className="font-big">{commonFun.formatDate(blockInfo.blockDate,'yyyy-MM-dd')}</span></Col>
            </Row>
            <div className="block-hash">区块HASH：{blockInfo.blockHash}</div>
            <div>数据HASH：{blockInfo.dataHash}</div>
        </div>
    )
}

function PopverTable(props){
    let { blockNum } = props;
    const [blockDetail, setBlockDetail] = useState([]);
    async function getBlockDetail(){
        let res = await http('/api/tx/rpc','queryBlock',{blockNum});
        setBlockDetail([res.block]);console.log(blockDetail)
    }
    const detailColumn = [
        {title: '区块时间', dataIndex: 'blockDate'},
        {title: '区块高度', dataIndex: 'blockNum'},
        {title: '交易个数', dataIndex: 'txCount'},
        {title: '区块HASH', dataIndex: 'blockHash', className: 'detail-hash'},
        {title: '数据HASH', dataIndex: 'dataHash', className: 'detail-hash'},
    ]
    const content = (
        <div>
            <Table bordered rowKey={'blockNum'} columns={detailColumn} dataSource={blockDetail} pagination={false}/>
        </div>
    );
    return (
        <Popover placement="bottomLeft" content={content} trigger="click">
            <Button type="link" onClick={getBlockDetail}>{props.blockNum}</Button>
        </Popover>
    )
}

// 区块链浏览器table列表组件

let columns = [
    {
        title: 'TxHash',
        dataIndex: 'txId',
        render:(text)=><>{text.slice(0,8)+'...'+text.slice(text.length-8)}</>
    },
    {
      title: '区块高度',
      dataIndex: 'blockNum',
      render:(text)=><><PopverTable blockNum={text}/></>
    },
    {
      title: '交易时间',
      dataIndex: 'txDate',
    },
    {
      title: '交易内容',
      dataIndex: 'itemName',
    },
    {
        title: '区块状态',
        dataIndex: 'status',
        render: (text)=><>{text>0?'已确认':'未确认'}</>
    },
];
function getRowClass(record, index){
    return  index%2&&'odd-column';
}
function BlockChainTable(props){
    let { blockData } = props;
    return (
        <div className="blockchain-table">
            <p className="block-title"> 
                <img src={require('../../assets/img/block_icon.png')} alt="block-icon"></img>
                交易
            </p>
            <Table bordered rowKey={'txId'} columns={columns} dataSource={blockData} rowClassName={getRowClass} pagination={false}/>
        </div>
    )

}

function BlockChain(){
    const [ blockInfo, setBlockInfo ] = useState({});
    const [ blockData, setBlockData ] = useState([]);
    useEffect(()=>{
        getBlockInfo();
        getBlockData();
    },[])
    async function getBlockInfo(){
        let res = await http('/api/tx/rpc','getBlockchainInfo',{});
        setBlockInfo(res.info);
    }
    async function getBlockData(){
        let res = await http('/api/tx/rpc','queryTxByBlocknumPage',{});
        setBlockData(res.data);
    }
    return (
        <div className="home-content">
            <BlockChainTop blockInfo={blockInfo} />
            <BlockChainTable blockData={blockData}/>
        </div>
    )
}

export default BlockChain;