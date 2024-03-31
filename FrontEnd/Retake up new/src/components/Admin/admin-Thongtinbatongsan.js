import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CallApi from '../CallApi';

export default function ThongTinBatDongSan() {
    const { id } = useParams();

    const [realEstateDetails, setRealEstateDetails] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [InfomationInvestor, setInfomationInvestor] = useState([]);
    useEffect(() => {
        const fetchRealEstateDetails = async () => {
            try {
                const response = await CallApi.getAllRealEstate();
                const foundRealEstate = response.find(item => item.id === parseInt(id));
                setRealEstateDetails(foundRealEstate);

                const locationResponse = await CallApi.getAllLocation();
                const foundLocation = locationResponse.find(location => location.id === foundRealEstate.locationId);
                setLocationInfo(foundLocation);

                const callDataAllAccount = await CallApi.getAllAccount();
                const findIdCustomer = callDataAllAccount.find(IdCus => IdCus.id === foundRealEstate.investorId);
                setInfomationInvestor(findIdCustomer);
                setAccounts(callDataAllAccount);
            } catch (error) {
                console.error('Error fetching real estate details:', error);
            }
        };

        fetchRealEstateDetails();
    }, [id]);

    const handleClick = (imageUrl) => {
        // Handle click event for image here
        console.log('Image clicked:', imageUrl);
    };
    const getUsernameByCustomerId = (customerId) => {
        const account = accounts.find(item => item.id === customerId);
        return account ? account.username : 'Dữ liệu đang tải';
    };
    if (!realEstateDetails || !locationInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="real-estate-detail-container">
            <div className='customer-info'>
                <h2 className="title">Thông tin người đăng</h2>
                <p><strong>Tên Người Đăng:</strong> {getUsernameByCustomerId(realEstateDetails.investorId)}</p>
                <p><strong>Số Điện Thoại:</strong> {InfomationInvestor.phoneNumber}</p>
                <p><strong>Email:</strong> {InfomationInvestor.email}</p>
                <p><strong>Địa Chỉ:</strong> {InfomationInvestor.address}</p>
            </div>
            <div className='customer-info'>
                <h2 className="title">Thông tin chi tiết bất động sản</h2>
                <p><strong>Tên:</strong> {realEstateDetails.realestateName}</p>
                <p><strong>Địa chỉ:</strong> {realEstateDetails.address}</p>
                <p><strong>Diện tích:</strong> {realEstateDetails.area}</p>
                <p><strong>Giá:</strong> {realEstateDetails.price}</p>
                <p><strong>Số phòng:</strong> {realEstateDetails.roomNumber}</p>
                <p><strong>Diện tích chiều dài:</strong> {realEstateDetails.length}</p>
                <p><strong>Diện tích chiều rộng:</strong> {realEstateDetails.width}</p>
                <p><strong>Phường:</strong> {locationInfo.ward}</p>
                <p><strong>Quận:</strong> {locationInfo.district}</p>
                <p><strong>Tỉnh/Thành phố:</strong> {locationInfo.city}</p>
            </div>

            <div className='customer-info' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <h2 className="title">Ảnh chi tiết Villa</h2>
                {realEstateDetails.realEstateImages.slice(0).map((image) => (
                    <img
                        key={image.id}
                        src={image.imageUrl}
                        alt={image.imageName}
                        className="sub-image"
                        onClick={() => handleClick(image.imageUrl)}

                    />
                ))}
            </div>
        </div>
    );
}
