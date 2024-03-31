import React, { useState, useEffect } from 'react';
import CallApi from '../CallApi';
import axios from 'axios';
import CustomerMenu from './customer-menu';
import UserCustomer from '../../list/userCustomer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Customerdondat() {
    const [realEstates, setRealEstates] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [customerReservation, setCustomerReservation] = useState([]);
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const customerId = userLoginBasicInformationDto.accountId;

    useEffect(() => {
        fetchData();
    }, [customerId]); // Chỉ gọi lại useEffect khi customerId thay đổi

    const fetchData = async () => {
        try {
            const callDataReservations = await CallApi.getAllReservations();
            const filteredReservations = callDataReservations.filter(reservation => (reservation.status === 2 || reservation.status === 1) && reservation.customerId === customerId);
            setCustomerReservation(filteredReservations);
            const callDataRealEstateData = await CallApi.getAllRealEstate();
            setRealEstates(callDataRealEstateData);
            const callDataAllAccount = await CallApi.getAllAccount();
            setAccounts(callDataAllAccount);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const cancelReservation = async (id, reservation) => {
        try {
            const requestData = {
                status: 4,
                realEstateId: reservation.realEstateId,
                customerId: reservation.customerId,
                agencyId: reservation.agencyId,
                bookingDate: reservation.bookingDate,
                bookingTime: reservation.bookingTime
            };
            await axios.put(`http://swprealestatev2-001-site1.etempurl.com/api/reservation/UpdateReservation/${id}`, requestData);
            toast.success('Hủy đơn thành công!');
            fetchData(); // Gọi lại fetchData để cập nhật dữ liệu mới
        } catch (error) {
            console.error("Error updating reservation:", error);
            toast.error('Cập nhật thất bại!');
        }
    };

    const getRealEstateNameById = (realEstateId) => {
        const realEstate = realEstates.find(item => item.id === realEstateId);
        return realEstate ? realEstate.realestateName : 'Unknown';
    };

    const getUsernameByCustomerId = (customerId) => {
        const account = accounts.find(item => item.id === customerId);
        return account ? account.username : 'Unknown';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    return (
        <div className='container'>
            <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <CustomerMenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserCustomer}
            />
            <div>
                {customerReservation.length > 0 ? (
                    customerReservation.map((reservation, index) => (
                        <div key={index} className=''>
                            <h1>Thông tin đặt chỗ</h1>
                            <p><b>Mã đơn hàng</b> {reservation.id}</p>
                            <p><b>Tên bất động sản: </b> {getRealEstateNameById(reservation.realEstateId)}</p>
                            <p><b>Tên khách hàng đặt chỗ: </b> {getUsernameByCustomerId(reservation.customerId)}</p>
                            <p><b>Ngày xem bất động sản: </b> {formatDate(reservation.bookingDate)}</p>
                            <p><b>Giờ xem bất động sản</b> {reservation.bookingTime}</p>
                            <p><b>Thông tin liên hệ người dẫn xem bất động sản: </b> {reservation.agencyId !== null ? getUsernameByCustomerId(reservation.agencyId) : 'Đang Cập Nhật'}</p>
                            <button class="btn btn-outline-success" onClick={() => cancelReservation(reservation.id, reservation)}>Hủy đặt</button>

                        </div>
                    ))
                ) : (
                    <p style={{marginTop: '10px'}}>Không có đơn đặt chỗ nào.</p>
                )}
            </div>
        </div>
    );
}
