// CallApi.js
import axios from 'axios';

class CallApi {
    static async getAllReservations() {
        try {
            const response = await axios.get('http://firstrealestate-001-site1.anytempurl.com/api/reservation/GetAllReservation');
            return response.data;
        } catch (error) {
            console.error('Error fetching reservation data:', error);
            return null;
        }
    }

    static async getAllRealEstate() {
        try {
            const response = await axios.get('http://firstrealestate-001-site1.anytempurl.com/api/invester/getAllRealEstate');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }

    static async getAllAccount() {
        try {
            const response = await axios.get('http://firstrealestate-001-site1.anytempurl.com/api/admin/getAllAccount');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }
    static async getAllDirect() {
        try {
            const response = await axios.get('http://firstrealestate-001-site1.anytempurl.com/api/direct/getAllDirect');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }


    static findReservationById(reservationData, id) {
        if (!reservationData) return null;
        return reservationData.find(reservation => reservation.customerId === id);
    }

    static findRealEstateById(realEstateData, id) {
        if (!realEstateData) return null;
        const realEstate = realEstateData.find(realEstate => realEstate.id === id);
        if (realEstate) {
            console.log('Real estate with id 84:', realEstate);
        } else {
            console.log('Real estate with id 84 not found.');
        }
        return realEstate;
    }
}

export default CallApi;
