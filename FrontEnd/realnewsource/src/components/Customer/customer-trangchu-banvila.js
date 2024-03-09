import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Customertrangchubanvila() {
  const [realEstates, setRealEstates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [city, setCity] = useState('');
  const [showAllEstates, setShowAllEstates] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://firstrealestate-001-site1.anytempurl.com/api/invester/getAllRealEstate')
      .then(response => {
        const estatesWithInvestorId2 = response.data.filter(estate => estate.investorId === 6);
        setRealEstates(estatesWithInvestorId2);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
    axios.get('http://firstrealestate-001-site1.anytempurl.com/api/location/getAllLocation')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching location data: ', error);
      });
  }, []);

  useEffect(() => {
    if (realEstates.length > 0 && locations.length > 0) {
      const cities = getCity();
      if (cities.length > 0) {
        setCity(cities[0]);
      }
    }
  }, [realEstates, locations]);

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
    return "";
  };

  const getCity = () => {
    const cities = realEstates.map(estate => {
      const location = locations.find(location => location.id === getLocationID(estate));
      return location ? location.city : null;
    });
    return cities.filter(city => city !== null);
  };

  const getLocationID = (realEstate) => {
    const locationID = realEstate.locationId;
    console.log("Status:", locationID);
    return locationID;
  }

  const getFrontImages = (realEstate) => {
    return realEstate.realEstateImages.filter(image => image.imageName === 'Ảnh Mặt Trước');
  };

  const getPrice = (realEstate) => {
    const price = realEstate.price;
    return price;
  }

  const getStatus = (realEstate) => {
    const status = realEstate.status === 3 ? 'Sắp Mở Bán' : '';
    console.log("Status:", status);
    return status;
  };

  const handleRealEstateClick = (estate) => {
    // Do something when real estate is clicked
    navigate(`/thongtinchitietbatdongsan/${estate.id}`);
  };

  return (
    <div>
      <div className="estate-container">
        <div className='main-title'>
          <div class="real-title">
            <div className='text-realtitle'>
              <span className='textso1'>NHÀ ĐẤT</span>
              <h2 className='textso2'>BÁN</h2>
            </div>
          </div>
        </div>
        <div className="estates-wrapper">
          {realEstates.map((estate, index) => (
            <div key={index} className="estate-item" style={{ display: showAllEstates ? 'block' : (index < 6 ? 'block' : 'none') }}>
              <div className="estate-info">
                <div className="image-container">
                  {getFrontImages(estate).map((image, imageIndex) => (
                    <div key={imageIndex} className="image-item">
                      <img src={image.imageUrl} alt={image.imageName} className="estate-image" />
                    </div>
                  ))}
                </div>

                <div onClick={() => handleRealEstateClick(estate)} className="estate-name">{estate.realestateName}</div>
                <span className="estate-discription">{limitWords(estate.discription, 15)}</span>
                <div className='thanhphoprice'>
                  <div className='logo-thanhpho'>
                    <img className='logo-location' src='/logotrangchu/location.png' />
                    <span className='thanhpho'>{city}</span>
                  </div>
                  <span className='price'>{getPrice(estate)}</span>
                </div>
                <span className='trangthaiban'>{getStatus(estate)}</span>
              </div>
            </div>
          ))}
        </div>
        {!showAllEstates && realEstates.length > 3 && (
          <div className="button-container">
            <button onClick={() => setShowAllEstates(true)} className="show-more-button">
              Xem Thêm
            </button>
          </div>
        )}
        {showAllEstates && (
          <div className="button-container">
            <button onClick={() => setShowAllEstates(false)} className="show-more-button">
              Thu Gọn
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
