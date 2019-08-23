import React, { useState } from 'react';
import { Input, Icon, Button, message, Modal } from 'antd'
import { login, registered } from '../../action/base'
import { CommonRes } from '../../common/types'
import { RouteComponentProps } from 'react-router'
import { setUserNameAndToken } from '../../util'
import './index.scss'
interface LoginRes {
    code: string;
    content: string;
    message: string;
}
const { Password } = Input
function Registered() {
    const [name, setName] = useState<string>()
    const [password, setPassWord] = useState<string>()
    const [visible, setVisible] = useState<boolean>(false)
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    const handleRegistered = () => {
        setVisible(true)
    }
    const hideModel = () => {
        setVisible(false)
    }
    const registeredUser = async () => {
        if (name === undefined || name === '') {
            message.warning('请输入用户名')
            return
        }
        if (password === undefined || password === '') {
            message.warning('请输入密码')
            return
        }
        setConfirmLoading(true)
        const res: CommonRes = await registered({ name, passWord: password })
        const { content, message: msg } = res
        if (content) {
            message.success('注册成功')
            hideModel()
        } else {
            message.warning(msg)
        }
        setConfirmLoading(false)
    }
    return (
        <React.Fragment>
            <Button type="link" onClick={handleRegistered}>注册</Button>
            <Modal visible={visible} title="注册" onOk={registeredUser} onCancel={hideModel} confirmLoading={confirmLoading}>
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

                </div>
            </Modal>
        </React.Fragment>
    )
    function onChangeInput(setState: Function) {
        return function (event: React.ChangeEvent<HTMLInputElement>) {
            setState(event.target.value)
        }
    }
}
function Login(props: RouteComponentProps) {
    console.log('login props', props)
    const [name, setName] = useState<string>()
    const [password, setPassWord] = useState<string>()
    const handleLogin = () => {
        if (name === undefined || name === '') {
            message.warning('请输入用户名')
            return
        }
        if (password === undefined || password === '') {
            message.warning('请输入密码')
            return
        }
        // if (name === 'admin' && password === 'admin') {
        //     message.success('登录成功')
        //     return
        // } else {
        //     message.error('密码或用户名错误')
        //     return
        // }
        login({ name, passWord: password }).then((res: CommonRes) => {
            const { content, message: msg } = res
            if (content) {
                setUserNameAndToken(content, name)
                props.history.push('/console/writing')
            } else {
                message.warning(msg)
            }
        })
    }
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
                    <Button type="primary" className="login-form-button" onClick={handleLogin}>登录</Button>
                    <div className="login-form-item text-right">
                        <Registered />
                    </div>
                </div>
            </div>
        </div>
    );
    function onChangeInput(setState: Function) {
        return function (event: React.ChangeEvent<HTMLInputElement>) {
            setState(event.target.value)
        }
    }
}

export default Login;
