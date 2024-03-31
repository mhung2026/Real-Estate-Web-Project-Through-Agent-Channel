import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adminmenu from "./admin-menu";
import UserAdmin from '../../list/userIAdmin';

const statusOptions = [
    { value: 1, label: 'Đang xử lý' },
    { value: 2, label: 'Mở bán' },
];

export default function Agencyduyettindang() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const [realEstates, setRealEstates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [unsavedChanges, setUnsavedChanges] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRealEstates = async () => {
            try {
                const response = await axios.get('http://swprealestatev2-001-site1.etempurl.com/api/invester/getAllRealEstate');
                const filteredRealEstates = response.data.filter(realEstate => realEstate.status !== 0);
                setRealEstates(filteredRealEstates);
            } catch (error) {
                console.error('Error fetching real estates:', error);
            }
        };

        fetchRealEstates();
    }, []);

    const getLocationDetails = async (locationId) => {
        try {
            const response = await axios.get(`http://swprealestatev2-001-site1.etempurl.com/api/location/getAllLocation`);
            const locationDetails = response.data.find(location => location.id === locationId);
            return locationDetails || null;
        } catch (error) {
            console.error('Error fetching location details:', error);
            return null;
        }
    };

    const getRealEstateDetails = async (realEstateId) => {
        try {
            const realEstateDetails = realEstates.find(item => item.id === realEstateId);
            const locationDetails = await getLocationDetails(realEstateDetails.locationId);

            const filteredRealEstateDetails = { ...realEstateDetails };
            delete filteredRealEstateDetails.id;
            delete filteredRealEstateDetails.firebaseId;
            delete filteredRealEstateDetails.investorId;
            delete filteredRealEstateDetails.direct;
            delete filteredRealEstateDetails.investor;
            delete filteredRealEstateDetails.location;
            delete filteredRealEstateDetails.pay;

            filteredRealEstateDetails.listRealEstateImageUrl = filteredRealEstateDetails.realEstateImages;
            delete filteredRealEstateDetails.realEstateImages;

            if (locationDetails) {
                filteredRealEstateDetails.ward = locationDetails.ward;
                filteredRealEstateDetails.district = locationDetails.district;
                filteredRealEstateDetails.city = locationDetails.city;
            }

            console.log("Thông tin bất động sản có id", realEstateId, ":", filteredRealEstateDetails);
            return filteredRealEstateDetails;
        } catch (error) {
            console.error('Error fetching real estate details:', error);
            return null;
        }
    };

    const updateStatus = async (realEstateId, newStatus) => {
        try {
            const realEstateToUpdate = await getRealEstateDetails(realEstateId);
            console.log("Real estate details before status change:");
            console.log(realEstateToUpdate);

            // Update unsaved changes
            setUnsavedChanges(prevUnsavedChanges => ({
                ...prevUnsavedChanges,
                [realEstateId]: { ...realEstateToUpdate, status: newStatus }
            }));

            // Success toast

        } catch (error) {
            console.error('Error updating real estate status:', error);
            toast.error('Failed to update status. Please try again later!');
        }
    };

    const handleDeleteConfirmation = (realEstateId) => {
        const confirmation = window.confirm('Bạn có chắc chắn muốn không duyệt bất động sản này không?');
        if (confirmation) {
            handleDelete(realEstateId);
        }
    };

    const handleDelete = async (realEstateId) => {
        await updateStatus(realEstateId, 0);
    };

    const handleStatusChange = (event, realEstateId) => {
        const newStatus = event.target.value;
        updateStatus(realEstateId, newStatus);
    };

    const handleSaveData = async () => {
        try {
            await Promise.all(Object.entries(unsavedChanges).map(async ([estateId, updateData]) => {
                try {
                    await axios.put(`http://swprealestatev2-001-site1.etempurl.com/api/invester/updatePostById/${estateId}`, updateData);
                    console.log('Dữ liệu của bất động sản có ID', estateId, 'đã được cập nhật thành công!');

                    // Update real estate status in the state
                    setRealEstates(prevRealEstates => {
                        return prevRealEstates.map(realEstate => {
                            if (realEstate.id === parseInt(estateId)) {
                                return { ...realEstate, status: updateData.status };
                            }
                            return realEstate;
                        });
                    });
                } catch (error) {
                    console.error('Error updating real estate data:', error);
                }
            }));

            setUnsavedChanges({});
            toast.success('Tất cả các thay đổi đã được lưu thành công!');
        } catch (error) {
            console.error('Error saving real estate data:', error);
            toast.error('Lưu thất bại. Vui lòng thử lại sau!');
        }
    };

    const handleNavigateAndSendId = (realEstateId) => {
        navigate(`/thongtinbatdongsan/${realEstateId}`);
    };

    const filteredRealEstates = realEstates.filter(realEstate =>
        realEstate.realestateName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-all-account">
            <Adminmenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserAdmin}
            />
            <div className='container'>
                <div className='col-md-9 danhsachbdscanduyet'>
                    <h2 style={{textAlign:'center'}}> Danh sách bất động sản cần được duyệt</h2>
                    <input
                        type="text"
                        placeholder="Nhập tên bất động sản để lọc"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th onClick={() => handleNavigateAndSendId('')} style={{ cursor: 'pointer' }}>Tên bất động sản</th>
                                    <th>Trạng thái</th>
                                    <th>Không Duyệt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRealEstates.map(realEstate => (
                                    <tr key={realEstate.id} className='danhsachbdscanduyettheobds'>
                                        <td onClick={() => handleNavigateAndSendId(realEstate.id)} style={{ cursor: 'pointer' }}>{realEstate.realestateName}</td>
                                        <td>
                                            <select className='luachon' value={unsavedChanges[realEstate.id]?.status || realEstate.status} onChange={(event) => handleStatusChange(event, realEstate.id)}>
                                                {statusOptions.map(option => (
                                                    <option key={option.value} value={option.value}>{option.label}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>  
                                            <button onClick={() => handleDeleteConfirmation(realEstate.id)} className='delete'>Không duyệt</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {Object.keys(unsavedChanges).length > 0 && <button onClick={handleSaveData} className='save'>Lưu</button>}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
