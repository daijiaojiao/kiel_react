import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
import http from '../../server.js';
import  BannerCom from '../../components/BannerCom/BannerCom';
import Suggestion from './Suggestion';
import IpItem from './IpItem';
import DocItem from './DocItem';
import ChipItem from './ChipItem';

import { getConfigVal } from '../../common.js';
import './Home.scss';
import './Item.scss';
// import { Row, Col } from 'antd';
// import store from '../../store/index.js';
// import store from '../../store/store.js';

function MoreCom(){
    return (
        <div className="t-right more">
            <span>更多</span>
            <span className="icon-more">
                <ArrowRightOutlined />
            </span>
        </div>
    )
}

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book:[],
            video:[],
            ip:[],
            chip:[],
            count: 0
        }
        this.getList.bind(this);
    }
    componentDidMount(){
        this.getList();
    }
    async getList(){
        let res = await http('/api/resource/rpc','searchResourceRandom',{})
        this.setState({
            book: res.resources['1'].book,
            video: res.resources['1'].video,
            ip: res.resources['2'].all,
            chip: res.resources['3'].all,
        })
    }
    getDefaultImg(type,e){
        e.target.src = require('../../assets/img/'+type+'.png');
    }
    render(){
        let imgPre = getConfigVal('system','imgPath');
        return(
            <div>
                <BannerCom></BannerCom>
                <div className="home-content">
                    <Suggestion item={2}></Suggestion>
                    <IpItem ip={this.state.ip} imgPre={imgPre} getDefaultImg={this.getDefaultImg}></IpItem>
                    <MoreCom />
                    <Suggestion item={1}></Suggestion>
                    <DocItem doc={this.state.book} imgPre={imgPre} getDefaultImg={this.getDefaultImg}></DocItem>
                    
                    <Suggestion item={3}></Suggestion>
                    <ChipItem showCount={5} doc={this.state.chip} imgPre={imgPre} getDefaultImg={this.getDefaultImg}></ChipItem>
                </div>
                
                
                
            </div>
        )
    }
}

export default Home;