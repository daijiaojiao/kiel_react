import React from 'react';
// import {withRouter} from 'react-router-dom';


class HomeContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>首页容器
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