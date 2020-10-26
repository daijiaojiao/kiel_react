import React from 'react';
import { Link } from 'react-router-dom';
// import store from '../../store/index';
import {getConfigVal} from '../../common';
import { Carousel } from 'antd';
import './BannerCom.scss';



class BannerCom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bannerImg: [],
            imgPre: ''
        }
    }
    componentDidMount(){
        this.getBannerImgs();
    }
    componentWillUnmount(){
        
    }
    getBannerImgs = ()=>{
        let bannerImg = [],
            imgPre = getConfigVal('system','imgPath'),
            imgs = JSON.parse(getConfigVal('home','newBanners'));
        for(let i=0,len = imgs.length;i<len;i++ ){
            bannerImg.push({
                path: imgs[i].path,
                url: imgPre + imgs[i].url 
            })
        }
        this.setState({
            bannerImg
        })
    }
    render(){
        return(
            <div className="banner-com">
                <Carousel autoplay autoplaySpeed={2000}>
                    {this.state.bannerImg.map(item=>
                        <Link to={item.path} key={item.url}>
                            <img src={item.url} alt="banner" key={item.url} className="banner-img"></img>
                        </Link>
                    )}
                    
                </Carousel>
            </div>
            
        )
    }
}
// function BannerCom(){
//     useEffect(()=>{

//     })
//     return (
        
//     )
// }

export default BannerCom;