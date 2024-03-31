import InvestorMenu from './investor-menu';
import UserInvestor from '../../list/userInvestor';
import React, { useEffect, useState } from 'react';
import CallApi from '../CallApi';
import axios from 'axios'; // Import Axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Customerthongtintaikhoan() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const userid = userLoginBasicInformationDto ? userLoginBasicInformationDto.accountId : null;
    const [userAccount, setUserAccount] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userid) {
                    const callDataAllAccount = await CallApi.getAllAccount();
                    const userAccountData = callDataAllAccount.find(account => account.id === userid);
                    setUserAccount(userAccountData);
                }
            } catch (error) {
                console.error('Error fetching account data:', error.message);
            }
        };

        fetchData();
    }, [userid]);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveSuccess = async () => {
        try {
            const callDataAllAccount = await CallApi.getAllAccount();
            const userAccountData = callDataAllAccount.find(account => account.id === userid);
            setUserAccount(userAccountData);
        } catch (error) {
            console.error('Error fetching updated account data:', error.message);
        }
    };

    return (
        <div className='container'>
            <InvestorMenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserInvestor}
            />
            <div className="col-md-9 thongtintaikhoan">
                {userAccount && (
                    <div>
                        <h2>Thông tin tài khoản của bạn:</h2>
                        {editing ? (
                            <EditForm
                                userAccount={userAccount}
                                onSaveSuccess={handleSaveSuccess}
                                onCancel={() => setEditing(false)}
                            />
                        ) : (
                            <div>
                                <p><b>Họ và tên: </b> {userAccount.username}</p>
                                <p><b>Số điện thoại:</b> {userAccount.phoneNumber}</p>
                                <p><b>Email:</b> {userAccount.email}</p>
                                <p><b>Địa chỉ:</b> {userAccount.address}</p>
                                <button class="btn btn-outline-success" onClick={handleEditClick}>Chỉnh sửa</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

const EditForm = ({ userAccount, onSaveSuccess, onCancel }) => {
    const [editedInfo, setEditedInfo] = useState({
        username: userAccount.username,
        phoneNumber: userAccount.phoneNumber,
        address: userAccount.address,
        password: userAccount.password, // Don't populate password initially
        updateAt: new Date().toISOString(),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://swprealestatev2-001-site1.etempurl.com/api/account/CapNhatTaiKhoan/${userAccount.id}`, editedInfo);
            console.log("Dữ liệu đã được cập nhật thành công!");
            toast.success("Dữ liệu đã được cập nhật thành công!");
            onSaveSuccess(); // Call onSaveSuccess to fetch updated data
            // Set editing state back to true to return to edit mode
            onCancel();
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu:', error.message);
        }
    };

    return (
        <div>
            <h2>Chỉnh sửa thông tin:</h2>
            <p>
                <label>
                    Họ và tên:
                    <input type="text" name="username" value={editedInfo.username} onChange={handleChange} />
                </label>
            </p>
            <p>
                <label>
                    Số điện thoại:
                    <input type="text" name="phoneNumber" value={editedInfo.phoneNumber} onChange={handleChange} />
                </label>
            </p>
            <p>
                <label>
                    Địa chỉ:
                    <input type="text" name="address" value={editedInfo.address} onChange={handleChange} />
                </label>
            </p>
            <div style={{ margin: '20px' }}>
                <button class="btn btn-outline-success" onClick={handleSave}>Lưu</button>
            </div>
            <div style={{ margin: '20px' }}>
                <button class="btn btn-outline-success" onClick={onCancel}>Hủy</button>
            </div>
        </div>
    );
};
