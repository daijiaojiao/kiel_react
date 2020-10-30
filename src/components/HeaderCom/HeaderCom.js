import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import store from '../../store/index';
import { Input, Select, Menu, Dropdown } from 'antd';
import { SearchOutlined, DownOutlined   } from '@ant-design/icons';
import './HeaderCom.scss';

const { Option } = Select;
function MenuList(){
    const list = [
        {path: '/myAccount',title: '我的账户'},
        {path: '/myAccount',title: '我的资料'},
        {path: '/myAccount',title: '我的项目'},
        {path: '/myAccount',title: '帮助中心'},
        {path: '/myAccount',title: '注销'},
    ];
    return (
        <Menu>
            {list.map((item, index)=>
                <Menu.Item key={index}>
                    <Link to={item.path}>{item.title}</Link>
                </Menu.Item>
            )}
        </Menu>
    )
}

function UserHeaderCom(props){
    if(props.user.isLogin){
        return (
            <li>
                
                <Dropdown overlay={<MenuList/>}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    {props.user.user.name}~<DownOutlined />
                    </a>
                </Dropdown>
            </li>
        )
    }else{
        return (
            <>
                <li>
                    <NavLink to="/login" activeClassName="active">登录</NavLink>
                    <span></span>
                </li>
                <li>
                    <span>注册</span>
                </li>
            </>
        )
    }
}

function HeaderCom (props){
    const {user} = store.getState();
   
    return(
        <div className="HeaderCom">
            <div className="HeaderComContent">
                <div className="inline-bk">
                    <img src={require('../../assets/img/h_logo.png')} alt="logo"></img>
                    <div className="inline-bk logo-title">
                        <NavLink to="/" >
                            <p>基芯阁</p>
                            <span>kilbychain</span>
                        </NavLink>
                        
                    </div>
                </div> 
                <ul className="inline-bk items">
                    <li >
                        <NavLink to="/searchList/1" activeClassName="active">专业资料</NavLink>
                    </li>
                    <li >
                        <NavLink to="/searchList/2" activeClassName="active">知识产权</NavLink>
                    </li>
                    <li >
                        <NavLink to="/searchList/3" activeClassName="active">成品芯片</NavLink>
                    </li>
                    <li >
                        <NavLink to="/searchTask" activeClassName="active">项目研发</NavLink>
                    </li>
                </ul>
                
                <Input.Group compact className="search-input ">
                    <Select defaultValue={props.mcid} className="select-before" onChange={props.handleSelectType}>
                        <Option value="2">知识产权</Option>
                        <Option value="1">专业资料</Option>
                        <Option value="3">成品芯片</Option>
                        <Option value="4">项目研发</Option>
                    </Select>
                    <Link to={props.mcid==='4'?'/searchTask':('/searchList/'+props.mcid)}>
                        <Input.Search style={{ width: '200px' }} defaultValue="" onSearch={props.handleSearch}/>
                    </Link>
                </Input.Group>
                <ul className="inline-bk items-after">
                    <UserHeaderCom user={user} />
                    <li>
                        <Link to="/blockChain">
                            <div >Kilbychain</div>
                            <div className="t-center">explorer</div>
                        </Link>
                        
                    </li>
                </ul>
            </div>
        </div>
        
    )
}

export default HeaderCom;