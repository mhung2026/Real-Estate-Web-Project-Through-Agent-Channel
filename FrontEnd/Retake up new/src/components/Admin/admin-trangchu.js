// File: admin-trangchu.js
import React from "react";

import Adminmenu from "./admin-menu";
import UserAdmin from '../../list/userIAdmin';
const AdminTrangchu = () => {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    return (
        <div className=''>
  
             <Adminmenu
                    userLoginBasicInformationDto={userLoginBasicInformationDto}
                    UserMenu={UserAdmin}
                />
          
           
            {/* Add other components here */}
        </div>
    );
}

export default AdminTrangchu;
