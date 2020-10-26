import React from 'react';

// import http from '../../server';
import LoginForm from '../../components/LoginForm/LoginForm'

import './login.scss';

function Login(){
    return (
        <div className="login">
            <div className="top">
                <img src={require("../../assets/img/logo.png")} alt="logo"></img>
                <div className="inline-bk">
                    <p>基芯阁</p>   
                    <p>KilbyChain</p>
                </div>
                <div className="inline-bk title">会员登录</div> 
                
            </div>
            <LoginForm />
            
            {/* <div className="login-form">
                <p className="form-tit">会员登录</p>
                <Form name="normal_login"
                    onFinish={handleLogin}>
                    <Form.Item 
                        name="username"
                        rules={[{required: true,message: '请输入用户名'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"></Input>
                    </Form.Item>
                    <Form.Item 
                        name="userpwd"
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
            </div> */}
        </div>
    )
}

export default Login;