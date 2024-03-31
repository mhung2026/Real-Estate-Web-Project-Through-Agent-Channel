import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import duan from '../list/duan';
import tintuc from '../list/tintuc'
import '@fortawesome/fontawesome-free/css/all.css';
import { getToken } from '../authentication/Auth';
import listheaderCustomer from '../list/listheaderCustomer';
import listheaderAgency from '../list/listheaderAgency';
import listheaderInvestor from '../list/listheaderInvestor';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const checkRoleID = userLoginBasicInformationDto ? userLoginBasicInformationDto.roleName : null;
    const token = getToken();
    // console.log('Token:', token);

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
        <nav class="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
            <div class="container">
                <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <a class="navbar-brand text-brand" href="/trangchu"> 
                    <img className='lgo-header' src='logoheader\logo-header.png' alt='lgo-header'/>
                </a>

                <div class="navbar-collapse collapse justify-content-center" id="navbarDefault">
                    <ul class="navbar-nav">

                        <li className="nav-item">
                            <NavLink exact activeClassName="active" className="nav-link" to="/trangchu">Trang chủ</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/gioithieu">Giới thiệu</NavLink>
                        </li>

                        <li class="nav-item dropdown">
                            <NavLink activeClassName="active" className="nav-link dropdown-toggle" id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false' to="/tintuc">Tin tức</NavLink>
                            <div class="dropdown-menu">
                                {tintuc.map((tintuc) => (
                                    <li key={tintuc.id}><Link className='text-drop' to={tintuc.link}>{tintuc.title}</Link></li>
                                ))}
                            </div>
                        </li>


                        <li class="nav-item dropdown">
                            <NavLink activeClassName="active" className="nav-link dropdown-toggle" id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false' to="/duan">Dự án</NavLink>
                            <div class="dropdown-menu">
                                {duan.map((duan) => (
                                    <li key={duan.id}><Link className='text-drop' to={duan.link}>{duan.name}</Link></li>
                                ))}
                            </div>
                        </li>
                        <li class="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/lienhe">Liên hệ</NavLink>
                        </li>
                    </ul>
                </div>

                <div class="navbar-toggle-wrapper">
                    <button type="button" class="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
                        <div class="header-content">
                            <div class="container-login">
                                {token && userLoginBasicInformationDto ? (
                                    <div class="dropdown">
                                        <span class="login-link">
                                            {userLoginBasicInformationDto.username}
                                        </span>
                                        <div class="dropdown-menu">
                                            {headerItems.map((item) => (
                                                <Link class="dropdown-item" to={item.link} key={item.id}>{item.name}</Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <Link class='login-link' to='/dangnhap'>Đăng Nhập</Link>
                                        <Link class='register-link' to='/dangki'>Đăng Ký</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </nav>
    )
}
