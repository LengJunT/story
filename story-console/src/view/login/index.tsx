import React, { useState } from 'react';
import { Input, Icon, Button } from 'antd'
import './index.scss'

const { Password } = Input
function Login() {
    const [name, setName] = useState(undefined)
    const [password, setPassWord] = useState(undefined)
    return (
        <div className="login-page">
            <div className="login-box">
                <div className="login-header">
                    物语
                </div>
                <div className="login-form">
                    <div className="login-form-item">
                        <Input placeholder="用户名：admin"
                            value={name}
                            onChange={onChangeInput(setName)}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    </div>
                    <div className="login-form-item">
                        <Password placeholder="密码：admin"
                            value={password}
                            onChange={onChangeInput(setPassWord)}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    </div>
                    <Button type="primary" className="login-form-button">登录</Button>
                    <div className="login-form-item text-right">
                        <Button type="link">注册</Button>
                    </div>
                </div>
            </div>
        </div>
    );
    function onChangeInput(setState: any) {
        return function (event: any) {
            setState(event.target.value)
        }
    }
}

export default Login;
