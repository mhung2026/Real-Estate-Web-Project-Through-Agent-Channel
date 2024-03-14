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
                const filteredReservations = getAllReservations.filter(reservation => reservation.status === 1 || reservation.status === 2);
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
    const getRealEstateStatusById = (realEstateId) => {
        const realEstate = realEstates.find(item => item.id === realEstateId);
        if (realEstate) {
            switch (realEstate.status) {
                case 2:
                    return 'Đang xử lý';
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
        } else {
            return 'Không tìm thấy thông tin bất động sản';
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

    // Filter reservations by the selected date
    const dateFilteredReservations = selectedDate ? bookReservations.filter(reservation => {
        const reservationDate = new Date(reservation.bookingDate);
        return (
            reservationDate.getDate() === selectedDate.getDate() &&
            reservationDate.getMonth() === selectedDate.getMonth() &&
            reservationDate.getFullYear() === selectedDate.getFullYear()
        );
    }) : bookReservations;

    // Further filter by search term if necessary
    const filteredReservations = dateFilteredReservations.filter(reservation =>
        getRealEstateNameById(reservation.realEstateId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getUsernameByCustomerId(reservation.customerId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(reservation.bookingDate).includes(searchTerm.toLowerCase()) ||
        reservation.bookingTime.includes(searchTerm)
    );

    return (
        <div className='outer-container1'>
            <div className='container12'>
                <AgencyMenu
                    userLoginBasicInformationDto={userLoginBasicInformationDto}
                    UserMenu={UserAgency}
                />
                <div className='col-md-9 '>
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
                    <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                    {filteredReservations.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên bất động sản</th>
                                    <th>Tên khách hàng</th>
                                    <th>Ngày xem</th>
                                    <th>Giờ xem</th>
                                    <th>Người dẫn xem</th>
                                    <th>Trạng thái</th> {/* Thêm cột trạng thái */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReservations.map((reservation, index) => (
                                    <tr key={index}>
                                        <td>{getRealEstateNameById(reservation.realEstateId)}</td>
                                        <td onClick={() => handleCustomerNameClick(reservation.customerId, reservation.realEstateId)}>{getUsernameByCustomerId(reservation.customerId)}</td>
                                        <td>{formatDate(reservation.bookingDate)}</td>
                                        <td>{reservation.bookingTime}</td>
                                        <td>{reservation.agencyId !== null ? getUsernameByCustomerId(reservation.agencyId) : 'Đang cập nhật'}</td>
                                        <td>{getRealEstateStatusById(reservation.realEstateId)}</td>
                                    </tr>
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
