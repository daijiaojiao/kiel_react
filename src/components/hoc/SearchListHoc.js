import React from 'react';


function SearchListHoc(ComponentsClass){
    return class HOC extends React.Component{
        componentDidMount(){
            console.log('hoc');
        }
        render(){
            return <ComponentsClass/>
        }
    }
}
