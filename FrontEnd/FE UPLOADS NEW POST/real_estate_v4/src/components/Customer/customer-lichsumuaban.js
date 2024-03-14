import React, { useState, useEffect } from 'react';
import CallApi from '../CallApi';
import CustomerMenu from './customer-menu';
import UserCustomer from '../../list/userCustomer';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function CustomerLichsumuaban() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const [filteredRealEstates, setFilteredRealEstates] = useState([]);
    const [accounts, setAccounts] = useState([]); // State to store accounts
    const [foundLocation, setFoundLocation] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const allRealEstate = await CallApi.getAllRealEstate();
                const filteredRealEstate = allRealEstate.filter(estate => estate.perimeter === userLoginBasicInformationDto.accountId.toString() && estate.status !== 1 && estate.status !== 2);

                setFilteredRealEstates(filteredRealEstate);
    
                if (filteredRealEstate.length > 0) {
                    const locationIds = filteredRealEstate.map(estate => estate.locationId);
                    const locationResponse = await CallApi.getAllLocation();
                    const foundLocations = locationResponse.find(location => locationIds.includes(location.id));
                    setFoundLocation(foundLocations); // Set found locations data
                }
    
                const allAccounts = await CallApi.getAllAccount();
                setAccounts(allAccounts); // Set accounts data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    
        fetchData();
    }, []);

    const getUsernameByCustomerId = (customerId) => {
        const account = accounts.find(item => item.id === customerId);
        return account ? account.username : 'Unknown';
    };

    const getRealEstateStatusById = (realEstateId) => {
        switch (realEstateId) {
            case 3:
                return 'Đang chờ phê duyệt cọc';
            case 4:
                return 'Phê duyệt cọc thành công';
            case 5:
                return 'Đang chờ phê duyệt bán';
            case 6:
                return 'Bán thành công';
            default:
                return 'Trạng thái không xác định';
        }
    };

    const handleCancelDeposit = async (realEstate) => {
        try {
            if (realEstate && realEstate.realEstateImages) {
                realEstate.listRealEstateImageUrl = realEstate.realEstateImages;
                delete realEstate.realEstateImages;
            }
    
            if (foundLocation) {
                realEstate.city = foundLocation.city;
                realEstate.district = foundLocation.district;
                realEstate.ward = foundLocation.ward;
            }
    
            // Set status to 2 for cancelling deposit
            realEstate.status = 2;
    
            const response = await axios.put(`http://firstrealestate-001-site1.anytempurl.com/api/invester/updatePostById/${realEstate.id}`, realEstate);
    
            console.log('Response:', response.data);
            console.log('Real estate deposit cancelled successfully.');
    
            // Show success toast
            toast.success('Hủy cọc thành công');
    
            // Reload the page
            window.location.reload();
        } catch (error) {
            console.error('Error cancelling deposit:', error);
        }
    };

    return (
        <div className='container'>
            <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <CustomerMenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserCustomer}
            />
            <div>
                <h1>Lịch sử mua bán</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Tên Bất Động Sản</th>
                            <th>Tên Khách Hàng</th>
                            <th>Trạng Thái Mua Bán</th>
                            {filteredRealEstates.some(estate => estate.status !== 6) && <th>Hủy Đặt Cọc</th>}
                            {/* Add more headers if needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRealEstates.map((estate, index) => (
                            <tr key={index}>
                                <td>{estate.realestateName}</td>
                                <td>{getUsernameByCustomerId(parseInt(estate.perimeter))}</td>
                                <td>{getRealEstateStatusById(estate.status)}</td>
                                {estate.status !== 6 && (
                                    <td>
                                        <button onClick={() => handleCancelDeposit(estate)} style={{backgroundColor: "#35CB6D"}}>Hủy Cọc</button>
                                    </td>
                                )}
                                {/* Add more cells with other properties */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
