import React, { useState, useEffect } from 'react';
import CallApi from '../CallApi';
import CustomerMenu from './customer-menu';
import UserCustomer from '../../list/userCustomer';

export default function Customerdondat() {
    const [reservationId, setReservationId] = useState(null);
    const [realEstateId, setRealEstateId] = useState(null);
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const customerId = userLoginBasicInformationDto?.accountId;

    useEffect(() => {
        async function fetchData() {
            try {
                const callDataReservations = await CallApi.getAllReservations();
                const callDataRealEstateData = await CallApi.getAllRealEstate();
                if (callDataReservations && customerId) {
                    const foundReservation = CallApi.findReservationById(callDataReservations, customerId);
                    setReservationId(foundReservation);

                    if (callDataRealEstateData && foundReservation) {
                        const foundRealEstate = CallApi.findRealEstateById(callDataRealEstateData, foundReservation.realEstateId);
                        setRealEstateId(foundRealEstate);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [customerId]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    return (
        <div className='container'>
            <CustomerMenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserCustomer}
            />
            <div>
                {reservationId ? (
                    <div className='infobook'>
                        <h1>Thông tin đặt chỗ</h1>
                        <p><b>Stt đơn hàng:</b> {reservationId.id}</p>
                        <p><b>Ngày đặt lịch bất động sản: </b> {formatDate(reservationId.createAt)}</p>
                        <p><b>Tên khách hàng: </b> {userLoginBasicInformationDto?.username}</p>
                        {realEstateId ? (
                            <div>
                                <p><b>Tên bất động sản: </b> {realEstateId.realestateName}</p>
                                <p><b>Ngày xem bất động sản:</b> {formatDate(reservationId.bookingDate)}</p>
                                <p><b>Thông tin liên hệ người dẫn xem bất động sản: </b> Đang cập nhật .....</p>
                            </div>
                        ) : (
                            <p>Không tìm thấy thông tin bất động sản</p>
                        )}
                    </div>
                ) : (
                    <p>Loading... </p>
                )}
            </div>
        </div>
    );
}
