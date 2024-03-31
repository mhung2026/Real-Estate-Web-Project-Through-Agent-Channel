import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../authentication/Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
            if (userLoginBasicInformationDto && userLoginBasicInformationDto.roleName === 'Admin') {
            navigate('/admin-trangchu');
            } else {
            navigate('/trangchu');
            }
        }
        }, [navigate]);

    const handleLogin = async () => {
        try {
            setLoading(true);
            if (!username || !password) {
                toast.error('Vui lòng nhập tài khoản và mật khẩu');
                setLoading(false);
                return;
            }
    
            const response = await axios.post(
                'http://swprealestatev2-001-site1.etempurl.com/api/account/login',
                {
                    email: username,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json-patch+json',
                        'accept': '*/*',
                    },
                }
            );
    
            const { accessToken, userLoginBasicInformationDto } = response.data;
            // Lưu thông tin vào localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userLoginBasicInformationDto', JSON.stringify(userLoginBasicInformationDto));
            // Lưu token vào Auth
            saveToken(accessToken);
            console.log('Login successful. Token:', accessToken);
    
            window.location.reload();
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 401) {
                toast.error('Tài khoản hoặc mật khẩu không đúng');
            } else {
                console.error('Login failed:', error.message);
                toast.error('Tài khoản hoặc mật khẩu không đúng');
            }
        }
    };
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="login-wrap">
            {/* <div className="login-html">
                <input id="tab-1" type="radio" name="tab" className="sign-in" checked /><label htmlFor="tab-1" className="tab">Đăng nhập</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab"></label>
                <div className="login-form">
                    <div className="sign-in-htm">
                        <div className="group">
                            <label htmlFor="user" className="label">Email</label>
                            <input id="user" type="email" className="input" value={username}
                                onChange={(e) => setUsername(e.target.value)} style={{ border: '1px solid black' }} />
                        </div>
                        <div className="group">
                            <label htmlFor="pass" className="label">Mật khẩu</label>
                            <input id="pass" type="password" className="input" data-type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} style={{ border: '1px solid black' }} />
                        </div>
                        <div className="hr"></div>
                        <div className="foot-lnk">
                            <a href="/quenmatkhau">Quên mật khẩu?</a>
                        </div>
                        <div className="group">
                            <button className='dangnhapthanhcong' onClick={handleLogin} disabled={loading} style={{ marginTop: '-56px' }}>
                                {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                            </button>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        </div>
                        <div className="foot-lnk1">
                            Bạn chưa có tài khoản? Đăng ký <a href='/dangki' style={{textDecoration: 'none', color: '#35CB6D'}}>Tại đây</a>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="form_login">
                <div className="login">
                    {/* <p>ĐĂNG NHẬP</p>
                     */}
                     <p style={{textAlign:'center',fontWeight:'bold',fontSize:'40px'}}>ĐĂNG NHẬP</p>
                    <div className="label">
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="email"
                                placeholder="name@example.com"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="floatingInputCustom">
                                Email
                            </label>
                        </Form.Floating>
                        <Form.Floating>
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress} 
                            />
                            <label htmlFor="floatingPasswordCustom">
                                Mật khẩu
                            </label>
                        </Form.Floating>
                        <div className="foot-lnk" style={{}}>
                            <a href="/quenmatkhau">Quên mật khẩu?</a>
                        </div>
                                                {/* <a href="/quenmatkhau">Quên mật khẩu?</a> */}
                    </div>
                    
                    <div className="btn-sign">
                    <button type="button" class="btn btn-outline-success"onClick={handleLogin} disabled={loading}>{loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}</button>
                    <hr></hr>
                    <div className="register">
                        <a>Bạn chưa có tài khoản? </a>
                        <Link  className='dangki' to="/Dangki">
                        <a className='dangki' style={{fontWeight:'650'}} href=''>Đăng ký</a>
                        </Link>
                    </div>
                    </div>
                    
                    
                </div>
            </div>

            <ToastContainer /> {/* Container để hiển thị thông báo */}
        </div>
    );
};

export default Login;
