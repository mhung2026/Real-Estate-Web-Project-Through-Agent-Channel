import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../authentication/Auth';
import InvestorMenu from './investor-menu';
import UserInvestor from '../../list/userInvestor';
import CallApi from '../CallApi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom

export default function Quanlitindang() {
    const [realEstates, setRealEstates] = useState([]);
    const token = getToken();
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const navigate = useNavigate(); // Sử dụng useNavigate hook để điều hướng

    // Hàm để ánh xạ giá trị status sang chuỗi tương ứng
    const getStatusString = (status) => {
        switch (status) {
            case 2:
                return 'Đang mở bán';
            case 3:
                return 'Đang chờ phê duyệt cọc';
            case 4:
                return 'Phê duyệt cọc thành công';
            case 5:
                return 'Đang chờ phê duyệt bán';
            case 6:
                return 'Bán thành công';
            default:
                return 'Đang chờ cập nhật';
        }
    };

    useEffect(() => {
        const fetchRealEstates = async () => {
            try {
                const response = await CallApi.getAllRealEstate();
                const filterstatus = response.filter(realEstate => realEstate.status !== 0);
                const filteredRealEstates = filterstatus.filter(realEstate => realEstate.investorId === userLoginBasicInformationDto.accountId);
                setRealEstates(filteredRealEstates);
            } catch (error) {
                console.error('Error fetching real estates:', error.message);
            }
        };

        fetchRealEstates();
    }, [token]);

    // Hàm để điều hướng khi bấm vào tên bất động sản
    const handleRealEstateClick = (realEstateId) => {
        navigate(`/chitietbatdongsan/${realEstateId}`); // Sử dụng navigate để điều hướng tới URL mới
    };

    return (
        <div className=' container' >
            <InvestorMenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserInvestor}
            />
            <div className="col-md-9">
                <div className='listreal'>
                    <h2>Danh sách bất động sản đăng tin</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='titlecontent'>STT</th>
                                <th className='titlecontent'>Tên bất động sản</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {realEstates.length === 0 ? (
                                <tr>
                                    <td colSpan="3">Không có dữ liệu để hiển thị</td>
                                </tr>
                            ) : (
                                realEstates.map(realEstate => (
                                    <tr key={realEstate.id} onClick={() => handleRealEstateClick(realEstate.id)}>
                                        <td>{realEstate.id}</td>
                                        <td style={{ cursor: 'pointer' }}>{realEstate.realestateName}</td>
                                        <td>{getStatusString(realEstate.status)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}
