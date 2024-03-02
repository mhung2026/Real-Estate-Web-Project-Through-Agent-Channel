import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Agencydangtinpart1 from './investor-dangtinpart1';
import Agencydangtinpart2 from './investor-dangtinpart2';
import UserInvestor from '../../list/userInvestor';
import InvestorMenu from './investor-menu';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Agencydangtinmain() {
    const [dataFromPart1, setDataFromPart1] = useState(null);
    const [dataFromPart2, setDataFromPart2] = useState(null);
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const navigate = useNavigate();


    const handleSendDataPart1 = (data) => {
        setDataFromPart1(data);
    };

    const handleSendDataPart2 = (data) => {
        setDataFromPart2(data);
    };

    const handleSendDataToSwagger = () => {
        if (dataFromPart1) {
            const requestData = {
                ...dataFromPart1,
                listRealEstateImageUrl: dataFromPart2,
            };
            console.log("Data sent to Swagger:", requestData);
            axios.post('http://firstrealestate-001-site1.anytempurl.com/api/invester/createNewRealEstate/' + userLoginBasicInformationDto.accountId, requestData)
                .then(response => {
                    console.log('Data sent to Swagger:', response.data);
                    toast.success('Đăng Tin Thành Công');
                })
                .catch(error => {
                    toast.error('Vui lòng điền đầy đủ thông tin cần thiết trước khi gửi.');
                    console.error('Error sending data to Swagger:', error);
                });
        } else {
            console.error('No data available to send to Swagger');
            // Hiển thị thông báo lỗi cho người dùng
        }
    };


    return (

        <div className='container1'>
            <InvestorMenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserInvestor}

            />
            <div className='thongtindangtin'>
                <div className='thongtindangtinbds'>
                    <h2>Thông tin chi tiết dự án bất động sản</h2>
                    <Agencydangtinpart1 sendData={handleSendDataPart1} />
                </div>
                <div className='thongtindangtinhinhanh'>
                    <h2 style={{ marginTop: '20px' }}>Hình ảnh bất động sản</h2>
                    <Agencydangtinpart2 sendData={handleSendDataPart2} />
                    <button onClick={handleSendDataToSwagger} style={{ backgroundColor: '#90c908' }}>Đăng tin</button>
                    <ToastContainer />

                </div>
            </div>

        </div>
    )
}
