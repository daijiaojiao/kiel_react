import React from 'react';
import HeaderCom from '../../components/HeaderCom/HeaderCom';
import store from '../../store/index';
import  emitter from '../../util/events';
// import history from '../../util/history';

// import http from '../../server.js';


// import {withRouter} from 'react-router-dom';


class HomeContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mcid: "1",
            searchText: '',
        }
    }
    componentDidMount(){
    }
    gotoSearchPage = ()=>{
        this.props.history.push('/searchList');
        // this.props.history.go();
    }
    handleSearch = (searchText)=>{
        this.setState({
            searchText
        })
        store.dispatch({type: 'set_searchText',payload: searchText});
        emitter.emit('searchList',searchText)
    }
    handleSelectType = (mcid)=>{
        this.setState({
            mcid
        })
    }
    render(){
        return(
            <div>
                <HeaderCom  mcid={this.state.mcid} searchText={this.state.searchText} gotoSearchPage={this.gotoSearchPage} handleSearch={this.handleSearch} handleSelectType={this.handleSelectType}/>
                
                {this.props.children}
            </div>
        )
    }
}
// function HomeContainer(){
//     return (
//         <div>首页容器
//             {this.props.children}
//         </div>
//     )
// }

export default HomeContainer;