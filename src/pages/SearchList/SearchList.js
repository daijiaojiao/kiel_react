import React from 'react';
import http from '../../server';
import ChipItem from '../Home/ChipItem';
import IpItem from './IpItem/IpItem';
import LeftChoose from './LeftChoose/LeftChoose';
import PaginationCom from '../../components/PaginationCom/PaginationCom';
import store from '../../store/index';
import emitter from '../../util/events';
import '../Home/Item.scss';
import './SearchList.scss';
// import history from '../../util/history'


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

function ComponentsClass(props){
    if(props.list.length>0){
        if(props.mcid==='2'){
            return(
                <div className="search-content">
                    <IpItem list={props.list}/>
                </div>
                
            )
        }else{
            return (
                <div className="search-content">
                    <ChipItem doc={props.list} showCount={4}/>
                </div>
                
            )
        }
        
    }else{
        return (
            <div className="search-content data-none">没有找到您想要的宝贝</div>
        )
    }
}

const SearchListHocCom = SearchListHoc(ComponentsClass)


class SearchList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            mcid: this.props.match.params.mcid,
            list:[],
            page:{
                pageNum: 1, 
                pageSize: 20,
                total:0,
                mcid:this.props.match.params.mcid,
                cid:'',
                searchText: store.getState().searchText
            },
            extTypeMap:{
                // common_type:[],
                ip_type:[],
                ip_com_cate:[],
                ip_foundry:[],
                ip_open_cate:[],
                ip_technics:[],
            },
            extTypeMapBook:{
                common_type: ["book"],
                file_format: [],
                ic_flow: [],
                ic_semi_type: [],
                ic_type: [],
                lang: [],
            },
            check:[]
        }
        this.getSearchList.bind(this);
    }
    componentDidMount(){
        // 监听点击heander 搜索icon事件
        
        let params ;
        console.log(store.getState())
        if(this.props.match.params.mcid==='1'){
            params = {
                ...this.state.page,
                extTypeMap: this.state.extTypeMapBook
            }
        }else{
            params = {
                ...this.state.page,
                extTypeMap: this.state.extTypeMap
            }
        }
        this.setState({
            extTypeMap: params.extTypeMap
        })
        this.searchTextEmitter = emitter.on('searchList',(searchText)=>{
            console.log(searchText)
            let newPageData = {
                ...this.state.page,searchText
            }
            this.setState({
                page:newPageData
            })
            this.getSearchList({...params,searchText})
        })
        this.getSearchList(params);
        console.log(this.searchTextEmitter);
        console.log(typeof(this.searchTextEmitter));
    }
    componentWillUnmount(){
        // emitter.removeListener('searchList');
    }
    componentWillReceiveProps(newProps){
        console.log(newProps)
        if(newProps.match.params.mcid!==this.state.mcid){
            let newData = {
                mcid:newProps.match.params.mcid,
                page:{
                    ...this.state.page,
                    pageSize: 20,
                    total: 0,
                    pageNum: 1
                },
                cid:'',
                extTypeMap:newProps.match.params.mcid==='1'?{
                    common_type: ["book"],
                    file_format: [],
                    ic_flow: [],
                    ic_semi_type: [],
                    ic_type: [],
                    lang: [],
                }:{
                    ip_type:[],
                    ip_com_cate:[],
                    ip_foundry:[],
                    ip_open_cate:[],
                    ip_technics:[],
                    
                },
                list:[],
                searchText: store.getState().searchText
            }
            this.setState({
                ...newData
                },()=>{
                    this.getSearchList({...newData})
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
        this.getSearchList({...this.state.page,extTypeMap:{...extData}});
        
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