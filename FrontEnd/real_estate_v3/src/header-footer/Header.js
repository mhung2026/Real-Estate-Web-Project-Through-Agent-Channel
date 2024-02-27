import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import duan from '../list/duan';
import tintuc from '../list/tintuc';
import '@fortawesome/fontawesome-free/css/all.css';
import { getToken } from '../authentication/Auth';
import listheaderCustomer from '../list/listheaderCustomer';
import listheaderAgency from '../list/listheaderAgency';
import listheaderInvestor from '../list/listheaderInvestor';

export default function Header() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const checkRoleID = userLoginBasicInformationDto ? userLoginBasicInformationDto.roleName : null;
    const token = getToken();
    console.log('Token:', token);

    let headerItems;
    if (checkRoleID === 'Agency') {
        headerItems = listheaderAgency;
    } else if (checkRoleID === 'Customer') {
        headerItems = listheaderCustomer;
    } else if (checkRoleID === 'Investor') {
        headerItems = listheaderInvestor;
    } else {
        // Default to customer if role is not defined
        headerItems = listheaderCustomer;
    }

    return (
        <div className='header-container'>
            <div className="col-md-9">
                <nav className='main-menu'>
                    <ul className='menu-list'>
                        <img className='logo-batdongsan' src='/logoheader/logo-header-batdongsan.png' alt='logobatdongsan' />
                        <li><Link className='menu-item' to='/trangchu'>TRANG CHỦ</Link></li>
                        <li><Link className='menu-item' to='/gioithieu'>GIỚI THIỆU</Link></li>
                        <li className='dropdown'>
                            <div className='menu-item-container'>
                                <Link className='menu-item' to='/tintuc'>TIN TỨC </Link>
                                <i className="fa fa-angle-right"></i>
                            </div>
                            <ul className='dropdown-menu1'>
                                {tintuc.map((tintuc) => (
                                    <li key={tintuc.id}><Link className='text-drop' to={tintuc.link}>{tintuc.title}</Link></li>
                                ))}
                            </ul>
                        </li>
                        <li className='dropdown'>
                            <div className='menu-item-container'>
                                <Link className='menu-item' to='/duan'>DỰ ÁN</Link>
                                <i className="fa fa-angle-right"></i>
                            </div>
                            <ul className='dropdown-menu1'>
                                {duan.map((duan) => (
                                    <li key={duan.id}><Link className='text-drop' to={duan.link}>{duan.name}</Link></li>
                                ))}
                            </ul>
                        </li>
                        <li><Link className='menu-item' to='/lienhe'>LIÊN HỆ</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="col-md-3 header">
                <img className='logo_notification' src='/logoheader/logo_notification.png' alt='' />
                <div className="container-login">
                    <img className='logo-taikhoan' src='/logoheader/logo_taikhoan.png' alt='' />
                    {token && userLoginBasicInformationDto ? (
                        <div className="dropdown">
                            <span className="login-link">
                                {userLoginBasicInformationDto.username}
                            </span>
                            <div className="dropdown-menu">
                                {headerItems.map((item) => (
                                    <Link className="dropdown-item" to={item.link} key={item.id}>{item.name}</Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Link className='login-link' to='/dangnhap'>Đăng Nhập</Link>
                    )}
                </div>
            </div>
        </div>
    )
}
