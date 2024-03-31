import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CallApi from '../CallApi';
import LocationSelector from '../../location/LocationSelector';

export default function Agencydangtinpart1({ sendData }) {
    const [directs, setDirects] = useState([]);
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));

    const [propertyInfo, setPropertyInfo] = useState({
        realestateName: '',
        address: '',
        discription: '',
        length: '',
        width: '',
        roomNumber: '',
        discount: '',
        area: '',
        price: '',
        status: 1,
        directId: '',
        firebaseId: '',
        investorId: userLoginBasicInformationDto.accountId,
        payId: '4',
        legalStatus: 'Sổ Hồng',
    });

    const [selectedLocation, setSelectedLocation] = useState({
        provinceName: '',
        districtName: '',
        wardName: '',
    });

    useEffect(() => {
        const fetchDirects = async () => {
            try {
                const callDataAllDirect = await CallApi.getAllDirect();
                setDirects(callDataAllDirect);
            } catch (error) {
                console.error('Error fetching directs:', error.message);
            }
        };

        fetchDirects();
    }, []);

    useEffect(() => {
        const { length, width } = propertyInfo;
        if (length && width) {
            const area = parseFloat(length) * parseFloat(width);
            setPropertyInfo(prevState => ({
                ...prevState,
                area: area.toFixed(0),
            }));
        }
    }, [propertyInfo.length, propertyInfo.width]);

    // Function to validate form fields
    const validateForm = () => {
        const { realestateName, address, discription, length, width, roomNumber, price, directId, discount } = propertyInfo;
        if (!realestateName || !address || !discription || !length || !width || !roomNumber || !price || !directId || !discount || !selectedLocation.provinceName || !selectedLocation.districtName || !selectedLocation.wardName) {
            return false;
        }
        return true;
    };
    

    useEffect(() => {
        if (validateForm()) {
            sendData(propertyInfo);
        }
    }, [propertyInfo]);

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        setPropertyInfo(prevState => ({
            ...prevState,
            city: location.provinceName,
            district: location.districtName,
            ward: location.wardName,
        }));
    };
    useEffect(() => {
        const { length, width } = propertyInfo;
        if (length && width) {
            const area = parseFloat(length) * parseFloat(width);
            setPropertyInfo(prevState => ({
                ...prevState,
                area: area.toFixed(0),
            }));
        } else {
            // If either length or width is empty, set area to an empty string or null
            setPropertyInfo(prevState => ({
                ...prevState,
                area: '',
            }));
        }
    }, [propertyInfo.length, propertyInfo.width]);
    
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPropertyInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    

    const handleDirectSelect = (directId) => {
        setPropertyInfo(prevState => ({
            ...prevState,
            directId: directId
        }));
    };

    const handlePriceInputChange = (e) => {
        const { name, value } = e.target;
        const regex = /^[0-9,]*$/;
        if (regex.test(value)) {
            const integerValue = value ? parseInt(value.replace(/,/g, ''), 10) : '';
            if (!isNaN(integerValue)) {
                const formattedValue = integerValue.toLocaleString().replace(/\./g, ',');
                setPropertyInfo(prevState => ({
                    ...prevState,
                    [name]: formattedValue
                }));
            } else {
                // Reset to empty if the user deletes the input (input becomes invalid)
                setPropertyInfo(prevState => ({
                    ...prevState,
                    [name]: ''
                }));
            }
        }
    };
    const handleDescriptionChange = (e) => {
        const { value } = e.target;
        const words = value.trim().split(' ');
        if (words.length <= 200) {
            setPropertyInfo(prevState => ({
                ...prevState,
                discription: value
            }));
        } else {
            toast.error('Mô tả không được vượt quá 200 kí tự');
        }
    };
    
    return (
        <div className='thongtinchitietdangtin'>
            <div className='thongtinchitietdangtindulieu'>
                <div className='thongtinchitietdangtindulieutieude'>
                    <span className='tieude'>Thông tin cơ bản</span>
                    <span>Tên bất động sản</span>
                    <input type="text" name="realestateName" value={propertyInfo.realestateName} onChange={handleInputChange} placeholder="Nhập dữ liệu" />
                </div>

                <div className='thongtinchitietdangtinluachon'>
                    <LocationSelector onSelect={handleLocationSelect} selectedLocation={selectedLocation} className='luachon' />
                    <select onChange={(e) => handleDirectSelect(e.target.value)} value={propertyInfo.directId}>
                        <option value="">Chọn hướng</option>
                        {directs.map(direct => (
                            <option key={direct.id} value={direct.id}>{direct.directName}</option>
                        ))}
                    </select>
                </div>

                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                    <span className='' style={{fontSize: '16px'}}>Địa chỉ</span>
                    <input type="text" name="address" value={propertyInfo.address} onChange={handleInputChange} placeholder="Nhập dữ liệu" />
                </div>

                <div>
                    <span className='tieude'>Thông tin bài viết (giới hạn 200 chữ)</span>
                    <textarea name="discription" value={propertyInfo.discription} onChange={handleDescriptionChange} placeholder="Mô tả" />
                </div>

                <div>
                    <span className='tieude'>Thông tin bất động sản</span>
                    <span>Chiều dài (đơn vị m)</span>
                    <input type="text" name="length" value={propertyInfo.length} onChange={handleInputChange} placeholder="Nhập dữ liệu" />
                    <span>Chiều rộng (đơn vị m)</span>
                    <input type="text" name="width" value={propertyInfo.width} onChange={handleInputChange} placeholder="Nhập dữ liệu" />
                    <span>Diện tích (m²)</span>
                    <input type="text" name="area" value={propertyInfo.area} placeholder="" readOnly />
                    <span>Số phòng</span>
                    <input type="text" name="roomNumber" value={propertyInfo.roomNumber} onChange={handleInputChange} placeholder="Nhập dữ liệu" />
                    <span>Chiết Khấu</span>
                    <input type="text" name="discount" value={propertyInfo.discount} onChange={handleInputChange} placeholder="Nhập dữ liệu" />
                    <span>Mức giá</span>
                    <input type="text" name="price" value={propertyInfo.price} onChange={handlePriceInputChange} placeholder="Nhập dữ liệu" />
                </div>
            </div>
        </div>
    );
}