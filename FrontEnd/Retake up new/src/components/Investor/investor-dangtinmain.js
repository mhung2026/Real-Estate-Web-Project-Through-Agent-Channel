import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Agencydangtinpart1 from './investor-dangtinpart1';
import Agencydangtinpart2 from './investor-dangtinpart2';
import UserInvestor from '../../list/userInvestor';
import InvestorMenu from './investor-menu';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CallApi from '../CallApi';
import Accordion from 'react-bootstrap/Accordion';
export default function Agencydangtinmain() {


    const [IdWallet, setIdWallet] = useState(null);
    const [DataAllWallet, setDataAllWallet] = useState(null);
    const [Amout, setAmout] = useState(null);
    const [dataFromPart1, setDataFromPart1] = useState(null);
    const [dataFromPart2, setDataFromPart2] = useState(null);
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const getAllWallet = await CallApi.getAllWallet();
                setDataAllWallet(getAllWallet);
                const getIdInvestor = getAllWallet.filter(IdAmount => IdAmount.investorId === userLoginBasicInformationDto.accountId);

                setIdWallet(getIdInvestor);
                const getAmout = getIdInvestor.map(amount => amount.accountBalance)
                setAmout(getAmout);

            } catch (error) {
                console.error("Error at fetchData", error);
            }
        };
        fetchData();
    }, []);

    const resetData = () => {
        setDataFromPart1(null);
        setDataFromPart2(null);
        // Thêm các state khác cần reset ở đây (nếu có)
    };
    const unlockButton = () => {
        setIsUnlocking(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
            setIsUnlocking(false);
        }, 2000);
    };
    const handleSendDataPart1 = (data) => {
        setDataFromPart1(data);
    };

    const handleSendDataPart2 = (data) => {
        setDataFromPart2(data);
    };
    const updateWallet = async () => {
        try {
            const walletData = DataAllWallet.find(wallet => wallet.investorId === userLoginBasicInformationDto.accountId);
            const getIdWallet = walletData.id;
            const numericAmount = parseFloat(Amout);
            const updatedAmount = parseFloat(numericAmount - 1000);

            const requestData = {
                "status": true,
                accountBalance: updatedAmount
            };
            await axios.put('http://swprealestatev2-001-site1.etempurl.com/api/Wallet/UpdateWallet/' + getIdWallet, requestData);
            const walletHistoryData = { walletId: getIdWallet, description: `Bạn đã bị trừ 1000 vào tài khoản` };
            await axios.post('http://swprealestatev2-001-site1.etempurl.com/api/WalletHistory/CreateWalletHistory', walletHistoryData);
            toast.success('Bạn đã tạo bài thành công');

        } catch (error) {
            console.error('Error updating wallet:', error);
        }
    };

    const handleSendDataToSwagger = () => {
        if (!isButtonDisabled) {
            setIsButtonDisabled(true);
            if (dataFromPart1 && dataFromPart2) {
                if (Amout < 1000) {
                    toast.error('Số dư không đủ để đăng tin');
                } else {
                    const requestData = {
                        ...dataFromPart1,
                        listRealEstateImageUrl: dataFromPart2,
                    };
                    console.log("Data sent to Swagger:", requestData);
                    axios.post('http://swprealestatev2-001-site1.etempurl.com/api/invester/createNewRealEstate/' + userLoginBasicInformationDto.accountId, requestData)
                        .then(response => {
                            console.log('Data sent to Swagger:', response.data);
                            unlockButton(); // Gọi hàm để mở khóa nút
                            // toast.info('Vui lòng không spam'); // Thêm thông báo vui lòng không spam
                            updateWallet(); // Gọi hàm để cập nhật ví
                            resetData();
                        })
                        .catch(error => {
                            toast.error('Vui lòng điền đầy đủ thông tin cần thiết trước khi gửi.');

                            console.error('Error sending data to Swagger:', error);
                        });
                }
            } else {
                toast.error('Vui lòng điền đầy đủ thông tin cần thiết trước khi gửi.');
                console.error('No data available to send to Swagger');
                setIsButtonDisabled(false); // Mở khóa nút nếu có lỗi
                // Hiển thị thông báo lỗi cho người dùng
            }
        }
    };


    return (

        <div className='container'>
            <InvestorMenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserInvestor}

            />
            <div className='thongtindangtin'>
                <div className='thongtindangtinbds'>
                    <h2 style={{ fontSize: '24px', marginBottom: '20px', marginTop: '25px' }}>Thông tin chi tiết dự án bất động sản</h2>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><b>Thông tin cơ bản</b></Accordion.Header>
                            <Accordion.Body>
                                <Agencydangtinpart1 sendData={handleSendDataPart1} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className='thongtindangtinhinhanh'>
                    {/* <h2 style={{ fontSize: '24px', marginBottom: '20px', marginTop: '20px' }}>Hình ảnh bất động sản</h2> */}
                    <Accordion>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><b>Hình ảnh bất động sản</b></Accordion.Header>
                            <Accordion.Body>
                                <Agencydangtinpart2 sendData={handleSendDataPart2} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <button className='bn' onClick={handleSendDataToSwagger} style={{ backgroundColor:'#8dc767',borderRadius:'5px', marginTop: '10px' }}>Đăng tin</button>
                    <ToastContainer />

                </div>
            </div>

        </div>
    )
}
