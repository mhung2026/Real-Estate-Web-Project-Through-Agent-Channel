import React, { useState, useEffect } from 'react';
import AgencyMenu from './agency-menu';
import UserAgency from '../../list/userAgency';
import CallApi from '../CallApi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDetailBookingAgen() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const getAgencyId = parseInt(userLoginBasicInformationDto.accountId);
    const [bookReservations, setBookReservations] = useState([]);
    const [realEstates, setRealEstates] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isFiltering, setIsFiltering] = useState(false);
    const [filteredBookReservations, setFilteredBookReservations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getAllReservations = await CallApi.getAllReservations();
                const filteredReservations = getAllReservations.filter(reservation => reservation.status === 2);
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

    useEffect(() => {
        if (isFiltering) {
            setFilteredBookReservations(bookReservations.filter(reservation => formatDate(reservation.bookingDate) === formatDate(selectedDate)));
            console.log("Data:",filteredBookReservations)
        } else {
            setFilteredBookReservations(bookReservations);
        }
    }, [selectedDate, bookReservations, isFiltering]);

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

    const handleCompleteClick = async () => {
        const reservationsToMarkComplete = isFiltering ? filteredBookReservations : bookReservations;
        if (window.confirm("Bạn có chắc chắn muốn đánh dấu tất cả các đơn đặt chỗ này là đã hoàn thành không?")) {
            try {
                await Promise.all(reservationsToMarkComplete.map(async reservation => {
                    await axios.put(`http://swprealestatev2-001-site1.etempurl.com/api/reservation/UpdateReservation/${reservation.id}`, {
                        realEstateId: reservation.realEstateId,
                        customerId: reservation.customerId,
                        status: 3,
                        bookingDate: reservation.bookingDate,
                        bookingTime: reservation.bookingTime,
                        agencyId: reservation.agencyId
                    });
                }));

                toast.success('Cập nhật thành công!', {
                    onClose: () => window.location.reload()
                });
            } catch (error) {
                console.error('Error updating reservations', error);
                toast.error('Cập nhật thất bại!', {
                    onClose: () => window.location.reload()
                });
            }
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const toggleFilter = () => {
        setIsFiltering(!isFiltering);
    };

    return (
        <div className='admin-all-account'>

            <div className='agency-menu'>
                <AgencyMenu
                    userLoginBasicInformationDto={userLoginBasicInformationDto}
                    UserMenu={UserAgency}
                />
            </div>
            <div className='box-allaccount'>
                <h1 style={{ fontSize: '30px' }}>Xem lịch đặt</h1>
                <div className="account-list">
                    <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                    <div>
                        <label>Chọn ngày:</label>
                        <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={(e) => handleDateChange(new Date(e.target.value))} />
                        <div style={{ margin: '10px' }}>
                            <button class="btn btn-outline-success" onClick={toggleFilter}>{isFiltering ? 'Hiển thị tất cả' : 'Lọc'}</button>
                        </div>
                    </div>
                </div>
                <div className="account-list">
                    {bookReservations.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã đơn hàng</th>
                                    <th>Tên bất động sản</th>
                                    <th>Tên khách hàng</th>
                                    <th>Ngày xem</th>
                                    <th>Giờ xem</th>
                                    <th>Người dẫn xem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookReservations.map((reservation, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{reservation.id}</td>
                                        <td>{getRealEstateNameById(reservation.realEstateId)}</td>
                                        <td>{getUsernameByCustomerId(reservation.customerId)}</td>
                                        <td>{formatDate(reservation.bookingDate)}</td>
                                        <td>{reservation.bookingTime}</td>
                                        <td>{reservation.agencyId !== null ? getUsernameByCustomerId(reservation.agencyId) : 'Đang cập nhật'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ marginTop: '10px', marginLeft: '3px' }}>Không có đơn đặt chỗ nào.</p>
                    )}
                </div>
                {(isFiltering === true && filteredBookReservations.length>0) ?  (
                    <div style={{ margin: '10px' }}>
                        <button class="btn btn-outline-success" onClick={handleCompleteClick}>Đánh dấu tất cả đã hoàn thành</button>
                    </div>
                ):(
                    <p></p>
                )}
               


            </div>

        </div>
    );
}
