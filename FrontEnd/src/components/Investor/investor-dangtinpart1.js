import React, { useState, useEffect } from 'react';
import CallApi from '../CallApi';
import LocationSelector from '../../location/LocationSelector';

export default function Agencydangtinpart1({ sendData }) {
    const [directs, setDirects] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({
        provinceName: '',
        districtName: '',
        wardName: '',
        directsid: '', // Thêm directsid vào selectedLocation
    });
    const [propertyInfo, setPropertyInfo] = useState({
        propertyName: '',
        houseNumber: '',
        description: '',
        length: '',
        width: '',
        numberOfRooms: '',
        discount: '',
        area: '',
        price: '',
        provinceName: '', // Thêm provinceName vào propertyInfo
        districtName: '', // Thêm districtName vào propertyInfo
        wardName: '', // Thêm wardName vào propertyInfo
        directsid: '',
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

    const handleLocationSelect = (selectedLocation) => { // Thay đổi tham số truyền vào thành selectedLocation
        setSelectedLocation(selectedLocation); // Cập nhật selectedLocation
        setPropertyInfo(prevState => ({
            ...prevState,
            provinceName: selectedLocation.provinceName, // Cập nhật provinceName
            districtName: selectedLocation.districtName, // Cập nhật districtName
            wardName: selectedLocation.wardName, // Cập nhật wardName

        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPropertyInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Tính diện tích khi có sự thay đổi trong chiều dài hoặc chiều rộng
    useEffect(() => {
        const { length, width } = propertyInfo;
        if (length && width) {
            const area = parseFloat(length) * parseFloat(width);
            setPropertyInfo(prevState => ({
                ...prevState,
                area: area.toFixed(0), // Làm tròn đến 2 chữ số thập phân
            }));
        }
    }, [propertyInfo.length, propertyInfo.width]);

    useEffect(() => {
        sendData(propertyInfo);
    }, [propertyInfo, sendData]);

    const handleDirectSelect = (directId) => {
        setSelectedLocation({ ...selectedLocation, directId });
        setPropertyInfo(prevState => ({
            ...prevState,
            directsid: directId // Cập nhật directsid trong propertyInfo
        }));
        console.log('Selected Direct ID:', directId);
    };
    return (
        <div>
            <LocationSelector onSelect={handleLocationSelect} selectedLocation={selectedLocation} />
            <select onChange={(e) => handleDirectSelect(e.target.value)}>
                <option value="">Select Direct</option>
                {directs.map(direct => (
                    <option key={direct.id} value={direct.id}>{direct.directName}</option>
                ))}
            </select>
            <input type="text" name="propertyName" value={propertyInfo.propertyName} onChange={handleInputChange} placeholder="Tên bất động sản" />
            <input type="text" name="houseNumber" value={propertyInfo.houseNumber} onChange={handleInputChange} placeholder="Số nhà" />
            <textarea name="description" value={propertyInfo.description} onChange={handleInputChange} placeholder="Mô tả" />
            <input type="text" name="length" value={propertyInfo.length} onChange={handleInputChange} placeholder="Chiều dài (đơn vị m)" />
            <input type="text" name="width" value={propertyInfo.width} onChange={handleInputChange} placeholder="Chiều rộng (đơn vị m)" />
            <input type="text" name="numberOfRooms" value={propertyInfo.numberOfRooms} onChange={handleInputChange} placeholder="Số phòng" />
            <input type="text" name="discount" value={propertyInfo.discount} onChange={handleInputChange} placeholder="Chiết Khấu" />
            <input type="text" name="price" value={propertyInfo.price} onChange={handleInputChange} placeholder="Mức giá" />
            <input type="text" name="area" value={propertyInfo.area} placeholder="Diện tích (m^2)" readOnly />
        </div>
    )
}
