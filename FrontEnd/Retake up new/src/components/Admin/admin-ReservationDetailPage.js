import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CallApi from '../CallApi';
import { format } from 'date-fns';
import axios from 'axios'; // Import axios for making HTTP requests
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Adminmenu from "./admin-menu";
import UserAdmin from '../../list/userIAdmin';

export default function ReservationDetailPage() {
    const { timeSlot, date } = useParams();
    const [matchingBookings, setMatchingBookings] = useState([]);
    const [selectedRealEstateId, setSelectedRealEstateId] = useState('');
    const [filerAllAgency, setFilerAllAgency] = useState([]);
    const [selectedAgencyId, setSelectedAgencyId] = useState('');
    const [selectedstatus, setselectedstatus] = useState('');
    const [realEstates, setRealEstates] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const getCustomerBooking = await CallApi.getAllReservations();
                const callDataRealEstateData = await CallApi.getAllRealEstate();
                setRealEstates(callDataRealEstateData);
                const filteredBookings = getCustomerBooking.filter(booking => {
                    return format(new Date(booking.bookingDate), 'yyyy-MM-dd') === date && booking.bookingTime === timeSlot && (booking.status === 1 ||booking.status === 2);
                });
                setMatchingBookings(filteredBookings);

                const getAllAgency = await CallApi.getAllAccount();
                setAccounts(getAllAgency);
                const filterAllAgency = getAllAgency.filter(allAgency => allAgency.roleId === 1 && allAgency.status === true);
                setFilerAllAgency(filterAllAgency);

            } catch (error) {
                console.error('Error fetching reservation details:', error);
            }
        };

        if (timeSlot && date) {
            fetchDetails();
        }
    }, [timeSlot, date]);
    const getStatusString = (status) => {
        switch (status) {
            case 1:
                return 'Chưa có Agency';
            case 2:
                return 'Đã có Agency';
            default:
                return 'Đang chờ cập nhật';
        }
    };

    const handleRealEstateIdChange = (e) => {
        setSelectedRealEstateId(e.target.value);
    };

    const handleAgencyIdChange = (e) => {
        const value = e.target.value;
        setSelectedAgencyId(value === "cancel" ? null : value);
        setselectedstatus(value === "cancel" ? 1 : 2);
    };

    const getRealEstateNameById = (realEstateId) => {
        const realEstate = realEstates.find(item => item.id === realEstateId);
        return realEstate ? realEstate.realestateName : 'Dữ liệu đang tải';
    };

    const getUsernameByCusAgenId = (customerId) => {
        const account = accounts.find(item => item.id === customerId);
        return account ? account.username : 'Dữ liệu đang tải';
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };
    const handleAdjustment = async () => {
        try {
            // Chỉ thực hiện điều chỉnh nếu mã bất động sản được chọn
            if (selectedRealEstateId) {
                const bookingsToUpdate = matchingBookings.filter(booking => booking.realEstateId === parseInt(selectedRealEstateId));
                await Promise.all(bookingsToUpdate.map(async booking => {
                    const data = {
                        realEstateId: booking.realEstateId, // Sử dụng realEstateId của booking
                        customerId: booking.customerId,
                        agencyId: selectedAgencyId,
                        status: selectedstatus, // Assuming 1 is the new status to be updated
                        bookingDate: date,
                        bookingTime: timeSlot
                    };
                    console.log('Data to be sent:', data); // Console log the data to be sent
                    await axios.put(`http://swprealestatev2-001-site1.etempurl.com/api/reservation/UpdateReservation/${booking.id}`, data);
                }));

                toast.success('Điều chỉnh đặt chỗ cho đại lý thành công', {
                    onClose: () => window.location.reload() // Reset trang web khi thông báo tắt
                });
            } else {
                toast.error('Vui lòng chọn mã Bất động sản trước khi điều chỉnh đặt chỗ cho đại lý.');
            }
        } catch (error) {
            console.error('Lỗi khi điều chỉnh đặt chỗ cho đại lý:', error);
            toast.error('Đã xảy ra lỗi khi điều chỉnh đặt chỗ cho đại lý');
        }
    };

    const uniqueRealEstateIds = [...new Set(matchingBookings.map(booking => booking.realEstateId))];
    const filteredBookings = selectedRealEstateId
        ? matchingBookings.filter(booking => booking.realEstateId === parseInt(selectedRealEstateId))
        : matchingBookings;
        
    
    return (
        <div class="admin-all-account">
            <div>
                <Adminmenu
                    userLoginBasicInformationDto={userLoginBasicInformationDto}
                    UserMenu={UserAdmin}
                />
            </div>
            <div className='box-allaccount'>
                <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                <h2 style={{fontWeight:'bold', textAlign:'center'}}>Điều phối agency</h2>
                
                <div style={{display:'flex', fontSize:'17px'}}>    <p style={{fontWeight:'bold',marginRight:'5px'}}>Ngày đặt xem: </p> {formatDate(date)} </div>
                 <div style={{display:'flex', fontSize:'17px'}}>   <p style={{fontWeight:'bold',marginRight:'5px'}}>Khung giờ: </p>{timeSlot} </div>

                <div style={{display:'flex'}}>
                    <select onChange={handleRealEstateIdChange} value={selectedRealEstateId} style={{margin:'20px'}}>
                        <option value="">Lọc tên bất động sản</option>
                        {uniqueRealEstateIds.map((realEstateId, index) => (
                            <option key={index} value={realEstateId}>{getRealEstateNameById(realEstateId)}</option>
                        ))}
                    </select>
                    <select onChange={handleAgencyIdChange} value={selectedAgencyId} style={{margin:'20px'}}>
                        <option value="">Chọn nhân viên</option>

                        {filerAllAgency.map((agency, index) => (
                            <option key={index} value={agency.id}>{getUsernameByCusAgenId(agency.id)}</option>
                        ))}
                        <option value="cancel">Hủy</option> {/* Tùy chọn hủy */}
                    </select>
                    <button onClick={handleAdjustment} class="btn btn-outline-success" style={{width:'500px', margin:'20px'}}>Điều phối</button>

                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Tên Khách hàng</th>
                            <th>Tên Bất động sản</th>
                            <th>Tên Nhân Viên</th>
                            <th>Trạng thái đặt chỗ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{getUsernameByCusAgenId(booking.customerId)}</td>
                                <td>{getRealEstateNameById(booking.realEstateId)}</td>
                                <td>{getUsernameByCusAgenId(booking.agencyId)}</td>
                                <td>{getStatusString(booking.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
