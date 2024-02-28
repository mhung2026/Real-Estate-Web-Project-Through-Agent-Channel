import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CallApi from './CallApi';
import FormValidation from './FormValidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dangki() {
    const [roleId, setRoleId] = useState(null);
    const [roleSelected, setRoleSelected] = useState(false);
    const [formData, setFormData] = useState({
        taiKhoan: '',
        matKhau: '',
        xacNhanMatKhau: '',
        soDienThoai: '',
        email: '',
        diaChi: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const callDataAllAccount = await CallApi.getAllAccount();
                callDataAllAccount.forEach(account => {
                    console.log('Username:', account.username);
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

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
            // Nếu dữ liệu không hợp lệ, không thực hiện tiếp các công việc khác
            return;
        }

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
            // Truy vấn tài khoản từ cơ sở dữ liệu
            const callDataAllAccount = await CallApi.getAllAccount();

            // Kiểm tra xem tài khoản đã tồn tại chưa
            const existingAccount = callDataAllAccount.find(account => account.username === formData.taiKhoan);
            if (existingAccount) {
                toast.error('Tài khoản đã tồn tại. Vui lòng chọn tài khoản khác.');
                return;
            }

            // Nếu tài khoản chưa tồn tại, thực hiện tạo mới
            const response = await axios.post('http://firstrealestate-001-site1.anytempurl.com/api/account/TaoTaiKhoan', postData);
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
        <div>
            <ToastContainer /> {/* Container để hiển thị thông báo */}
            {!roleSelected && (
                <div>
                    <h2>Chọn Vai Trò</h2>
                    <div>
                        <button onClick={() => handleRoleChange(3)}>Customer</button>
                        <button onClick={() => handleRoleChange(2)}>Investor</button>
                    </div>
                </div>
            )}
            {roleSelected && (
                <div>
                    <h2>Form Đăng Ký</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Tài khoản:</label>
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
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
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
