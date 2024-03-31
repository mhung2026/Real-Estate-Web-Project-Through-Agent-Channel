import React, { useState, useEffect, useRef } from 'react';
import InvestorMenu from './investor-menu';
import UserInvestor from '../../list/userInvestor';
import CallApi from '../CallApi';
import axios from 'axios';

// const BANK_ID = '970416';
const BANK_ID = '970422';
// const ACCOUNT_NO = '16697391';
const ACCOUNT_NO = '4160189339769';
const TEMPLATE = 'compact';

const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
};
const random6 = generateRandomString(6);
const CustomerNaptienkhachhang = () => {
    const [userLoginBasicInformationDto, setUserLoginBasicInformationDto] = useState({});
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [paymentUrl, setPaymentUrl] = useState('');
    const [paymentChecked, setPaymentChecked] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const checkPaymentInterval = useRef(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
        setUserLoginBasicInformationDto(userData);
        setDescription(userData?.username ? `${userData.username} Ma Giao Dich ${random6}` : '');
    }, []);

    const handlePayment = () => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0 || !description) {
            alert("Vui lòng nhập số tiền cần nạp!");
            return;
        }

        const encodedDescription = encodeURIComponent(description);
        const url = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${numericAmount}&addInfo=${encodedDescription}`;
        setPaymentUrl(url);
        console.log("Payment URL:", url);

        // Clear previous interval if exists
        if (checkPaymentInterval.current) clearInterval(checkPaymentInterval.current);

        // Start checking payment after initial delay of 3 seconds
        checkPaymentInterval.current = setInterval(checkPayment, 7000);
    };

    const handleSuccess = (message) => {
        // Clear the interval to stop checking payment
        clearInterval(checkPaymentInterval.current);
        checkPaymentInterval.current = null;
        setPaymentChecked(false); // Reset the payment checked flag
        setSuccessMessage(message);
    };

    const updateWalletAndHistory = async (walletData, numericAmount) => {
        const getIdWallet = walletData.id;
        const updatedAmount = parseFloat(walletData.accountBalance) + numericAmount;
        const dataToSend = { status: true, accountBalance: updatedAmount };
        try {

            await axios.put(`http://swprealestatev2-001-site1.etempurl.com/api/Wallet/UpdateWallet/${getIdWallet}`, dataToSend);
            console.log("Wallet updated successfully!");
            const walletHistoryData = { walletId: getIdWallet, description: `Bạn đã nạp thành công ${numericAmount} vào tài khoản` };
            await axios.post('http://swprealestatev2-001-site1.etempurl.com/api/WalletHistory/CreateWalletHistory', walletHistoryData);
            handleSuccess("Giao dịch thành công");
        } catch (error) {
            console.error("Error updating wallet or creating wallet history:", error);
        }
    };

    const createWalletAndHistory = async (numericAmount) => {
        const dataToSend = { investorId: userLoginBasicInformationDto.accountId, accountBalance: numericAmount };
        try {
            const response = await axios.post('http://swprealestatev2-001-site1.etempurl.com/api/Wallet/CreateWallet', dataToSend);
            console.log("New wallet created successfully!");
            const walletHistoryData = { walletId: response.data.id, description: `Bạn đã nạp thành công ${numericAmount} vào tài khoản` };
            await axios.post('http://swprealestatev2-001-site1.etempurl.com/api/WalletHistory/CreateWalletHistory', walletHistoryData);
            handleSuccess("Payment successful and new wallet created.");
        } catch (error) {
            console.error("Error creating new wallet or creating wallet history:", error);
        }
    };

    const checkPayment = async () => {
        try {
            const callDataAllPayment = await CallApi.getAllPayMent();
            const callDataAllWallet = await CallApi.getAllWallet();

            if (callDataAllPayment?.data?.length > 0) {
                const numericAmount = parseFloat(amount);
                const lastPayment = callDataAllPayment.data[callDataAllPayment.data.length - 1];
                const lastPaymentAmount = parseFloat(lastPayment.Price);
                const lastContentAmount = lastPayment.Content;
                console.log("Last payment1:", lastPaymentAmount);
                console.log("Last payment2:", numericAmount);
                console.log("Last content1:", lastContentAmount);
                console.log("Last content2:", description);
                // Thêm điều kiện kiểm tra nếu khoản thanh toán đã được xử lý
                if ((lastPaymentAmount === numericAmount) && (lastContentAmount.includes(random6))) {
                    // Tiếp tục xử lý
                    const walletData = callDataAllWallet.find(wallet => wallet.investorId === userLoginBasicInformationDto.accountId);

                    if (walletData) {
                        await updateWalletAndHistory(walletData, numericAmount);
                    } else {
                        await createWalletAndHistory(numericAmount);
                    }

                    // Đánh dấu khoản thanh toán như đã được xử lý
                    // (Bạn cần thêm logic để cập nhật trạng thái của lastPayment là đã xử lý)
                } else {
                    console.log("Waiting for payment to match the specified conditions.");
                }
            } else {
                console.log('No payment data available.');
            }
        } catch (error) {
            console.error('Error during payment check:', error.message);
        }
    };


    return (
        <div className='container'>
            <InvestorMenu userLoginBasicInformationDto={userLoginBasicInformationDto} UserMenu={UserInvestor} />
            <div className='col-md-9 thanhtoanphi'>
                <div className='payment-form'>
                    {/* <h2>Thực hiện thanh toán</h2> */}
                    <div className='input-container'>
                        <label style={{fontWeight:'bold'}}>Số tiền bạn muốn nạp vào ví</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <button class="btn btn-outline-success" onClick={handlePayment}>Thanh toán</button>
                    {paymentUrl && (
                        <div>
                            <h3 style={{ marginTop: '20px', fontSize: "24px" }}>Quét mã bên dưới để thanh toán</h3>
                            <img src={paymentUrl} alt="QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>
                    )}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default CustomerNaptienkhachhang;

