import React, { useEffect, useState } from 'react';
import CallApi from '../CallApi';

export default function Adminallaccount() {
    const [accountData, setAccountData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const callDataAllAccount = await CallApi.getAllAccount();
                setAccountData(callDataAllAccount);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>All Accounts</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>username</th>
                        <th>RoleId</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Created At</th>
                        {/* We don't display passwords in a table */}
                    </tr>
                </thead>
                <tbody>
                    {accountData.map(account => (
                        <tr key={account.id}>
                            <td>{account.id}</td>
                            <td>{account.username}</td>
                            <td>{account.roleId}</td>
                            <td>{account.email}</td>
                            <td>{account.phoneNumber}</td>
                            <td>{account.address}</td>
                            <td>{account.createAt}</td>
                            {/* We don't display passwords in a table */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
