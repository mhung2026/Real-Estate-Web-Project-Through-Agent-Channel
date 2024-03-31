import { useEffect } from 'react';
import { removeToken } from '../authentication/Auth';

export default function Logout() {
    useEffect(() => {
        removeToken();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userLoginBasicInformationDto');

        //  console.log("LocalStorage contents:");
        // for (let i = 0; i < localStorage.length; i++) {
        //     const key = localStorage.key(i);
        //     const value = localStorage.getItem(key);
        //     console.log(`${key}: ${value}`);
        // }

        localStorage.clear();
        window.location.href = '/trangchu';
    }, []);

    return null;
}
