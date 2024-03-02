import React, { useEffect, useState } from 'react';
import CallApi from '../CallApi';

export default function AdminAllAccount() {
    const [accountData, setAccountData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [selectedRoleId, setSelectedRoleId] = useState(''); // Thêm state này để lưu trữ roleId được chọn

    useEffect(() => {
        const fetchData = async () => {
            try {
                const callDataAllAccount = await CallApi.getAllAccount();
                setAccountData(callDataAllAccount);
                const callDataAllRole = await CallApi.getAllRole(); // Đảm bảo tên hàm đúng như trong CallApi của bạn
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

    // Hàm lọc accountData dựa trên selectedRoleId
    const filteredAccounts = selectedRoleId
        ? accountData.filter(account => account.roleId.toString() === selectedRoleId)
        : accountData;

    return (
        <div>
            <h2 style={{ marginBottom: '20px', marginTop: '20px', textAlign: 'center' }}>All Accounts</h2>
            {/* Dropdown để chọn RoleId để lọc */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <select value={selectedRoleId} onChange={e => setSelectedRoleId(e.target.value)}>
                    <option value="">All Roles</option>
                    {roleData.map(role => (
                        <option key={role.id} value={role.id}>{role.roleName}</option>
                    ))}
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>RoleId</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Created At</th>
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
                            <td>{account.createAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
