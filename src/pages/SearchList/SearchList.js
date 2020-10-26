import React from 'react';
import { Pagination } from 'antd';
import http from '../../server';
import ChipItem from '../Home/ChipItem';
import LeftChoose from './LeftChoose/LeftChoose';
import PaginationCom from '../../components/PaginationCom/PaginationCom';
import '../Home/Item.scss';
import './SearchList.scss';

function SearchListHoc(ComponentsClass){
    return class HOC extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                
            }
        }
        componentDidMount(){
            
        }
        render(){
            return <ComponentsClass  {...this.props} getSearchList={this.getSearchList}/>
        }
    }
}

class ComponentsClass extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div className="search-content">
                {
                    this.props.list.length>0 ?(<ChipItem doc={this.props.list} showCount={4}/>):(<div>没有找到您想要的宝贝</div>)
                }
                
            </div>
        )
    }
}


const SearchListHocCom = SearchListHoc(ComponentsClass)


class SearchList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            // mcid: this.props.match.params.mcid,
            list:[],
            page:{
                pageNum: 1, 
                pageSize: 20,
                total:0,
                mcid:this.props.match.params.mcid,
                cid:'',
                searchText: ''
            },
            extTypeMap:{
                // common_type:[],
                ip_type:[],
                ip_com_cate:[],
                ip_foundry:[],
                ip_open_cate:[],
                ip_technics:[],
            },
            check:[]
        }
        this.getSearchList.bind(this);
    }
    componentDidMount(){
        this.getSearchList(this.state.page);

    }
    componentWillReceiveProps(newProps){
        console.log(newProps.match.params.mcid!==this.state.mcid)
        if(newProps.match.params.mcid!==this.state.mcid){
            this.setState({
                mcid:newProps.match.params.mcid,
                list:[]
                },()=>{
                    this.getSearchList({...this.state.page,mcid: this.props.match.params.mcid})
            })
        }
    }
    onChange = (extType,checkedValue)=>{
        let extData = Object.assign({},this.state.extTypeMap);
        extData[extType] = checkedValue;
        this.setState({
            extTypeMap: {...extData},
            page:{
                ...this.state.page,
                extTypeMap: extData,
                cid:''
            }
        })
        
        this.getSearchList(this.state.page);
        
    }
    onSelect = (selectedKeys)=>{
        let cid = selectedKeys[0];
        let newPage = {
            ...this.state.page,
            cid
        }
        this.setState({
            page:newPage
        })
        this.getSearchList(newPage);
    }
    async getSearchList(params){
        let res = await http('/api/resource/rpc','searchResource',params);
        this.setState({
            list: res.data.list,
            page:{
                ...this.state.page,
                total: res.data.total
            }
        })
    }
    onShowSizeChange = (pageNum,pageSize)=>{
        let newPage = {
            ...this.state.page,
            pageSize,
        }
        this.setState({
            page: newPage
        })
        console.log(122)
        this.getSearchList(newPage)
    }
    onPageNumChange = (pageNum)=>{
        let newPage = {
            ...this.state.page,
            pageNum
        }
        this.setState({
            page: newPage
        })
        this.getSearchList(newPage);
    }
    render(){
        return (
            <div className="home-content">
                <LeftChoose onSelect={this.onSelect} extTypeMap={this.state.extTypeMap} mcid={this.props.match.params.mcid} onChange={this.onChange}></LeftChoose>
                <SearchListHocCom mcid={this.props.match.params.mcid} list={this.state.list}/>
                <PaginationCom onShowSizeChange={this.onShowSizeChange} onPageNumChange={this.onPageNumChange} {...this.state.page}></PaginationCom>
            </div>
        )
    }
}


export default SearchList;