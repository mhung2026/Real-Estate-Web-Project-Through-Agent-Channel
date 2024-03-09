import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatISO } from 'date-fns';
import CallApi from '../CallApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Customerthongtinchitiet() {
    const { id } = useParams();
    const parsedId = parseInt(id);
    const [realEstate, setRealEstate] = useState(null);
    const [userData, setUserData] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [todayReservation, setTodayReservation] = useState(null);
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const [selectedImage, setSelectedImage] = useState(null);
    const [showBookingInfoPopup, setShowBookingInfoPopup] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CallApi.getAllRealEstate();
                const foundRealEstate = response.find(item => item.id === parsedId);
                setRealEstate(foundRealEstate);

                const locationResponse = await CallApi.getAllLocation();
                const foundLocation = locationResponse.find(location => location.id === foundRealEstate.locationId);
                setLocationInfo(foundLocation);

                const reservationTimeResponse = await CallApi.GetAllReservationTime();

                const today = new Date();
                const todayDate = today.toISOString().split('T')[0];
                const todayReservationData = reservationTimeResponse.find(reservation => formatDate(reservation.date) === todayDate);
                setTodayReservation(todayReservationData);

                const callDataAllAccount = await CallApi.getAllAccount();
                const foundUser = callDataAllAccount.find(user => user.id === userLoginBasicInformationDto.accountId);
                if (foundUser) {
                    setUserData({
                        username: foundUser.username,
                        phoneNumber: foundUser.phoneNumber,
                        email: foundUser.email
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closePopup = () => {
        setSelectedImage(null);
    };

    const handlePrevImage = (event) => {
        event.preventDefault();
        const prevIndex = (realEstate.realEstateImages.findIndex(image => image.imageUrl === selectedImage) - 1 + realEstate.realEstateImages.length) % realEstate.realEstateImages.length;
        setSelectedImage(realEstate.realEstateImages[prevIndex].imageUrl);
    };

    const handleNextImage = (event) => {
        event.preventDefault();
        const nextIndex = (realEstate.realEstateImages.findIndex(image => image.imageUrl === selectedImage) + 1) % realEstate.realEstateImages.length;
        setSelectedImage(realEstate.realEstateImages[nextIndex].imageUrl);
    };

    const handleTimeChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedTime(selectedValue);
    };

    const handleBooking = async () => {
        const callDataReservations = await CallApi.getAllReservations();
        if (selectedDate && selectedTime && userLoginBasicInformationDto && userLoginBasicInformationDto.accountId && parsedId) {
            const formattedDate = formatISO(selectedDate, { representation: 'complete' });

            const hasExistingReservation = callDataReservations.find(reservation => reservation.customerId === userLoginBasicInformationDto.accountId && reservation.status === 1);
            if (hasExistingReservation) {
                toast.error('Bạn đã đặt chỗ trước đó.');
                return;
            }
    
            const reservationData = {
                bookingDate: formattedDate,
                bookingTime: selectedTime,
                customerId: userLoginBasicInformationDto.accountId,
                realEstateId: parsedId
            };
            console.log('Reservation data:', reservationData);
            try {
                const response = await axios.post('http://firstrealestate-001-site1.anytempurl.com/api/reservation/CreateReservation', reservationData);
                console.log('Data sent:', reservationData);
                console.log('Response:', response.data);
                toast.success('Đặt chỗ thành công!');
            } catch (error) {
                console.error('Error creating reservation:', error);
                toast.error('Đã xảy ra lỗi khi đặt chỗ. Vui lòng thử lại sau.');
            }
        } else {
            toast.error('Vui lòng điền đầy đủ thông tin đặt lịch.');
        }
    };
    

    return (
        <div className="real-estate-info-container">
            {realEstate && locationInfo ? (
                <div className='xxxxx'>
                    <div className='hinhanhmotathongtin'>
                        <div className='col-md-6 hinhanh'>
                            <div className="image-container1">
                                <img
                                    src={realEstate.realEstateImages[0].imageUrl}
                                    alt={realEstate.realEstateImages[0].imageName}
                                    className="main-image small-image"
                                    onClick={() => handleClick(realEstate.realEstateImages[0].imageUrl)}
                                />
                                <div className="sub-images">
                                    {realEstate.realEstateImages.slice(1).map((image, index) => (
                                        <img
                                            key={image.id}
                                            src={image.imageUrl}
                                            alt={image.imageName}
                                            className="sub-image"
                                            onClick={() => handleClick(image.imageUrl)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {selectedImage && (
                            <div className="popup-container">
                                <div className="popup-content">
                                    <button className="close-btn" onClick={closePopup}>X</button>
                                    <button className="prev-btn" onClick={handlePrevImage}>{'<'}</button>
                                    <img className="popup-image" src={selectedImage} alt="Popup Image" />
                                    <button className="next-btn" onClick={handleNextImage}>{'>'}</button>
                                </div>
                            </div>
                        )}
                        <div className='col-md-6 thongtinchitiet'>
                            <h2>Thông tin chi tiết bất động sản</h2>
                            <p className="info-item" style={{ fontSize: '20px' }}><b>Tên:</b> {realEstate.realestateName}</p>
                            <p className="info-item" style={{ textAlign: "justify", marginRight: '15%' }}><b>Mô tả:</b> {realEstate.discription}</p>
                            <p className="info-item"><b>Giá: </b> {realEstate.price}</p>
                            <button className="show-booking-info-btn" onClick={() => setShowBookingInfoPopup(true)}>Hiển thị thông tin đặt lịch</button>
                        </div>
                    </div>
                    <div className='basb'>
                        <div className='col-md-6 motabatdongsan'>
                            <table className="info-table" style={{ padding: '10px' }}>
                                <tbody>
                                    <tr>
                                        <td><b>Địa chỉ:</b></td>
                                        <td>{realEstate.address}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Phường:</b></td>
                                        <td>{locationInfo.ward}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Quận:</b></td>
                                        <td>{locationInfo.district}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Thành phố:</b></td>
                                        <td>{locationInfo.city}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Số phòng:</b></td>
                                        <td>{realEstate.roomNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Diện tích:</b></td>
                                        <td>{realEstate.area}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Chiều dài:</b></td>
                                        <td>{realEstate.length}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Chiều rộng:</b></td>
                                        <td>{realEstate.width}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='col-md-6 motabatdongsan1'>
                            <table className="info-table">
                                <tbody>
                                    <tr>
                                        <td><b>Phường:</b></td>
                                        <td>{locationInfo.ward}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Quận:</b></td>
                                        <td>{locationInfo.district}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Thành phố:</b></td>
                                        <td>{locationInfo.city}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Tình trạng pháp lý:</b></td>
                                        <td>{realEstate.legalStatus}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Popup cho thông tin đặt lịch */}
                    {showBookingInfoPopup && (
                        <div className="popup-container">
                            <div className="popup-content">
                                <div className='col-md-6 anhpopuptest'>
                                    {realEstate && (
                                        <img
                                            src={realEstate.realEstateImages[0].imageUrl}
                                            alt={realEstate.realEstateImages[0].imageName}
                                            className="popup-image"
                                        />
                                    )}
                                </div>
                                <div className='col-md-6 anhpopuptest'>
                                    {userData && (
                                        <div className='thongtinkhachdat'>
                                            <p><b>Họ và Tên:</b> {userData.username}</p>
                                            <p><b>Số Điện Thoại: </b> {userData.phoneNumber}</p>
                                            <p><b>Email: </b> {userData.email}</p>
                                        </div>
                                    )}
                                    <button className="close-btn" onClick={() => setShowBookingInfoPopup(false)}>Đóng</button>
                                    <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Chọn ngày đặt lịch:</h3>
                                    <DatePicker className="date-picker" selected={selectedDate} onChange={date => setSelectedDate(date)} />
                                    <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Chọn giờ đặt lịch:</h3>
                                    <select onChange={handleTimeChange}>
                                        <option>Chọn khung thời gian</option>
                                        {todayReservation && todayReservation.time1 && <option>{todayReservation.time1}</option>}
                                        {todayReservation && todayReservation.time2 && <option>{todayReservation.time2}</option>}
                                        {todayReservation && todayReservation.time3 && <option>{todayReservation.time3}</option>}
                                        {todayReservation && todayReservation.time4 && <option>{todayReservation.time4}</option>}
                                    </select>
                                    <button className="booking-btn" onClick={handleBooking}>Gửi dữ liệu đặt lịch</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <ToastContainer />
        </div>
    );
}
