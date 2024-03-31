import React, { useEffect, useState } from 'react';
import CallApi from '../CallApi';
import Adminmenu from "./admin-menu";
import UserAdmin from '../../list/userIAdmin';
export default function AdminAllAccount() {
    const [accountData, setAccountData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [selectedRoleId, setSelectedRoleId] = useState('');
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const callDataAllAccount = await CallApi.getAllAccount();
                setAccountData(callDataAllAccount.filter(account => account.status !== false));
                const callDataAllRole = await CallApi.getAllRole();
                setRoleData(callDataAllRole);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const getRoleNameByRoleId = (roleId) => {
        const role = roleData.find(role => role.id === roleId);
        return role ? role.roleName : 'Unknown';
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
        const year = date.getFullYear();

        // Đảm bảo ngày và tháng hiển thị với 2 chữ số bằng cách thêm '0' nếu cần
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        return formattedDay + '/' + formattedMonth + '/' + year;
    };

    const filteredAccounts = selectedRoleId
        ? accountData.filter(account => account.roleId.toString() === selectedRoleId)
        : accountData;

    return (
        <div className="admin-all-account">
            <div>
                <Adminmenu
                    userLoginBasicInformationDto={userLoginBasicInformationDto}
                    UserMenu={UserAdmin}
                />
            </div>
            <div className='table-container' style={{marginRight:'100px'}}>
                <div className="account-list">
                    <h2 className="account-list-title" style={{marginTop:'100px', fontWeight:'bold'}}>Tất Cả Tài Khoản</h2>
                    <div className="role-filter">
                        <select className="role-filter-select" value={selectedRoleId} onChange={e => setSelectedRoleId(e.target.value)}>
                            <option value="">Tất cả vai trò</option>
                            {roleData.map(role => (
                                <option key={role.id} value={role.id}>{role.roleName}</option>
                            ))}
                        </select>
                    </div>
                    <table className="account-table">
                        <thead>
                            <tr>
                                <th className="account-table-header">ID</th>
                                <th className="account-table-header">Họ và tên</th>
                                <th className="account-table-header">Vai trò</th>
                                <th className="account-table-header">Email</th>
                                <th className="account-table-header">Số điện thoại</th>
                                <th className="account-table-header">Địa chỉ</th>
                                <th className="account-table-header">Ngày tạo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAccounts.map(account => (
                                <tr key={account.id}>
                                    <td>{account.id}</td>
                                    <td>{account.username}</td>
                                    <td>{getRoleNameByRoleId(account.roleId)}</td>
                                    <td>{account.email}</td>
                                    <td>{account.phoneNumber}</td>
                                    <td>{account.address}</td>
                                    <td>{formatDate(account.createAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
