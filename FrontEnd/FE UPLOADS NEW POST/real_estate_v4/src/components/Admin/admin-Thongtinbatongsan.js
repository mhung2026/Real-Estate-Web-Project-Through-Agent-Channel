import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CallApi from '../CallApi';

export default function ThongTinBatDongSan() {
    const { id } = useParams();
    
    const [realEstateDetails, setRealEstateDetails] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);

    useEffect(() => {
        const fetchRealEstateDetails = async () => {
            try {
                const response = await CallApi.getAllRealEstate();
                const foundRealEstate = response.find(item => item.id === parseInt(id));
                setRealEstateDetails(foundRealEstate);

                const locationResponse = await CallApi.getAllLocation();
                const foundLocation = locationResponse.find(location => location.id === foundRealEstate.locationId);
                setLocationInfo(foundLocation);

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

    if (!realEstateDetails || !locationInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Thông tin chi tiết bất động sản</h1>
            <p><strong>Tên:</strong> {realEstateDetails.realestateName}</p>
            <p><strong>Địa chỉ:</strong> {realEstateDetails.address}</p>
            <p><strong>Diện tích:</strong> {realEstateDetails.area}</p>
            <p><strong>Giá:</strong> {realEstateDetails.price}</p>
            <p><strong>Số phòng:</strong> {realEstateDetails.numberOfRooms}</p>
            <p><strong>Diện tích chiều dài:</strong> {realEstateDetails.length}</p>
            <p><strong>Diện tích chiều rộng:</strong> {realEstateDetails.width}</p>
            <h2>Thông tin vị trí</h2>
            <p><strong>Phường:</strong> {locationInfo.ward}</p>
            <p><strong>Quận:</strong> {locationInfo.district}</p>
            <p><strong>Tỉnh/Thành phố:</strong> {locationInfo.city}</p>
            <h2>Ảnh</h2>
            {realEstateDetails.realEstateImages.slice(1).map((image) => (
                <img
                    key={image.id}
                    src={image.imageUrl}
                    alt={image.imageName}
                    className="sub-image"
                    onClick={() => handleClick(image.imageUrl)}
                />
            ))}
        </div>
    );
}
