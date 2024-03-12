import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormValidation from './FormValidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CallApi from './CallApi';

export default function Dangki() {
    const [roleId, setRoleId] = useState(null);
    const [roleSelected, setRoleSelected] = useState(false);
    const [allAccounts, setAllAccounts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allAccountResponse = await CallApi.getAllAccount();
                setAllAccounts(allAccountResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        taiKhoan: '',
        matKhau: '',
        xacNhanMatKhau: '',
        soDienThoai: '',
        email: '',
        diaChi: ''
    });

    const handleRoleChange = (id) => {
        setRoleId(id);
        setRoleSelected(true);
    };

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
            return;
        }

        const existingEmail = allAccounts.find(account => account.email === formData.email);
        if (existingEmail) {
            toast.error('Email đã tồn tại!');
            return;
        }

        const postData = {
            roleId: roleId,
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
            toast.success('Đăng kí thành công!', {
                onClose: () => window.location.href = '/dangnhap'
            });
        } catch (error) {
            console.error('Đăng ký thất bại:', error);
            toast.error('Đăng kí thất bại!');
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            {!roleSelected && (
                <div className='rolemoi'>
                    <h2 className='chonrole'>Chọn Vai Trò</h2>
                    <div className='taorole'>
                        <button onClick={() => handleRoleChange(3)} style={{ marginRight: '20px', padding: ' 24px', borderRadius: '10px' }}>Customer</button>
                        <button onClick={() => handleRoleChange(2)} style={{ marginRight: '20px', padding: ' 24px', borderRadius: '10px' }}>Investor</button>
                    </div>
                </div>
            )}
            {roleSelected && (
                <div className='formdangkytaikhoan'>
                    <h2>Đăng ký tài khoản</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Họ Và Tên:</label>
                            <input type="text" name="taiKhoan" value={formData.taiKhoan} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Mật khẩu:</label>
                            <input type="password" name="matKhau" value={formData.matKhau} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Xác nhận lại mật khẩu:</label>
                            <input type="password" name="xacNhanMatKhau" value={formData.xacNhanMatKhau} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Số điện thoại:</label>
                            <input type="text" name="soDienThoai" value={formData.soDienThoai} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Địa chỉ:</label>
                            <input type="text" name="diaChi" value={formData.diaChi} onChange={handleChange} />
                        </div>
                        <button type="submit">Đăng Ký</button>
                    </form>
                </div>
            )}
        </div>
    );
}
