import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CallApi from '../CallApi';
import LocationSelector from '../../location/LocationSelector';

export default function Customertrangchubanvila() {
  const navigate = useNavigate();
  const [directs, setDirects] = useState([]);
  const [realEstates, setRealEstates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedDirect, setSelectedDirect] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({
    provinceName: '',
    districtName: '',
    wardName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CallApi.getAllRealEstate();
        const RealEstate = response.filter(statusRealEstate => statusRealEstate.status === 2)
        setRealEstates(RealEstate);
        const locationResponse = await CallApi.getAllLocation();
        setLocations(locationResponse);
        const directsResponse = await CallApi.getAllDirect();
        setDirects(directsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };
  const handleDirectSelect = (directId) => {
    setSelectedDirect(directId);
    console.log(directId);
  };
  const getCityName = (locationId) => {
    const location = locations.find(loc => loc.id === locationId);
    return location ? location.city : '';
  };
  const getDistrictName = (locationId) => {
    const location = locations.find(loc => loc.id === locationId);
    return location ? location.district : '';
  };
  const getWardName = (locationId) => {
    const location = locations.find(loc => loc.id === locationId);
    return location ? location.ward : '';
  };

  const limitWords = (text, limit) => {
    if (text) {
      const words = text.split(' ');
      const truncatedWords = words.slice(0, limit);
      const truncatedText = truncatedWords.join(' ');
      if (words.length > limit) {
        return truncatedText + ' .....';
      }
      return truncatedText;
    }
    return '';
  };

  const getFrontImages = realEstate => {
    return realEstate.realEstateImages.filter(image => image.imageName === 'Ảnh Mặt Trước');
  };

  const getPrice = realEstate => {
    return realEstate.price;
  };

  const getStatus = realEstate => {
    let status = '';
    switch (realEstate.status) {
      case 2:
      case 6:
        status = 'Đang Mở Bán';
        break;
      default:
        status = ''; // Or any default status you want to show
        break;
    }
    return status;
  };

  const handleRealEstateClick = estate => {
    navigate(`/thongtinchitietbatdongsan/${estate.id}`);
  };

  const filteredRealEstates = realEstates.filter(estate => {
    const cityName = getCityName(estate.locationId);
    const districtName = getDistrictName(estate.locationId);
    const wardName = getWardName(estate.locationId);
    const selectedCityName = selectedLocation.provinceName;
    const selectedDistrictName = selectedLocation.districtName;
    const selectedWardName = selectedLocation.wardName;
    const selectedDirectId = parseInt(selectedDirect);
    if (selectedCityName === "Chọn tỉnh") {
      return true;

    }
    // Kiểm tra xem bất động sản có phù hợp với thành phố được chọn không
    const cityMatch = selectedCityName ? cityName === selectedCityName : true;

    if (selectedDistrictName === "Chọn quận") {
      return cityMatch;
    }
    // Kiểm tra xem bất động sản có phù hợp với quận được chọn không
    const districtMatch = selectedDistrictName ? districtName === selectedDistrictName : true;

    if (selectedWardName === "Chọn phường") {
      return cityMatch && districtMatch;
    }
    // Kiểm tra xem bất động sản có phù hợp với phường được chọn không
    const wardMatch = selectedWardName ? wardName === selectedWardName : true;

    if (selectedDirect.includes("68")) {
      return cityMatch && districtMatch && wardMatch;
    }

    const directMatch = selectedDirectId ? estate.directId === selectedDirectId : true;

    // Trả về true nếu bất động sản phù hợp với ít nhất một trong các điều kiện đã chọn
    return cityMatch && districtMatch && wardMatch && directMatch;

  });


  return (
    <div>
      <div style={{ display: 'flex' }}>
        <LocationSelector onSelect={handleLocationSelect} selectedLocation={selectedLocation} className='luachon' />
        <select onChange={(e) => handleDirectSelect(e.target.value)} value={selectedDirect}>
          <option value="68">Chọn hướng</option>
          {directs.map(direct => (
            <option key={direct.id} value={direct.id}>{direct.directName}</option>
          ))}
        </select>
      </div>
      <div className="estate-container">
        <div className='main-title'>
          <div className="real-title">
            <div className='text-realtitle'>
              <span className='textso1'>NHÀ ĐẤT</span>
              <h2 className='textso2'>BÁN</h2>
            </div>
          </div>
        </div>
        <div className="estates-wrapper">
          {filteredRealEstates.map((estate, index) => (
            <div key={index} className="estate-item">
              <div className="estate-info">
                <div className="image-container">
                  {getFrontImages(estate).map((image, imageIndex) => (
                    <div key={imageIndex} className="image-item">
                      <img onClick={() => handleRealEstateClick(estate)} src={image.imageUrl} alt={image.imageName} className="estate-image" />
                    </div>
                  ))}
                </div>
                <div onClick={() => handleRealEstateClick(estate)} className="estate-name">{estate.realestateName}</div>
                <span className="estate-discription">{limitWords(estate.discription, 15)}</span>
                <div className='thanhphoprice'>
                  <div className='logo-thanhpho'>
                    <img className='logo-location' src='/logotrangchu/location.png' alt="location" />
                    <span className='thanhpho'>{getCityName(estate.locationId)}</span>
                    {/* <span className='thanhpho'>{getDistrictName(estate.locationId)}</span>
                    <span className='thanhpho'>{getWardName(estate.locationId)}</span>
                    <span className='thanhpho'>  {estate.directId}</span> */}
                  </div>
                  <span className='price'>{getPrice(estate)}</span>
                </div>
                <span className='trangthaiban'>{getStatus(estate)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
