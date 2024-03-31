import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CallApi from '../CallApi';
import FormValidation from '../FormValidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adminmenu from "./admin-menu";
import UserAdmin from '../../list/userIAdmin';
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
export default function AdminCreaccountagency() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const [formData, setFormData] = useState({
        taiKhoan: '',
        matKhau: '',
        xacNhanMatKhau: '',
        soDienThoai: '',
        email: '',
        diaChi: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!FormValidation.validateFormData(formData)) {
            // Nếu dữ liệu không hợp lệ, không thực hiện tiếp các công việc khác
            return;
        }

        const postData = {
            roleId: 1, // Mặc định set roleId là 1
            username: formData.taiKhoan,
            password: formData.matKhau,
            phoneNumber: formData.soDienThoai,
            email: formData.email,
            address: formData.diaChi,
            createAt: new Date().toISOString(),
            status: true
        };

        try {
            // Truy vấn tài khoản từ cơ sở dữ liệu
            const callDataAllAccount = await CallApi.getAllAccount();

            // Kiểm tra xem tài khoản đã tồn tại chưa
            const existingAccount = callDataAllAccount.find(account => account.username === formData.taiKhoan);
            if (existingAccount) {
                toast.error('Tài khoản đã tồn tại. Vui lòng chọn tài khoản khác.');
                return;
            }

            // Nếu tài khoản chưa tồn tại, thực hiện tạo mới
            const response = await axios.post('http://swprealestatev2-001-site1.etempurl.com/api/account/TaoTaiKhoan', postData);
            console.log('Đăng ký thành công:', response.data);
            toast.success('Đăng ký thành công');
            // Chuyển hướng sau khi đăng ký thành công
            window.location.href = '/dangnhap';
        } catch (error) {
            console.error('Đăng ký thất bại:', error);
            toast.error('Đăng ký thất bại');
            // Đặt logic xử lý khi đăng ký thất bại ở đây, ví dụ: hiển thị thông báo lỗi
        }
    };

    return (
        <div >
            <ToastContainer /> {/* Container để hiển thị thông báo */}

            <div className="admin-container">
                <Adminmenu
                    userLoginBasicInformationDto={userLoginBasicInformationDto}
                    UserMenu={UserAdmin}
                />

                <div className='admin-container-main'>
                    <div className='admin-container-main-part1'>
                        <h2 style={{ fontWeight: "bold" }}>Đăng Kí Tài Khoản cho Agency</h2>
                        <form onSubmit={handleSubmit}>

                            <Form.Floating>
                                <Form.Control
                                    id="floatingPasswordCustom"
                                    type="text"
                                    placeholder="Họ và Tên"
                                    name="taiKhoan" // Đặt thuộc tính name
                                    value={formData.taiKhoan}
                                    onChange={handleChange}
                                />
                                <label htmlFor="floatingPasswordCustom">
                                    Họ và Tên
                                </label>
                            </Form.Floating>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingPasswordCustom"
                                    type="password"
                                    name="matKhau"
                                    placeholder="Mật khẩu"
                                    value={formData.matKhau} onChange={handleChange}
                                />
                                <label htmlFor="floatingPasswordCustom">
                                    Mật khẩu
                                </label>
                            </Form.Floating>

                            <Form.Floating>
                                <Form.Control
                                    id="floatingPasswordCustom"
                                    type="password"
                                    placeholder="Mật khẩu"
                                    name="xacNhanMatKhau" value={formData.xacNhanMatKhau} onChange={handleChange}
                                />
                                <label htmlFor="floatingPasswordCustom">
                                    Xác nhận mật khẩu
                                </label>
                            </Form.Floating>

                            <Form.Floating>
                                <Form.Control
                                    id="floatingPasswordCustom"
                                    type="tel"
                                    placeholder="Mật khẩu"
                                    name="soDienThoai" value={formData.soDienThoai} onChange={handleChange}
                                /><label htmlFor="floatingPasswordCustom">
                                    Số điện thoại
                                </label>
                            </Form.Floating>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingPasswordCustom"
                                    type="email"
                                    placeholder="email"
                                    name="email" value={formData.email} onChange={handleChange}
                                />
                                <label htmlFor="floatingPasswordCustom">
                                    Email
                                </label>
                            </Form.Floating>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingPasswordCustom"
                                    type="text"
                                    placeholder="email"
                                    name="diaChi" value={formData.diaChi} onChange={handleChange}
                                />
                                <label htmlFor="floatingPasswordCustom">
                                    Địa chỉ
                                </label>
                            </Form.Floating>
                            <button type="submit" class="btn btn-outline-success">Đăng Ký</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
