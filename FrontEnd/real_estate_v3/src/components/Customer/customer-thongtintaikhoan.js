import React from 'react'
import CustomerMenu from './customer-menu';
import UserCustomer from '../../list/userCustomer';

export default function Customerthongtintaikhoan() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    return (
        <div className='container'>
            <CustomerMenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserCustomer}
            />
            <div className="col-md-9">
                Đang cập nhật
            </div>
        </div>
    )
}
