import React from 'react';
import HeaderCom from '../../components/HeaderCom/HeaderCom';
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
        this.props.history.go();
    }
    render(){
        return(
            <div>
                <HeaderCom  mcid={this.state.mcid} searchText={this.state.searchText} gotoSearchPage={this.gotoSearchPage}/>
                
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