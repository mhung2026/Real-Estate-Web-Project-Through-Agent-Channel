import React, { useState, useEffect } from 'react';
import CallApi from '../CallApi';
import CustomerMenu from './customer-menu';
import UserCustomer from '../../list/userCustomer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from "../../firebase/addimage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios'; // Import Axios library

export default function Customerdondat() {
  const [realEstates, setRealEstates] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [customerReservation, setCustomerReservation] = useState([]);
  const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
  const customerId = userLoginBasicInformationDto.accountId;

  const [realEstateDetails, setRealEstateDetails] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [infomationInvestor, setInfomationInvestor] = useState(null); // Changed to null

  const [filePreviews, setFilePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [firebaseImageUrls, setFirebaseImageUrls] = useState([]); // State to store Firebase image URLs

  useEffect(() => {
    fetchData();
  }, [customerId]);

  useEffect(() => {
    setFilePreviews(selectedFiles.map(file => {
      const src = URL.createObjectURL(file);
      return { name: file.name, src: src };
    }));
  }, [selectedFiles]);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files);
    setUploadingFiles(true);
    setSelectedFiles(newFiles);
    setUploadingFiles(false);
  };

  const uploadFileToFirebase = async (file) => {
    const fileRef = ref(storage, `${realEstateDetails.investorId}/Ảnh Hợp đồng của ${userLoginBasicInformationDto.accountId}/${file.name}`);
    try {
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      console.log(`File uploaded successfully: ${url}`);
      return url; // Return the URL for this file
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
      return ''; // Return an empty string if there was an error
    }
  };

  const fetchData = async () => {
    try {
      const callDataReservations = await CallApi.getAllReservations();
      const filteredReservations = callDataReservations.filter(reservation => (reservation.status === 2 || reservation.status === 1) && reservation.customerId === customerId);
      setCustomerReservation(filteredReservations);

      // Assuming you want the first reservation's data
      const filteredReservation = filteredReservations.length > 0 ? filteredReservations[0] : null;
      if (filteredReservation) {
        const IdRealEstate = filteredReservation.realEstateId;
        const IdAgency = filteredReservation.agencyId;

        const callDataRealEstateData = await CallApi.getAllRealEstate();
        const foundRealEstate = callDataRealEstateData.find(item => item.id === IdRealEstate);
        setRealEstateDetails(foundRealEstate);
        const test = foundRealEstate.firebaseId;
        console.log('foundRealEstate', foundRealEstate);
        const locationResponse = await CallApi.getAllLocation();
        const foundLocation = locationResponse.find(location => location.id === foundRealEstate.locationId);
        setLocationInfo(foundLocation);

        const callDataAllAccount = await CallApi.getAllAccount();
        const findIdAgency = callDataAllAccount.find(IdCus => IdCus.id === IdAgency);
        setInfomationInvestor(findIdAgency);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Guianhcoc = async () => {
    try {
      // Convert firebaseImageUrls array to a single string
      const imageUrlString = firebaseImageUrls.join(',');
  
      // Prepare the data to send to the Swagger endpoint
      const data = {
        customerDepositContract: imageUrlString
      };
      console.log('Data to send:', data);
  
      // Call the Swagger endpoint to update the contract with Firebase image URLs
      const response = await axios.put(`http://swprealestatev2-001-site1.etempurl.com/api/customer/updateDepositContractByCustomerPost/${realEstateDetails.id}`, data);
  
      if (response.status === 200) {
        // Success message
        toast.success('Image URLs sent successfully to Swagger endpoint');
      } else {
        // Error message
        toast.error('Failed to send image URLs to Swagger endpoint');
      }
    } catch (error) {
      console.error('Error sending image URLs to Swagger:', error);
      toast.error('An error occurred while sending image URLs to Swagger endpoint');
    }
  };
  const Guihinhmua = async () => {
    try {
      // Convert firebaseImageUrls array to a single string
      const imageUrlString = firebaseImageUrls.join(',');
  
      // Prepare the data to send to the Swagger endpoint
      const data = {
        customerSellContract: imageUrlString
      };
      console.log('Data to send:', data);
  
      // Call the Swagger endpoint to update the contract with Firebase image URLs
      const response = await axios.put(`http://swprealestatev2-001-site1.etempurl.com/api/customer/updateSellContractByCustomerPost/${realEstateDetails.id}`, data);
  
      if (response.status === 200) {
        // Success message
        toast.success('Image URLs sent successfully to Swagger endpoint');
      } else {
        // Error message
        toast.error('Failed to send image URLs to Swagger endpoint');
      }
    } catch (error) {
      console.error('Error sending image URLs to Swagger:', error);
      toast.error('An error occurred while sending image URLs to Swagger endpoint');
    }
  };

  // Update Firebase image URLs when files are uploaded
  useEffect(() => {
    const uploadFiles = async () => {
      if (selectedFiles.length === 0) return;

      const urls = await Promise.all(selectedFiles.map(uploadFileToFirebase));
      setFirebaseImageUrls(urls);
    };

    uploadFiles();
  }, [selectedFiles]);

  return (
    <div className='container'>
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <CustomerMenu
        userLoginBasicInformationDto={userLoginBasicInformationDto}
        UserMenu={UserCustomer}
      />
      <div>
        {infomationInvestor && realEstateDetails && locationInfo ? ( // Check if all data is available
          <div className="real-estate-detail-container">
            <div className='customer-info'>
              <h2 className="title">Thông tin Agency</h2>
              <p><strong>Tên Agency:</strong> {infomationInvestor.username}</p>
              <p><strong>Số Điện Thoại:</strong> {infomationInvestor.phoneNumber}</p>
              <p><strong>Email:</strong> {infomationInvestor.email}</p>
              <p><strong>Địa Chỉ:</strong> {infomationInvestor.address}</p>
            </div>
            <div className='customer-info'>
              <h2 className="title">Thông tin chi tiết bất động sản</h2>
              <p><strong>Tên:</strong> {realEstateDetails.realestateName}</p> {/* Check if realEstateDetails is not null */}
              <p><strong>Địa chỉ:</strong> {realEstateDetails.address}</p>
              <p><strong>Diện tích:</strong> {realEstateDetails.area}</p>
              <p><strong>Giá:</strong> {realEstateDetails.price}</p>
              <p><strong>Số phòng:</strong> {realEstateDetails.roomNumber}</p>
              <p><strong>Diện tích chiều dài:</strong> {realEstateDetails.length}</p>
              <p><strong>Diện tích chiều rộng:</strong> {realEstateDetails.width}</p>
              <p><strong>Phường:</strong> {locationInfo.ward}</p> {/* Check if locationInfo is not null */}
              <p><strong>Quận:</strong> {locationInfo.district}</p>
              <p><strong>Tỉnh/Thành phố:</strong> {locationInfo.city}</p>
            </div>
            <div className='customer-info' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="title">Ảnh chi tiết Villa</h2>
              {realEstateDetails.realEstateImages.slice(0).map((image) => (
                <img
                  key={image.id}
                  src={image.imageUrl}
                  alt={image.imageName}
                  className="sub-image"
                />
              ))}
            </div>
          </div>
        ) : (
          <p style={{ marginTop: '10px' }}>Chưa có thông tin</p>
        )}
      </div>
      {realEstateDetails &&1===1 ? (
        <div>
          <input type="file" onChange={handleFileChange} multiple />
          {filePreviews.map((file, index) => (
            <div key={index}>
              <p>{file.name}</p>
              {file.src && <img src={file.src} alt="File preview" style={{ maxWidth: '400px', height: 'auto', textAlign: 'center' }} />}
            </div>
          ))}
          <button onClick={Guianhcoc}>Gửi hình đặt cọc</button>
          <button onClick={Guihinhmua}>Gửi hình mua</button>
        </div>
      ) : (
        <div>
          <span>Không có dữ liệu</span>
        </div>
      )}
    </div>
  );
}

