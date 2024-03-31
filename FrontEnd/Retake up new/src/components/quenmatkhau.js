import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase/FirebaseConfing';
import { sendPasswordResetEmail } from 'firebase/auth';
import CallApi from './CallApi';

import Form from "react-bootstrap/Form";
export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    useEffect(() => {
        const resetEmail = localStorage.getItem('resetEmail');
        if (resetEmail) {
            setEmail(resetEmail);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailVal = e.target.email.value;
        const allAccounts = await CallApi.getAllAccount();
        const accountExists = allAccounts.some(account => account.email === emailVal);
        if (!accountExists) {
            toast.error("Email không tồn tại.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, emailVal);
            localStorage.setItem('resetEmail', emailVal);
            toast.success("Vui lòng kiểm tra email để đổi mật khẩu.");
        } catch (error) {
            toast.error(error.code);
        }
    };

    return (
        <div className="register-form" style={{marginBottom:'20px',marginTop:'20px'}}>
            <div style={{margin:'20px'}}>
                {/* <h1>Quên mật khẩu</h1> */}
                <p style={{textAlign:'center',fontWeight:'bold',fontSize:'40px'}}>Quên mật khẩu</p>
                <form onSubmit={handleSubmit}>
                    {/* <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
                    <button type="submit">Reset</button>
                 */}
                    <Form.Floating>
                        <Form.Control
                            id="floatingPasswordCustom"
                            type="email"
                            placeholder="Password"
                            name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingPasswordCustom">
                            Email
                        </label>
                    </Form.Floating>
                    
                    <div style={{textAlign:'center'}}>
                    <button className='btn btn-outline-success'type="submit">Lấy lại mật khẩu</button>
                    </div>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
}
