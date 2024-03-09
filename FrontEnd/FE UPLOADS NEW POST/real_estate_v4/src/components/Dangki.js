import React, { Component } from 'react';
import axios from 'axios';
import CallApi from './CallApi';
import FormValidation from './FormValidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Dangki extends Component {
    state = {
        roleId: null,
        roleSelected: false,
        formData: {
            taiKhoan: '',
            matKhau: '',
            xacNhanMatKhau: '',
            soDienThoai: '',
            email: '',
            diaChi: ''
        },
        verificationCode: '',
        inputVerificationCode: '',
        isVerificationCodeSent: false,
    };

    handleRoleChange = (id) => {
        this.setState({ roleId: id, roleSelected: true });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    };

    handleVerificationCodeChange = (e) => {
        this.setState({ inputVerificationCode: e.target.value });
    };

    sendVerificationCode = async () => {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const { email } = this.state.formData;

        try {
            await axios.post('/send-verification-code', { email, verificationCode });
            this.setState({ verificationCode, isVerificationCodeSent: true });
            toast.success('Mã xác thực đã được gửi đến email của bạn');
        } catch (error) {
            toast.error('Không thể gửi mã xác thực');
            console.error('Error sending verification code:', error);
        }
    };

    verifyCodeAndRegister = async () => {
        const { inputVerificationCode, verificationCode, formData, roleId } = this.state;
        if (inputVerificationCode !== verificationCode) {
            toast.error('Mã xác thực không đúng');
            return;
        }

        // Tạo postData để gửi lên server
        const postData = {
            roleId,
            username: formData.taiKhoan,
            password: formData.matKhau,
            phoneNumber: formData.soDienThoai,
            email: formData.email,
            address: formData.diaChi,
            createAt: new Date().toISOString(),
            status: true
        };

        try {
            const response = await axios.post('http://firstrealestate-001-site1.anytempurl.com/api/account/TaoTaiKhoan', postData);
            console.log('Đăng ký thành công:', response.data);
            toast.success('Đăng ký thành công');
            window.location.href = '/dangnhap';
        } catch (error) {
            console.error('Đăng ký thất bại:', error);
            toast.error('Đăng ký thất bại');
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        if (!FormValidation.validateFormData(this.state.formData)) {
            return;
        }

        this.sendVerificationCode();
    };

    render() {
        const { roleSelected, formData, isVerificationCodeSent } = this.state;

        return (
            <div>
                <ToastContainer />
                {!roleSelected && (
                    <div className='rolemoi'>
                        {/* UI để chọn vai trò */}
                        <h2 className='chonrole'>Chọn Vai Trò</h2>
                        <div className='taorole'>
                            <button onClick={() => this.handleRoleChange(3)} style={{ marginRight: '20px', padding: ' 24px', borderRadius: '10px' }}>Customer</button>
                            <button onClick={() => this.handleRoleChange(2)} style={{ marginRight: '20px', padding: ' 24px', borderRadius: '10px' }}>Investor</button>
                        </div>
                    </div>
                )}
                {roleSelected && !isVerificationCodeSent && (
                    <div className='formdangkytaikhoan'>
                        {/* Form đăng ký */}
                        <h2>Đăng ký tài khoản</h2>
                        <form onSubmit={this.handleSubmit}>
                            {/* Các trường input cho form */}
                            <div>
                                <label>Tài khoản:</label>
                                <input type="text" name="taiKhoan" value={formData.taiKhoan} onChange={this.handleChange} />
                            </div>
                            {/* Thêm các trường input khác ở đây */}
                            <div>
                            <label>Mật khẩu:</label>
                            <input type="password" name="matKhau" value={formData.matKhau} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label>Xác nhận lại mật khẩu:</label>
                            <input type="password" name="xacNhanMatKhau" value={formData.xacNhanMatKhau} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label>Số điện thoại:</label>
                            <input type="text" name="soDienThoai" value={formData.soDienThoai} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label>Địa chỉ:</label>
                            <input type="text" name="diaChi" value={formData.diaChi} onChange={this.handleChange} />
                        </div>
                            <button type="submit">Đăng Ký</button>
                        </form>
                    </div>
                )}
                {isVerificationCodeSent && (
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập mã xác thực"
                            onChange={this.handleVerificationCodeChange}
                        />
                        <button onClick={this.verifyCodeAndRegister}>Xác nhận</button>
                    </div>
                )}
            </div>
        );
    }
}
