import React, { useEffect, useState } from 'react';
import CallApi from '../CallApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Adminmenu from "./admin-menu";
import UserAdmin from '../../list/userIAdmin';
import { FiFilter } from 'react-icons/fi'; // Import the filter icon

export default function AdminDepositCustomer() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [filtercustomersnotreservation, setFfiltercustomersnotreservation] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [filterDate, setFilterDate] = useState(null);
    const [showFilter, setShowFilter] = useState(false); // State to toggle filter visibility
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allReservation = await CallApi.getAllReservations();
                const filteredReservationsWithStatus1 = allReservation.filter(reservation => reservation.status === 1);
                setFfiltercustomersnotreservation(filteredReservationsWithStatus1);
                const callDataAllAccount = await CallApi.getAllAccount();
                setAccounts(callDataAllAccount);
            } catch (error) {
                console.error("Error at fetchData", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allReservationTime = await CallApi.GetAllReservationTime();

                const filteredData = allReservationTime.filter(item => format(new Date(item.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"));

                const allReservation = await CallApi.getAllReservations();

                filteredData.forEach(reservation => {
                    ['time1', 'time2', 'time3', 'time4'].forEach(timeSlot => {
                        const timeFilter = reservation[timeSlot];
                        if (timeFilter !== null) {
                            const matchingReservations = allReservation.filter(res =>
                                format(new Date(res.bookingDate), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") &&
                                res.bookingTime === timeFilter && res.status === 1
                            );
                            reservation[`${timeSlot}_count`] = matchingReservations.length;
                        }
                    });
                });

                setFilteredReservations(filteredData);

            } catch (error) {
                console.error("Error at fetchData", error);
            }
        };
        fetchData();
    }, [selectedDate]);

    useEffect(() => {
        // Check if selectedDate is null
        if (!selectedDate) {
            // If selectedDate is null, set it to the current date
            const currentDate = new Date();
            setSelectedDate(currentDate);
        }
    }, []);

    const handleFilterDateChange = (date) => {
        setFilterDate(date);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("Ngày đã chọn:", format(date, "dd/MM/yyyy"));
    };

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    const handleNavigate = (timeSlot, date) => {
        console.log("Date passed to handleNavigate:", date);
        if (date) {
            const formattedDate = format(date, "yyyy-MM-dd");
            console.log("Formatted Date:", formattedDate);
            navigate(`/reservation-details/${timeSlot}/${formattedDate}`);
        } else {
            console.error("Date is null or undefined. Cannot navigate.");
        }
    };

    const filteredCustomers = filtercustomersnotreservation.filter(reservation => {
        if (!filterDate) return true; // Nếu không có ngày filter, trả về true để hiển thị tất cả
        return formatDate(reservation.bookingDate) === formatDate(filterDate);
    });

    const getUsernameByCustomerId = (customerId) => {
        const account = accounts.find(item => item.id === customerId);
        return account ? account.username : 'Dữ liệu đang tải';
    };


    return (
        <div className="admin-all-account">
            <div>
                <Adminmenu
                    userLoginBasicInformationDto={userLoginBasicInformationDto}
                    UserMenu={UserAdmin}
                />
            </div>
            <div className='box-allaccount'>
                <h2 style={{textAlign:'center', fontWeight:'bold'}}> Điều phối agency</h2>
                <div style={{ marginBottom: '10px' }}>
                    <div style={{fontWeight:'bold'}}>Vui lòng chọn ngày điều phối</div>
                    
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Chọn ngày"
                    />

                </div>

                {showFilter && (
                    <div>
                        Filter content goes here...
                    </div>
                )}

                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Thời gian</th>
                            <th>Số đơn chưa điều phối</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReservations.map((reservation, index) => (
                            <React.Fragment key={index}>
                                {['time1', 'time2', 'time3', 'time4'].map((timeSlot, idx) => (
                                    reservation[timeSlot] !== null && (
                                        <tr key={`${index}-${idx}`}>
                                            <td>{idx+1}</td>
                                            <td>{reservation[timeSlot]}</td>
                                            <td onClick={() => handleNavigate(reservation[timeSlot], selectedDate)}>
                                                {reservation[`${timeSlot}_count`] || 0}
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                <hr style={{margin:'50px'}}></hr>
                <div>
                    <span></span>
                    <h2 style={{textAlign:'center', fontWeight:'bold'}}>Danh Sách Chờ Khách Hàng Cần Phân Phối Agency</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Khách Hàng</th>
                                <th>Ngày đặt</th>
                                <th>Giờ đặt</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((reservation, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{getUsernameByCustomerId(reservation.customerId)}</td>
                                    <td>{formatDate(reservation.bookingDate)}</td>
                                    <td>{reservation.bookingTime}</td>
                                    <td>{reservation.status === 1 ? 'Đang chờ phân phối người dẫn xem' : reservation.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
