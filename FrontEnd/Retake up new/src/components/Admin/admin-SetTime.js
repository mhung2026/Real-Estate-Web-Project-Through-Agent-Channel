import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adminmenu from "./admin-menu";
import UserAdmin from '../../list/userIAdmin';
import CallApi from '../CallApi';

export default function AdminSetTime() {
  const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredDate, setFilteredDate] = useState(null); // State để lưu trữ giá trị của DatePicker filter
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [allReservations, setAllReservations] = useState([]); // State để lưu trữ dữ liệu từ API
  const [showAllReservations, setShowAllReservations] = useState(false); // State để kiểm soát hiển thị toàn bộ lịch đặt

  const timeSlots = [
    { id: "time1", display: "8:00 - 10:00" },
    { id: "time2", display: "11:00 - 13:00" },
    { id: "time3", display: "14:00 - 16:00" },
    { id: "time4", display: "17:00 - 19:00" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllReservation = await CallApi.GetAllReservationTime();
        // Fillter những ngày tương lai và hiện tại
        const futureReservations = getAllReservation.filter(reservation => moment(reservation.date).isSameOrAfter(moment().startOf('day')) && reservation.status === true);
        console.log("Future reservations:", futureReservations);
        setAllReservations(futureReservations); // Cập nhật state với dữ liệu từ API
      } catch (error) {
        console.error("Error at fetchData", error);
      }
    };

    const fetchUpdatedData = async () => {
      while (true) {
        await fetchData();
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    };

    fetchData(); // Initial fetch
    fetchUpdatedData(); // Start long polling
  }, []);

  useEffect(() => {
    console.log("Ngày đã chọn:", moment(selectedDate).format('YYYY-MM-DD'));
    console.log("Các khung thời gian đã chọn:");
    selectedTimes.forEach(id => {
      console.log(`${id}: "${getTimeDisplay(id)}"`);
    });
  }, [selectedDate, selectedTimes]);

  useEffect(() => {
    const now = moment().startOf('day');
    if (filteredDate && moment(filteredDate).isBefore(now)) {
      setFilteredDate(now.toDate());
    }
  }, [filteredDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const getTimeDisplay = (id) => {
    switch (id) {
      case "time1":
        return "8:00 - 10:00";
      case "time2":
        return "11:00 - 13:00";
      case "time3":
        return "14:00 - 16:00";
      case "time4":
        return "17:00 - 19:00";
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        status: true,
        date: moment(selectedDate).format('YYYY-MM-DD'),
        ...selectedTimes.reduce((acc, id) => {
          acc[id] = getTimeDisplay(id);
          return acc;
        }, {})
      };
      console.log("Data sent:", requestData);
      const response = await axios.post('http://swprealestatev2-001-site1.etempurl.com/api/ReservationTime/CreateReservationTimeByAdmin', requestData);
      console.log(response.data);
      toast.success('Tạo lịch thành công!');
    } catch (error) {
      if (selectedTimes.length > 0) {
        const requestData = {
          status: true,
          ...selectedTimes.reduce((acc, id) => {
            acc[id] = getTimeDisplay(id);
            return acc;
          }, {})
        };
        console.log("Data sent:", requestData);
        const response = await axios.put(`http://swprealestatev2-001-site1.etempurl.com/api/ReservationTime/UpdateReservationTime/${moment(selectedDate).format('YYYY-MM-DD')}`, requestData);
        console.log(response.data);
        toast.success('Cập nhật lịch thành công');
      } else {
        const requestData = {
          status: false,
        };
        console.log("Data sent:", requestData);
        const response = await axios.put(`http://swprealestatev2-001-site1.etempurl.com/api/ReservationTime/UpdateReservationTime/${moment(selectedDate).format('YYYY-MM-DD')}`, requestData);
        console.log(response.data);
        toast.success('Cập nhật lịch thành công');
      }
    }
  };

  const handleTimeClick = (time) => {
    const index = selectedTimes.indexOf(time);
    if (index !== -1) {
      setSelectedTimes(selectedTimes.filter(selectedTime => selectedTime !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const handleShowAllReservations = () => {
    setFilteredDate(null);
    setShowAllReservations(true);
  };

  return (
    <div>
      <div className="admin-all-account">
        <div>
          <Adminmenu
            userLoginBasicInformationDto={userLoginBasicInformationDto}
            UserMenu={UserAdmin}
          />
        </div>
        <div className='box-allaccount'>
          <h2 style={{ textAlign: 'center', marginTop:'100px', fontWeight:'bold'}}> Thiết Lập Thời Gian Đặt Lịch</h2>

          <div className='setTime' style={{marginLeft:' 35px'}}>
            <span>Chọn ngày </span>
            <div className="datepicker-container">
              <DatePicker
                style={{ height: '20px' }}
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Chọn ngày"
                minDate={new Date()}
              />
            </div>

            <div className="time-buttons">
              {timeSlots.map(slot => (
                <button
                  key={slot.id}
                  className={selectedTimes.includes(slot.id) ? "selected" : ""}
                  onClick={() => handleTimeClick(slot.id)}
                >
                  {slot.display}
                </button>
              ))}

            </div>
            <button onClick={handleSubmit} className="custom-button" style={{ color: "black" }}>Gửi thông tin</button>
          </div>
          <hr style={{ margin: '50px' }}></hr>
          <div className='table-container'>

            <h2 style={{ textAlign: 'center', fontWeight:'bold'}}> Thời gian đã thiết lập</h2>
            <span>Chọn ngày </span>
            <div className="datepicker-container">

              <DatePicker
                selected={selectedDate}
                onChange={date => setFilteredDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Chọn ngày"
                minDate={new Date()}
              />
            </div>
            <button onClick={handleShowAllReservations} className="custom-button" style={{ color: "black" }}>Hiện toàn bộ lịch đặt</button>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Ngày</th>
                  <th>Khung giờ 1</th>
                  <th>Khung giờ 2</th>
                  <th>Khung giờ 3</th>
                  <th>Khung giờ 4</th>
                </tr>
              </thead>
              <tbody>
                {showAllReservations ? (
                  allReservations
                    .filter(reservation => {
                      if (!filteredDate) return true;
                      return moment(reservation.date).isSame(filteredDate, 'day');
                    })
                    .map((reservation, index) => (
                      <tr key={reservation.id}>
                        <td>{index + 1}</td>
                        <td>{formatDate(reservation.date)}</td>
                        <td>{reservation.time1}</td>
                        <td>{reservation.time2}</td>
                        <td>{reservation.time3}</td>
                        <td>{reservation.time4}</td>
                      </tr>
                    ))
                ) : (
                  allReservations
                    .filter(reservation => {
                      if (!filteredDate) return true;
                      return moment(reservation.date).isSame(filteredDate, 'day');
                    })
                    .map((reservation, index) => (
                      <tr key={reservation.id}>
                        <td>{index + 1}</td>
                        <td>{formatDate(reservation.date)}</td>
                        <td>{reservation.time1}</td>
                        <td>{reservation.time2}</td>
                        <td>{reservation.time3}</td>
                        <td>{reservation.time4}</td>
                      </tr>
                    ))
                )}

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
