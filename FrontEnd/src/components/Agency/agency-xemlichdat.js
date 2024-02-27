import React, { useState, useEffect } from 'react';
import CallApi from '../CallApi';
import Pagination from '../Pagination'; // Import Pagination component
import AgencyMenu from './agency-menu';
import UserAgency from '../../list/userAgency';

export default function Agencyxemlichdat() {
    const [reservations, setReservations] = useState([]);
    const [realEstates, setRealEstates] = useState([]); // State to store real estates
    const [accounts, setAccounts] = useState([]); // State to store accounts
    const [currentPage, setCurrentPage] = useState(1);
    const [reservationsPerPage] = useState(3);
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));

    useEffect(() => {
        async function fetchData() {
            try {
                const callDataReservations = await CallApi.getAllReservations();
                const callDataRealEstateData = await CallApi.getAllRealEstate();
                const callDataAllAccount = await CallApi.getAllAccount();

                setReservations(callDataReservations);
                setRealEstates(callDataRealEstateData); // Set real estates data
                setAccounts(callDataAllAccount); // Set accounts data

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Function to get real estate name by id
    const getRealEstateNameById = (realEstateId) => {
        const realEstate = realEstates.find(item => item.id === realEstateId);
        return realEstate ? realEstate.realestateName : 'Unknown';
    };

    // Function to get username by customerId
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
            <AgencyMenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserAgency}
            />
            <div className='col-md-9 xemlich'>
                <h1 style={{marginBottom: '30px'}}>Danh sách khách hàng đặt lịch:</h1>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên bất động sản</th>
                            <th>Tên khách hàng</th>
                            <th>Ngày xem bất động sản</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReservations.map((reservation, index) => {
                            const stt = (currentPage - 1) * reservationsPerPage + index + 1;
                            return (
                                <tr key={reservation.id}>
                                    <td>{stt}</td>
                                    <td>{getRealEstateNameById(reservation.realEstateId)}</td>
                                    <td>{getUsernameByCustomerId(reservation.customerId)}</td>
                                    <td>{formatDate(reservation.bookingDate)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination
                    reservationsPerPage={reservationsPerPage}
                    totalReservations={reservations.length}
                    paginate={paginate}
                />
            </div>
        </div>

    );
}
