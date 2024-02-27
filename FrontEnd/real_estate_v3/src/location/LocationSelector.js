import React, { useState, useEffect } from 'react';
import ProvinceDropdown from './ProvinceDropdown';
import DistrictDropdown from './DistrictDropdown';
import WardDropdown from './WardDropdown';
import ResultTable from './ResultTable';

const LocationSelector = ({ onSelect, selectedLocation }) => {
    const [selectedProvince, setSelectedProvince] = useState(selectedLocation.provinceCode || '');
    const [selectedDistrict, setSelectedDistrict] = useState(selectedLocation.districtCode || '');
    const [selectedWard, setSelectedWard] = useState(selectedLocation.wardCode || '');

    const [provinceName, setProvinceName] = useState(selectedLocation.provinceName || '');
    const [districtName, setDistrictName] = useState(selectedLocation.districtName || '');
    const [wardName, setWardName] = useState(selectedLocation.wardName || '');

    useEffect(() => {
        // Update names when selectedLocation changes
        setProvinceName(selectedLocation.provinceName || '');
        setDistrictName(selectedLocation.districtName || '');
        setWardName(selectedLocation.wardName || '');
    }, [selectedLocation]);

    const handleProvinceChange = (provinceCode, provinceName) => {
        //  console.log('Selected Province:', provinceName);
        setSelectedProvince(provinceCode);
        setSelectedDistrict(''); // Reset district when province changes
        setSelectedWard(''); // Reset ward when province changes
        setProvinceName(provinceName);
        setDistrictName('');
        setWardName('');
        onSelect({ provinceCode, provinceName, districtCode: '', districtName: '', wardCode: '', wardName: '' });
    };

    const handleDistrictChange = (districtCode, districtName) => {
        // console.log('Selected District:', districtName);
        setSelectedDistrict(districtCode);
        setSelectedWard(''); // Reset ward when district changes
        setDistrictName(districtName);
        setWardName('');
        onSelect({ provinceCode: selectedProvince, provinceName, districtCode, districtName, wardCode: '', wardName: '' });
    };

    const handleWardChange = (wardCode, wardName) => {
        // console.log('Selected Ward:', wardName);
        setSelectedWard(wardCode);
        setWardName(wardName);
        onSelect({ provinceCode: selectedProvince, provinceName, districtCode: selectedDistrict, districtName, wardCode, wardName });
    };

    return (
        <div className='select-all-location'>
            <ProvinceDropdown onSelect={handleProvinceChange} selectedProvince={selectedProvince} />
            <DistrictDropdown provinceCode={selectedProvince} onSelect={handleDistrictChange} selectedDistrict={selectedDistrict} />
            <WardDropdown districtCode={selectedDistrict} onSelect={handleWardChange} selectedWard={selectedWard} />
            {/* <ResultTable provinceName={provinceName} districtName={districtName} wardName={wardName} /> */}
        </div>
    );
};

export default LocationSelector;
