import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom
import CallApi from '../CallApi';

export default function AdminDuyetdatcoc() {
    const [realEstatesWithPerimeter, setRealEstatesWithPerimeter] = useState([]);
    const [realEstates, setRealEstates] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate(); // Sử dụng hook useNavigate

    useEffect(() => {
        const fetchRealEstate = async () => {
            try {
                const allRealEstateResponse = await CallApi.getAllRealEstate();
                const realEstatesWithPerimeter = allRealEstateResponse.filter(re => re.perimeter);
                setRealEstatesWithPerimeter(realEstatesWithPerimeter);
                const callDataRealEstateData = await CallApi.getAllRealEstate();
                setRealEstates(callDataRealEstateData);
                const callDataAllAccount = await CallApi.getAllAccount();
                setAccounts(callDataAllAccount);
            } catch (error) {
                console.error('Error fetching real estate data:', error);
            }
        };

        fetchRealEstate();
    }, []);
    const getRealEstateNameById = (realEstateId) => {
        const realEstate = realEstates.find(item => item.id === realEstateId);
        return realEstate ? realEstate.realestateName : 'Dữ liệu đang tải';
    };

    const getUsernameByCustomerId = (customerId) => {
        const account = accounts.find(item => item.id === customerId);
        return account ? account.username : 'Dữ liệu đang tải';
    };
    // Hàm xử lý chuyển hướng khi nhấp vào tên real estate
    const handleRealEstateClick = (realEstateId) => {
        navigate(`/real-estate/${realEstateId}`);
    };

    return (
        <div id="admin-table-div">
            <h2>Admin duyệt đặt cọc (hoặc bán)</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {realEstatesWithPerimeter.map(realEstate => (
                        <tr key={realEstate.id}>
                            <td>{getRealEstateNameById(realEstate.id)}</td>
                            <td onClick={() => handleRealEstateClick(realEstate.id)} style={{ cursor: 'pointer' }}>{getUsernameByCustomerId(parseInt(realEstate.perimeter))}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
          
        </div>
    );
}
