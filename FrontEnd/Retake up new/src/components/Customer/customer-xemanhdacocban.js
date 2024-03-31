import React, { useState, useEffect } from 'react';
import CustomerMenu from './customer-menu';
import UserCustomer from '../../list/userCustomer';
import CallApi from '../CallApi';

export default function Customerxemanhdacocban() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const [lastReservation, setLastReservation] = useState(null);
    const [Anhcoc, setAnhDatCoc] = useState(null);
    const [Anhban, setAnhDatBan] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getAllReservation = await CallApi.getAllReservations();
                const filterReservation = getAllReservation.filter(reservation => (reservation.customerId === userLoginBasicInformationDto.accountId) && ((reservation.status === 2) || (reservation.status === 3)));
                const sortedReservations = filterReservation[filterReservation.length - 1];
                console.log('Last reservation: ', sortedReservations);
                setLastReservation(sortedReservations);
                const getAllRealEstate = await CallApi.getAllRealEstate();
                const filterRealEstate = getAllRealEstate.find(realEstate => realEstate.id === sortedReservations.realEstateId);
                console.log('check img ', filterRealEstate.customerDepositContract);
                console.log('Real estate: ', filterRealEstate);
                setAnhDatCoc(filterRealEstate.customerDepositContract); // Set the image URL
                setAnhDatBan(filterRealEstate.customerSellContract); // Set the image URL
            } catch (error) {
                console.error("Error at fetchData", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='container'>
            <CustomerMenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserCustomer}
            />
            <div>
                {/* Display last reservation information */}
                {lastReservation && (
                    <div>
                        <h2>Last Reservation Details</h2>
                        <p>Reservation ID: {lastReservation.id}</p>
                        {/* Display the image */}
                        {Anhcoc && (
                            <div>
                                <h3>Image of Deposit</h3>
                                <img src={Anhcoc} alt="Real Estate Deposit Image" />
                            </div>
                        )}
                        {Anhban && (
                            <div>
                                <h3>Image of Sell Contract</h3>
                                <img src={Anhban} alt="Real Estate Sell Contract Image" />
                            </div>
                        )}
                        {/* Add more details as needed */}
                    </div>
                )}
            </div>
        </div>
    );
}
