import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CallApi from '../CallApi';

export default function AdminRealEstateDetail() {
    const { id } = useParams();

    const [realEstate, setRealEstate] = useState(null);
    const [foundLocation, setFoundLocation] = useState(null);

    useEffect(() => {
        const fetchRealEstateDetail = async () => {
            try {
                const realEstateResponse = await CallApi.getAllRealEstate();
                const findIdRes = realEstateResponse.find(IdRealestate => IdRealestate.id === parseInt(id));
                setRealEstate(findIdRes); // Set realEstate with the found result

                const locationResponse = await CallApi.getAllLocation();
                const foundLocation = locationResponse.find(location => location.id === findIdRes.locationId);
                setFoundLocation(foundLocation); // Set foundLocation with the found location data
               
            } catch (error) {
                console.error('Error fetching real estate detail:', error);
            }
        };

        fetchRealEstateDetail();
    }, [id]);

    const handleApprove = async () => {
        try {
            // Ghi ra console log giá trị của realEstate
            console.log('Real Estate Data:', realEstate);

            // Đổi tên realEstateImages thành listRealEstateImageUrl
            if (realEstate && realEstate.realEstateImages) {
                realEstate.listRealEstateImageUrl = realEstate.realEstateImages;
                delete realEstate.realEstateImages;
            }

            // Thêm city, district và ward vào realEstate trước khi gửi
            if (foundLocation) {
                realEstate.city = foundLocation.city;
                realEstate.district = foundLocation.district;
                realEstate.ward = foundLocation.ward;
            }

            // Thay đổi giá trị status thành 7
            realEstate.status = 4;

            // Thực hiện request POST tới URL Swagger với dữ liệu realEstate
            const response = await axios.put(`http://firstrealestate-001-site1.anytempurl.com/api/invester/updatePostById/${id}`, realEstate);

            console.log('Response:', response.data);
            // Xử lý response ở đây nếu cần

            console.log('Real estate approved successfully.');
            // Thực hiện các hành động sau khi duyệt thành công
        } catch (error) {
            console.error('Error approving real estate:', error);
        }
    };

    const handleReject = async () => {
        try {
            console.log('Real Estate Data:', realEstate);

            // Đổi tên realEstateImages thành listRealEstateImageUrl
            if (realEstate && realEstate.realEstateImages) {
                realEstate.listRealEstateImageUrl = realEstate.realEstateImages;
                delete realEstate.realEstateImages;
            }

            // Thêm city, district và ward vào realEstate trước khi gửi
            if (foundLocation) {
                realEstate.city = foundLocation.city;
                realEstate.district = foundLocation.district;
                realEstate.ward = foundLocation.ward;
            }

            // Thay đổi giá trị status thành 8
            realEstate.status = 2;

            // Thực hiện request POST tới URL Swagger với dữ liệu realEstate
            const response = await axios.put(`http://firstrealestate-001-site1.anytempurl.com/api/invester/updatePostById/${id}`, realEstate);

            console.log('Response:', response.data);
            // Xử lý response ở đây nếu cần

            console.log('Real estate rejected successfully.');
            // Thực hiện các hành động sau khi không duyệt thành công
        } catch (error) {
            console.error('Error rejecting real estate:', error);
        }
    };

    if (!realEstate || !foundLocation) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Real Estate Detail</h2>
            <p>ID: {realEstate.id}</p>
            <p>Name: {realEstate.perimeter}</p>
            <p>City: {foundLocation.city}</p>
            <p>District: {foundLocation.district}</p>
            <p>Ward: {foundLocation.ward}</p>
            {/* Trong JSX */}
            <img src={realEstate.firebaseId} alt="Ảnh Đặt Cọc" style={{ maxWidth: '400px', height: 'auto' }} />

            {realEstate.status !== 8 && (
                <button onClick={handleReject}>Không Duyệt</button>
            )}
            <button onClick={handleApprove}>Duyệt</button>
            {/* Add more details as needed */}
        </div>
    );
}
