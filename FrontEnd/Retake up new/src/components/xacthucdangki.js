import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function XacThucDangKi() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [verifiedEmail, setVerifiedEmail] = useState('');
    const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')));

    useEffect(() => {
        // Chỉ gửi dữ liệu khi formData có giá trị
        if (formData) {
            const submitData = async () => {
                try {
                    const postData = {
                        roleId: formData.roleId,
                        username: formData.taiKhoan,
                        password: formData.matKhau,
                        phoneNumber: formData.soDienThoai,
                        email: formData.email,
                        address: formData.diaChi,
                        createAt: new Date().toISOString(),
                        status: true,
                    };

                    console.log('Dữ liệu gửi đi:', postData);

                    const response = await axios.post('http://swprealestatev2-001-site1.etempurl.com/api/account/TaoTaiKhoan', postData);

                    console.log(response.data);

                    setMessage('Xác thực email thành công, Chuyển hướng sau 6 giây...');
                    setVerifiedEmail(Cookies.get('email'));
                    setTimeout(() => {
                        navigate('/trangchu');
                    }, 6000);
                } catch (error) {
                    console.error('Lỗi khi gửi dữ liệu:', error);
                    setMessage('Có lỗi xảy ra khi xác thực email');
                }
                // Xóa formData khỏi localStorage sau khi gửi
                localStorage.removeItem('formData');
            };

            submitData();
        }
    }, [navigate]);

    // Hiển thị nếu formData không tồn tại để tránh việc gửi dữ liệu khi không cần thiết
    if (!formData) {
        return <div>Không có dữ liệu form để xác thực.</div>;
    }

    return (
        <div>
            <h1 style={{ color: 'red' }}>VUI LÒNG XÁC THỰC MAIL {verifiedEmail} CÙNG TRÌNH DUYỆT ĐANG ĐĂNG KÍ </h1>
            <h2>Đang xác thực Email: {verifiedEmail}</h2>
            <p>{message}</p>
        </div>
    );
}
