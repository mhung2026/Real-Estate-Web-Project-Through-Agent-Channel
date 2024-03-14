import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CallApi from '../CallApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminRealEstateDetail() {
    const { id } = useParams();

    const [realEstate, setRealEstate] = useState(null);
    const [foundLocation, setFoundLocation] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);

    useEffect(() => {
        const fetchRealEstateDetail = async () => {
            try {
                const realEstateResponse = await CallApi.getAllRealEstate();
                const findIdRes = realEstateResponse.find(IdRealestate => IdRealestate.id === parseInt(id));
                setRealEstate(findIdRes);

                const locationResponse = await CallApi.getAllLocation();
                const foundLocation = locationResponse.find(location => location.id === findIdRes.locationId);
                setFoundLocation(foundLocation);

                const callDataAllAccount = await CallApi.getAllAccount();
                const findIdCustomer = callDataAllAccount.find(IdCus => IdCus.id === parseInt(findIdRes.perimeter));
                setCustomerInfo(findIdCustomer);

            } catch (error) {
                console.error('Error fetching real estate detail:', error);
            }
        };

        fetchRealEstateDetail();
    }, [id]);

    const handleApprove = async () => {
        try {
            console.log('Real Estate Data:', realEstate);

            if (realEstate && realEstate.realEstateImages) {
                realEstate.listRealEstateImageUrl = realEstate.realEstateImages;
                delete realEstate.realEstateImages;
            }

            if (foundLocation) {
                realEstate.city = foundLocation.city;
                realEstate.district = foundLocation.district;
                realEstate.ward = foundLocation.ward;
            }

            // Thay đổi giá trị status tương ứng
            if (realEstate.status === 3) {
                realEstate.status = 4; // Nếu status hiện tại là 3, chuyển thành 4
            } else if (realEstate.status === 5) {
                realEstate.status = 6; // Nếu status hiện tại là 5, chuyển thành 6
            }

            const response = await axios.put(`http://firstrealestate-001-site1.anytempurl.com/api/invester/updatePostById/${id}`, realEstate);

            console.log('Response:', response.data);
            toast.success("Duyệt Thành Công !"); // Thông báo duyệt thành công
        } catch (error) {
            console.error('Error approving real estate:', error);
            toast.error("Error approving real estate."); // Thông báo lỗi khi duyệt bất động sản
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
            toast.success("Real estate rejected successfully."); // Thông báo không duyệt thành công
            // Xử lý response ở đây nếu cần

            console.log('Từ chối duyệt thành công');
            // Thực hiện các hành động sau khi không duyệt thành công
        } catch (error) {
            console.error('Error rejecting real estate:', error);
            toast.error("Error rejecting real estate."); // Thông báo lỗi khi không duyệt bất động sản
        }
    };

    if (!realEstate || !foundLocation || !customerInfo) {
        return <div>Loading...</div>;
    }

    const getRealEstateStatusById = (realEstateId) => {
        switch (realEstateId) {
            case 3:
                return 'Đang chờ phê duyệt cọc';
            case 4:
                return 'Phê duyệt cọc thành công';
            case 5:
                return 'Đang chờ phê duyệt bán';
            case 6:
                return 'Đang chờ bán thành công';
            default:
                return 'Trạng thái không xác định';
        }
    };

    return (
        <div className="real-estate-detail-container">
            <h2 className="title">Thông tin chi tiết Villa</h2>
            <div className="status">Trạng thái: {getRealEstateStatusById(realEstate.status)}</div>
                <p>ID: {realEstate.id}</p>
                <p>Name: {realEstate.perimeter}</p>
                <p>City: {foundLocation.city}</p>
                <p>District: {foundLocation.district}</p>
                <p>Ward: {foundLocation.ward}</p>
                <img src={realEstate.firebaseId} alt="Ảnh Đặt Cọc" style={{ maxWidth: '400px', height: 'auto' }} className="image" />

                {customerInfo && (
                    <div className="customer-info">
                        <h3>Thông tin khách hàng:</h3>
                        <p>Username: {customerInfo.username}</p>
                        <p>Phone Number: {customerInfo.phoneNumber}</p>
                        <p>Email: {customerInfo.email}</p>
                    </div>
                )}

                {realEstate.status !== 8 && (
                    <button onClick={handleReject} className="reject-button">Không Duyệt</button>
                )}
                <button onClick={handleApprove} className="approve-button">Duyệt</button>
                <ToastContainer /> {/* Thông báo toàn cục */}
            </div>
    
    );
}
