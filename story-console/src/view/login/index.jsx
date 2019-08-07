import React, { useState } from 'react';
import logo from '../../logo.svg';
import { Input, Icon, Button } from 'antd'
function Login() {
    const [name, setName] = useState(undefined)
    return (
        <div className="login-page">
            <div className="login-box">
                <div className="login-header">
                    物语 {name}
            </div>
                <div className="login-form">
                    <Input placeholder="Enter your username"
                        value={name}
                        onChange={onChangeInput(setName)}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                </div>
                <Button>ok</Button>
            </div>
        </div>
    );
    function onChangeInput(setState){
        return function (event){
            setState(event.target.value)
        }
    }
}

export default Login;
