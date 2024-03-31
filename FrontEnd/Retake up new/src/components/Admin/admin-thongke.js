import React, { useEffect, useState } from 'react';
import CallApi from '../CallApi';

export default function Adminhongke() {
    const [soldCount, setSoldCount] = useState(0);
    const [boughtCount, setBoughtCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getAllReservation = await CallApi.getAllRealEstate();
                const filteredReservations6 = getAllReservation.filter(reservation => reservation.status === 6);
                setSoldCount(filteredReservations6.length);
                const filteredReservations5 = getAllReservation.filter(reservation => reservation.status === 5);
                setBoughtCount(filteredReservations5.length);
            } catch (error) {
                console.error("Error at fetchData", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div>Thống kê đã bán: {soldCount}</div>
            <div>Thống kê đã mua: {boughtCount}</div>
        </div>
    );
}
