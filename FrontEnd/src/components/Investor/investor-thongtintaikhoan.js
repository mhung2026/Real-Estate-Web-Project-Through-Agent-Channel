import React from 'react'
import InvestorMenu from './investor-menu';
import UserInvestor from '../../list/userInvestor';

export default function Investorthongtintaikhoan() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    return (
        <div className='container'>
            <InvestorMenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserInvestor}
            />
            <div className="col-md-9">
                Đang cập nhật
            </div>
        </div>
    )
}
