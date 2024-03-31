import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CallApi from '../CallApi';
import { menuItemClasses } from '@mui/base';
import { NavLink } from 'react-router-dom';

export default function InvestorMenu({ userLoginBasicInformationDto, UserMenu }) {
    const [invesBalances, setInvesBalances] = useState(() => {
        const storedBalance = localStorage.getItem('invesBalances');
        return storedBalance ? JSON.parse(storedBalance) : [];
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const getAllWallet = await CallApi.getAllWallet();
                const getIdInvestorWallet = getAllWallet.find(IdInvestor => IdInvestor.investorId === parseInt(userLoginBasicInformationDto.accountId));
                const accountBalances = getIdInvestorWallet.accountBalance;
    
                // Kiểm tra xem số dư hiện tại có khác với số dư trong cơ sở dữ liệu không
                if (JSON.stringify(accountBalances) !== JSON.stringify(invesBalances)) {
                    setInvesBalances(accountBalances);
                    localStorage.setItem('invesBalances', JSON.stringify(accountBalances));
                }
            } catch (error) {
                console.error('Error at fetchData', error);
            }
        };
        fetchData();
    }, [userLoginBasicInformationDto.accountId, invesBalances]);

    // Function to remove 'invesBalances' from localStorage
    const removeInvesBalancesFromLocalStorage = () => {
        localStorage.removeItem('invesBalances');
    };

    const [startAnimate, setStartAnimate] = React.useState(false);
    const [highlightTopPosition, setStateHighlightTopPosition] = React.useState(0);
    const [currCount, setCurrCount] = React.useState(0);
    const onClickTab = (count) => {
        setStartAnimate(false);
        setCurrCount(count);
        setStateHighlightTopPosition(count * 68);

        setTimeout(() => {
            setStartAnimate(true);
        }, 100);
    }
    React.useEffect(() => {

        setTimeout(() => {
            setStartAnimate(true);
        }, 500);

        return () => {

        }
    })
    const formatBalance = (balance) => {
        // Chuyển số dư thành chuỗi và chia nhỏ thành các phần có 3 chữ số
        const parts = balance.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
        // Nếu có số thập phân, thêm nó vào sau
        if (parts.length === 2) {
            return parts.join('.');
        } else {
            return parts[0];
        }
    };
    return (
        <div className="container">
            <div className="sidebar">
                <div className='info-nav'>
                    <div className='info-nav1'>
                        <span className='welcome'>Xin chào, {userLoginBasicInformationDto.username}!</span>
                        <div className="balance">Số dư: <span style={{ fontWeight: 'bold' }}>{invesBalances.length > 0 ? formatBalance(invesBalances) : 0} VND</span>
                        </div>
                    </div>
                </div>
                           <div className='overflow-container'>
                {UserMenu.map(menuItem => (
                        <NavLink exact activeClassName="active" className={currCount ===  menuItem.id && 'active'} to={menuItem.link}>{menuItem.name}</NavLink>

                ))}
                </div> 
                {/* <button onClick={removeInvesBalancesFromLocalStorage}>Xóa dữ liệu</button> */}
            </div>
        </div>
    );
}
