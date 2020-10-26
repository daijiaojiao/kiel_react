import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import history from '../../util/history';
import store from '../../store/index';
import md5 from 'md5'
// import http from '../../server';
import axios from 'axios';

function LoginForm (){
    const handleLogin = (val)=>{
        console.log(val);
        let data = {
            ...val,
            pwd: md5(val.pwd)
        }
        axios.post('/api/user/login/normal',data).then(res=>{
            console.log(res)
            if(res.data.success){
                // 修改store的值
                store.dispatch({type: 'set_user',payload: res.data.userInfo})
                // 跳转到登录页 
                history.push('/');
            }else{
                // 提示信息  登录失败
                message.error(res.data.errorMsg);
            }
        })
    }
    return (
        <div className="login-form">
            <p className="form-tit">会员登录</p>
            <Form name="normal_login"
                onFinish={handleLogin}>
                <Form.Item 
                    name="loginName"
                    rules={[{required: true,message: '请输入用户名'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"></Input>
                </Form.Item>
                <Form.Item 
                    name="pwd"
                    rules={[{required: true,message: '请输入密码'}]}
                >
                    <Input.Password prefix={<LockOutlined  className="site-form-item-icon"/>} placeholder="密码"></Input.Password>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={12}>
                            还不是基尔会员?点击<Link to="/register" className="t-blue">&nbsp;注册</Link>
                        </Col>
                        <Col span={12} className="t-right t-blue">忘记密码?</Col>
                    </Row>
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" block htmlType="submit">登录</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginForm;