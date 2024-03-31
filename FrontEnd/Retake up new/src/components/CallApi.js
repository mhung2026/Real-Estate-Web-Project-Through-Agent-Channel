// CallApi.js
import axios from 'axios';
const accessToken = localStorage.getItem('accessToken');
class CallApi {
    static async getAllReservations() {
        try {
            const response = await axios.get('http://swprealestatev2-001-site1.etempurl.com/api/admin/GetAllReservation');
            return response.data;
        } catch (error) {
            console.error('Error fetching reservation data:', error);
            return null;
        }
    }

    static async getAllRealEstate() {
        try {
            const response = await axios.get('http://swprealestatev2-001-site1.etempurl.com/api/invester/getAllRealEstate');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }

    static async getAllAccount() {
        try {
            const response = await axios.get('http://swprealestatev2-001-site1.etempurl.com/api/admin/getAllAccount');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }
    static async getAllDirect() {
        try {
            const response = await axios.get('http://swprealestatev2-001-site1.etempurl.com/api/direct/getAllDirect');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }
    static async getAllPayMent() {
        try {
            const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=_atBVAjAxOKv4hKZk83VhTHh7K9cUP9oP_HaqSE1hG3KXmnwWCFVcC4pXSZk0nwQ3x15xNcoE2aPokBjwJhiDiKLFXMoxyqJm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPeSEtyt84WAsK8LhY2Pt0-lSKbidL-lp8P9lgLmhB_susXCaKOV9rHNV3v6dQ5ABYf6TX-RdvVMYXUm4Up0mShBGBtljeKFndz9Jw9Md8uu&lib=Ms7sFYmlrTIKbXTff4UJfd36PQozHyNF_');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }
    static async getAllReservationAdmin() {
        try {
            const response = await axios.get('http://swprealestatev2-001-site1.etempurl.com/api/admin/GetAllReservation');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }
    static async getAllRole() {
        try {
            const response = await axios.get('http://swprealestatev2-001-site1.etempurl.com/api/role/getAllRole');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }
    static async getAllWallet() {
        try {
            const response = await axios.get('http://swprealestatev2-001-site1.etempurl.com/api/Wallet/GetAllWallet');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }
    static async getAllWalletHistorylWallet() {
        try {
            const response = await axios.get('http://swprealestatev2-001-site1.etempurl.com/api/WalletHistory/GetAllWalletHistory');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }
    static async getAllLocation() {
        try {
            const response = await axios.get('http://swprealestatev2-001-site1.etempurl.com/api/location/getAllLocation');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }
    static async GetAllReservationTime() {
        try {
            const response = await axios.get('http://swprealestatev2-001-site1.etempurl.com/api/ReservationTime/GetAllReservationTime');
            return response.data;
        } catch (error) {
            console.error('Error fetching real estate data:', error);
            return null;
        }
    }
    static async GetAllReservationByAgencyId(agencyId) {
        try {
            const accessToken = localStorage.getItem('accessToken');
    
            if (!accessToken) {
                console.error('Access token not found');
                return null;
            }
    
            const response = await axios.get(`http://swprealestatev2-001-site1.etempurl.com/api/agency/getAllReservationByAgencyId/${agencyId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
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


}

export default CallApi;
