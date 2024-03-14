import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { storage } from "../../firebase/addimage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CallApi from '../CallApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AgencyCustomerDetailPage() {
    const { customerId, realEstateId } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [locationId, setlocationId] = useState(null);
    const [seturlimg, setseturlimg] = useState(null);
    const [uploadingFiles, setUploadingFiles] = useState(false);
    const [filterRealEstate, setFilterRealEstate] = useState(null);
    const [filePreviews, setFilePreviews] = useState([]); // State for storing file previews
    const [getIdAccount, setGetIdAccount] = useState(null); // State to store getIdAccount
    const [toastMessage, setToastMessage] = useState(''); // State for toast message
    const [status3, setStatus3] = useState(false); // State to track if status is 3
    const [sold, setSold] = useState(false); // State to track if property is sold
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));

    useEffect(() => {
        const fetchRealEstate = async () => {
            try {
                const allRealEstateResponse = await CallApi.getAllRealEstate();
                const foundRealEstate = allRealEstateResponse.find(re => re.id === parseInt(realEstateId));
                setFilterRealEstate(foundRealEstate);
                const locationResponse = await CallApi.getAllLocation();
                const foundLocation = locationResponse.find(location => location.id === foundRealEstate.locationId);
                setlocationId(foundLocation)
                const getAllAccount = await CallApi.getAllAccount();
                const foundIdAccount = getAllAccount.find(resId => resId.id === parseInt(customerId));
                setGetIdAccount(foundIdAccount); // Set getIdAccount state
                console.log("x", foundIdAccount)

                // Check if status is 3
                if (foundRealEstate.status === 3) {
                    setStatus3(true);
                }
            } catch (error) {
                console.error('Error fetching real estate data:', error);
            }
        };

        fetchRealEstate();
    }, [realEstateId, customerId]);

    useEffect(() => {
        // Generate file previews
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
        const fileRef = ref(storage, `uploadedFiles/${userLoginBasicInformationDto.accountId}/${file.name}`);
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

    const sendToSwagger = async () => {
        try {
            // Upload files to Firebase and collect their URLs
            const firebaseUrls = await Promise.all(selectedFiles.map(uploadFileToFirebase));

            // Create an object containing the necessary information to send
            const requestData = {
                id: filterRealEstate.id,
                firebaseId: firebaseUrls.join(),
                investorId: filterRealEstate.investorId,
                payId: 1,
                locationId: filterRealEstate.locationId,
                directId: filterRealEstate.directId,
                realestateName: filterRealEstate.realestateName,
                address: filterRealEstate.address,
                roomNumber: filterRealEstate.roomNumber,
                length: filterRealEstate.length,
                width: filterRealEstate.width,
                perimeter: customerId,
                area: filterRealEstate.area,
                legalStatus: filterRealEstate.legalStatus,
                price: filterRealEstate.price,
                discription: filterRealEstate.discription,
                status: 3,
                listRealEstateImageUrl: filterRealEstate.realEstateImages,
                City: locationId.city,
                Ward: locationId.ward,
                District: locationId.district,
            };

            console.log('Sending data to Swagger:', requestData);

            // Send data to Swagger
            axios.put(`http://firstrealestate-001-site1.anytempurl.com/api/invester/updatePostById/${realEstateId}`, requestData)
                .then(response => {
                    console.log('Response from Swagger:', response.data);
                    setToastMessage('Đã đặt cọc thành công!');
                    toast.success('Đã đặt cọc thành công!');
                    // Reset state
                    setSelectedFiles([]);
                    setseturlimg(null);
                })
                .catch(error => {
                    console.error('Error sending data to Swagger:', error);
                });
        } catch (error) {
            console.error('Error uploading files to Firebase:', error);
        }
    };

    // Function to handle marking property as sold
    const markAsSold = async () => {
        try {
            // Create requestData with status 5
            const requestData = {
                id: filterRealEstate.id,
                firebaseId: filterRealEstate.firebaseId,
                investorId: filterRealEstate.investorId,
                payId: 1,
                locationId: filterRealEstate.locationId,
                directId: filterRealEstate.directId,
                realestateName: filterRealEstate.realestateName,
                address: filterRealEstate.address,
                roomNumber: filterRealEstate.roomNumber,
                length: filterRealEstate.length,
                width: filterRealEstate.width,
                perimeter: customerId,
                area: filterRealEstate.area,
                legalStatus: filterRealEstate.legalStatus,
                price: filterRealEstate.price,
                discription: filterRealEstate.discription,
                status: 5, // New status is 5
                listRealEstateImageUrl: filterRealEstate.realEstateImages,
                City: locationId.city,
                Ward: locationId.ward,
                District: locationId.district,
            };

            console.log('Sending data to Swagger:', requestData);

            // Send data to Swagger
            axios.put(`http://firstrealestate-001-site1.anytempurl.com/api/invester/updatePostById/${realEstateId}`, requestData)
                .then(response => {
                    console.log('Response from Swagger:', response.data);
                    setToastMessage('Đã đánh dấu là đã bán!');
                    toast.success('Đã đánh dấu là đã bán!');
                    setSold(true); // Set the sold state to true
                })
                .catch(error => {
                    console.error('Error sending data to Swagger:', error);
                });
        } catch (error) {
            console.error('Error marking as sold:', error);
        }
    };

    return (
        <div>
            <h1>Thông Tin Bất Động Sản Và Khách Hàng Đặt Cọc</h1>
            <ToastContainer /> {/* Component for toast messages */}
            {/* Display real estate and customer information */}
            {filterRealEstate && (
                <div>
                <h2>Thông tin bất động sản</h2>
                <p>Tên: {filterRealEstate.realestateName}</p>
                <p>Địa chỉ: {filterRealEstate.address}</p>
                <p>Số phòng: {filterRealEstate.roomNumber}</p>
                <p>Chiều dài: {filterRealEstate.length}</p>
                <p>Chiều rộng: {filterRealEstate.width}</p>
                <p>Diện tích: {filterRealEstate.area}</p>
               
                {/* Display other information of the real estate */}
            </div>
            )}
            {getIdAccount && (
                <div>
                    <h2>Thông tin khách hàng</h2>
                    <p>Tên khách hàng: {getIdAccount.username}</p>
                    <p>Số điện thoại : {getIdAccount.phoneNumber}</p>
                    <p>Email : {getIdAccount.email}</p>
                    {/* Display other information of the customer */}
                </div>
            )}
            {/* Image upload section */}
            <h1>Ảnh Đặt Cọc</h1>
            {status3 ? (
                <div>
                    <span>Đã cọc</span>
                    {filterRealEstate && filterRealEstate.firebaseId && (
                        <img src={filterRealEstate.firebaseId} alt="Firebase Image" />
                    )}
                </div>
            ) : (
                uploadingFiles ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <input type="file" onChange={handleFileChange} multiple />
                        <div>
                            {filePreviews.map((file, index) => (
                                <div key={index}>
                                    <p>{file.name}</p>
                                    {file.src && <img src={file.src} alt="File preview" style={{ width: "200px", height: "200px" }} />}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}
            {/* Conditionally render buttons based on status */}
            {!status3 && !sold && <button onClick={sendToSwagger} style={{backgroundColor: "#35CB6D"}}>Đã cọc</button>}
            {!status3 && !sold && <button onClick={markAsSold} style={{backgroundColor: "#35CB6D"}}>Đã bán</button>}
        </div>
    );
}
