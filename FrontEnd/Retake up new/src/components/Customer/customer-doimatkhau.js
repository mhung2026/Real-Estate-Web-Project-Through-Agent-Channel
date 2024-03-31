import CustomerMenu from './customer-menu';
import UserCustomer from '../../list/userCustomer';
import React, { useEffect, useState } from 'react';
import CallApi from '../CallApi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InvestorDoimatkhau() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const [userAccount, setUserAccount] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getAllAccount = await CallApi.getAllAccount();
                const userAccount = getAllAccount.find(account => account.id === userLoginBasicInformationDto.accountId);
                setUserAccount(userAccount);

            } catch (error) {
                console.error("Error at fetchData", error);
            }
        };
        fetchData();
    }, []);

    const handleChangePassword = async () => {
        // Kiểm tra xem có nhập đủ thông tin mật khẩu cũ, mật khẩu mới và xác nhận mật khẩu mới không
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("Vui lòng nhập đủ thông tin mật khẩu cũ, mật khẩu mới và xác nhận mật khẩu mới!");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }

        // Kiểm tra mật khẩu mới theo các yêu cầu
        if (newPassword.length < 6) {
            toast.error("Mật khẩu phải chứa ít nhất 6 kí tự!");
            return;
        }

        if (!/[A-Z]/.test(newPassword)) {
            toast.error("Mật khẩu phải chứa ít nhất 1 kí tự viết hoa!");
            return;
        }

        if (/\s/.test(newPassword)) {
            toast.error("Mật khẩu không được chứa khoảng trắng!");
            return;
        }

        try {
            const accountData = userAccount;

            // So sánh mật khẩu nhập vào với mật khẩu trong cơ sở dữ liệu
            if (oldPassword !== accountData.password) {
                toast.error("Mật khẩu cũ không đúng!");
                return;
            }

            // Cập nhật mật khẩu mới
            await axios.put(
                `http://swprealestatev2-001-site1.etempurl.com/api/account/CapNhatTaiKhoan/${userLoginBasicInformationDto.accountId}`,
                {
                    username: userAccount.username,
                    phoneNumber: userAccount.phoneNumber,
                    address: userAccount.address,
                    updateAt: new Date().toISOString(),
                    password: newPassword,
                    // Thêm các thông tin khác nếu cần
                }
            );

            // Xử lý kết quả nếu cần
            toast.success('Đã đổi mật khẩu thành công!');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Đã xảy ra lỗi khi đổi mật khẩu');
        }
    };

    return (
        <div className='container'>
            <ToastContainer />
            <CustomerMenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserCustomer}
            />
            <div className="change-password-form">
                <div className="form-group">
                    <label htmlFor="oldPassword">Mật khẩu cũ:</label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Mật khẩu mới:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleChangePassword}>Đổi mật khẩu</button>
            </div>
        </div>
    )
}
