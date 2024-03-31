import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AgencyMenu from './agency-menu';
import UserAgency from '../../list/userAgency';
import CallApi from '../CallApi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AgencyDatcocmuaban() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const getAgencyId = parseInt(userLoginBasicInformationDto.accountId);
    const [bookReservations, setBookReservations] = useState([]);
    const [realEstates, setRealEstates] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getAllReservations = await CallApi.getAllReservations();
                const filteredReservations = getAllReservations.filter(reservation => (reservation.status === 2 || reservation.status === 3));
                const getAgenId = filteredReservations.filter(AgenId => AgenId.agencyId === getAgencyId);
                setBookReservations(getAgenId);

                const callDataRealEstateData = await CallApi.getAllRealEstate();
                setRealEstates(callDataRealEstateData);

                const callDataAllAccount = await CallApi.getAllAccount();
                setAccounts(callDataAllAccount);
            } catch (error) {
                console.error('Error at fetchData', error);
            }
        };
        fetchData();
    }, [getAgencyId]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const getRealEstateNameById = (realEstateId) => {
        const realEstate = realEstates.find(item => item.id === realEstateId);
        return realEstate ? realEstate.realestateName : 'Unknown';
    };

    const getUsernameByCustomerId = (customerId) => {
        const account = accounts.find(item => item.id === customerId);
        return account ? account.username : 'Unknown';
    };

    const getStatusByRealEstateId = (realEstateId) => {
        const realEstate = realEstates.find(item => item.id === realEstateId);
        return realEstate ? realEstate.status : 'Unknown';
    };
    const getStatusString = (status) => {
        switch (status) {
            case 2:
                return 'Đang mở bán';
            case 3:
                return 'Đang chờ phê duyệt cọc';
            case 4:
                return 'Phê duyệt cọc thành công';
            case 5:
                return 'Đang chờ phê duyệt bán';
            case 6:
                return 'Bán thành công';
            default:
                return 'Đang chờ cập nhật';
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    const handleCustomerNameClick = (customerId, realEstateId) => {
        navigate(`/customer/${customerId}/realestate/${realEstateId}`);
    };

    const dateFilteredReservations = selectedDate ? bookReservations.filter(reservation => {
        const reservationDate = new Date(reservation.bookingDate);
        return (
            reservationDate.getDate() === selectedDate.getDate() &&
            reservationDate.getMonth() === selectedDate.getMonth() &&
            reservationDate.getFullYear() === selectedDate.getFullYear()
        );
    }) : bookReservations;

    const filteredReservations = dateFilteredReservations.filter(reservation =>
        getRealEstateNameById(reservation.realEstateId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getUsernameByCustomerId(reservation.customerId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(reservation.bookingDate).includes(searchTerm.toLowerCase()) ||
        reservation.bookingTime.includes(searchTerm)
    );

    return (
        <div className='admin-all-account'>
            <div className='agency-menu'>
                <AgencyMenu
                    userLoginBasicInformationDto={userLoginBasicInformationDto}
                    UserMenu={UserAgency}
                />
            </div>
            <div className='box-allaccount'>
                <h1 style={{ fontSize: '30px' }}>Đặt cọc bất động sản</h1>
                <div className="account-list">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        placeholderText="Chọn ngày xem"
                        dateFormat="dd/MM/yyyy"
                    />
                    
                </div>
                <div className="account-list">
                    <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                    {filteredReservations.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên bất động sản</th>
                                    <th>Tên khách hàng</th>
                                    <th>Ngày xem</th>
                                    <th>Giờ xem</th>
                                    <th>Người dẫn xem</th>
                                    <th>Trạng thái</th>
                                    <th>Đặt cọc/Bán</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReservations.map((reservation, index) => (
                                    getStatusByRealEstateId(reservation.realEstateId) !== 0 && (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{getRealEstateNameById(reservation.realEstateId)}</td>
                                            <td>{getUsernameByCustomerId(reservation.customerId)}</td>
                                            <td>{formatDate(reservation.bookingDate)}</td>
                                            <td>{reservation.bookingTime}</td>
                                            <td>{reservation.agencyId !== null ? getUsernameByCustomerId(reservation.agencyId) : 'Đang cập nhật'}</td>
                                            <td>{getStatusString(getStatusByRealEstateId(reservation.realEstateId))}</td>
                                            <td >
                                                <button class="btn btn-outline-success"onClick={() => handleCustomerNameClick(reservation.customerId, reservation.realEstateId)}>Tại đây</button></td>
                                        </tr>
                                    )
                                ))}

                            </tbody>
                        </table>
                    ) : (
                        <p style={{ marginTop: '10px', marginLeft: '3px' }}>
                            {selectedDate ? 'Không có đơn đặt chỗ nào cho ngày được chọn.' : 'Vui lòng chọn ngày để xem đơn đặt chỗ.'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
