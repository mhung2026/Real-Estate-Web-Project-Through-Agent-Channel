import React, { useState, useEffect } from 'react';
import AgencyMenu from './agency-menu';
import UserAgency from '../../list/userAgency';
import CallApi from '../CallApi';
import axios from 'axios'; // Import axios for making HTTP requests
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDetailBookingAgen() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const getAgencyId = parseInt(userLoginBasicInformationDto.accountId);
    const [BookReservation, setBookReservation] = useState([]);
    const [realEstates, setRealEstates] = useState([]); // State to store real estates
    const [accounts, setAccounts] = useState([]); // State to store accounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const getAllReservations = await CallApi.getAllReservations();
                console.log('data res', getAllReservations);
                const filteredReservations = getAllReservations.filter(reservation => reservation.status === 1);
                console.log('data res', filteredReservations);
                const getAgenId = filteredReservations.filter(AgenId => AgenId.agencyId === getAgencyId)
                console.log('data res', getAgenId);
                setBookReservation(getAgenId);
                const callDataRealEstateData = await CallApi.getAllRealEstate();
                setRealEstates(callDataRealEstateData);
                const callDataAllAccount = await CallApi.getAllAccount();
                setAccounts(callDataAllAccount); // Set accounts data
            } catch (error) {
                console.error('Error at fetchData', error);
            }
        };
        fetchData();
    }, [getAgencyId]);
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

    const handleCompleteClick = async (reservation) => {
        // Xác nhận với người dùng trước khi hoàn thành
        if (window.confirm("Bạn có chắc chắn muốn đánh dấu đơn đặt chỗ này là đã hoàn thành không?")) {
            try {
                // Gửi thông tin cập nhật đến API
                await axios.put(`http://firstrealestate-001-site1.anytempurl.com/api/reservation/UpdateReservation/${reservation.id}`, {
                    realEstateId: reservation.realEstateId,
                    customerId: reservation.customerId,
                    status: 2,
                    bookingDate: reservation.bookingDate,
                    bookingTime: reservation.bookingTime,
                    agencyId: reservation.agencyId
                });

                toast.success('Cập nhật thành công!', {
                    onClose: () => window.location.reload() // Reload trang sau khi toast đóng
                });
                // Cập nhật state hoặc thực hiện các bước cần thiết sau khi hoàn thành
                // Ví dụ: Cập nhật state để hiển thị là đã hoàn thành
            } catch (error) {
                console.error('Error updating reservation', error);
                toast.error('Cập nhật thất bại!', {
                    onClose: () => window.location.reload() // Tùy chọn, có thể không cần reload nếu lỗi
                });
            }
        }
    };


    return (
        <div className='outer-container'>
            <div className='container'>
                <AgencyMenu
                    userLoginBasicInformationDto={userLoginBasicInformationDto}
                    UserMenu={UserAgency}
                />
                <div className='col-md-9 '>
                    <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                    {BookReservation.length > 0 ? (
                        BookReservation.map((reservation, index) => (
                            <div key={index} className='xemlich'>
                                <h1>Thông tin đặt chỗ</h1>
                                <p><b>Mã đơn hàng</b> {reservation.id}</p>
                                <p><b>Tên bất động sản: </b> {getRealEstateNameById(reservation.realEstateId)}</p>
                                <p><b>Tên khách hàng đặt chỗ: </b> {getUsernameByCustomerId(reservation.customerId)}</p>
                                <p><b>Ngày xem bất động sản: </b> {formatDate(reservation.bookingDate)}</p>
                                <p><b>Giờ xem bất động sản</b> {reservation.bookingTime}</p>
                                <p><b>Thông tin liên hệ người dẫn xem bất động sản: </b> {reservation.agencyId !== null ? getUsernameByCustomerId(reservation.agencyId) : 'Đang Cập Nhật'}</p>
                                <button onClick={() => handleCompleteClick(reservation)}>Đã hoàn thành</button>
                            </div>
                        ))
                    ) : (
                        <p style={{ marginTop: '10px', marginLeft: '3px' }}>Không có đơn đặt chỗ nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
