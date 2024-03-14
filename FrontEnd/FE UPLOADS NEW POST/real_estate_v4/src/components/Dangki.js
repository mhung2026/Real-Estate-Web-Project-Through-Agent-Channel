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
                <h2 className='chonrole'>Vui lòng chọn vai trò trước khi đăng ký</h2>
                <div className='taorole'>
                    <button onClick={() => handleRoleChange(3)} style={{ marginRight: '20px', padding: ' 24px', borderRadius: '10px' }}>Khách hàng</button>
                    <button onClick={() => handleRoleChange(2)} style={{ marginRight: '20px', padding: ' 24px', borderRadius: '10px' }}>Chủ đầu tư</button>
                </div>
            </div>
        )}
        {roleSelected && (
            <div class="login-wrap">
                <div class="login-html">
                    <input id="tab-1" type="radio" name="tab" class="sign-in" checked /><label for="tab-1" class="tab">Đăng ký</label>
                    <form onSubmit={handleSubmit}>
                        <div class="group1">
                            <label for="user" class="label1">Email:</label>
                            <input type="email" name="email" class='inputtype' value={formData.email} onChange={handleChange} />
                        </div>
                        <div class="group1">
                            <label for="pass" class="label1">Họ Và Tên:</label>
                            <input type="text" name="taiKhoan" class='inputtype' value={formData.taiKhoan} onChange={handleChange} style={{
                                borderRadius: "50px",
                                border: "1px solid #000"
                            }} />
                        </div>
                        <div class="group1">
                            <label for="pass" class="label1">Mật khẩu:</label>
                            <input type="password" name="matKhau" class='inputtype' value={formData.matKhau} onChange={handleChange} />
                        </div>
                        <div class="group1">
                            <label for="pass" class="label1">Xác nhận lại mật khẩu:</label>
                            <input type="password" name="xacNhanMatKhau" class='inputtype' value={formData.xacNhanMatKhau} onChange={handleChange} />
                        </div>
                        <div class="group1">
                            <label for="phone" class="label1">Số điện thoại:</label>
                            <input type="text" name="soDienThoai" class='inputtype' value={formData.soDienThoai} onChange={handleChange} style={{ borderRadius: "50px",
                                border: "1px solid #000"}} />
                        </div>
                        <div class="group1">
                            <label for="phone" class="label1">Địa chỉ:</label>
                            <input type="text" name="diaChi" class='inputtype' value={formData.diaChi} onChange={handleChange} style={{ borderRadius: "50px",
                                border: "1px solid #000"}} />
                        </div>
                        <button type="submit" style={{ backgroundColor: "#35CB6D", width: '100%', borderRadius: "50px", border: "1px solid #000" }}>Đăng Ký</button>
                    </form>
                </div>
            </div>

        )}
    </div>
);
}

