import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Agencydangtinpart1 from './investor-dangtinpart1';
import Agencydangtinpart2 from './investor-dangtinpart2';

export default function Agencydangtinmain() {
    const [dataFromPart1, setDataFromPart1] = useState(null);
    const [dataFromPart2, setDataFromPart2] = useState(null);

    const handleSendDataPart1 = (data) => {
        setDataFromPart1(data);
    };

    const handleSendDataPart2 = (data) => {
        setDataFromPart2(data);
    };


    const handleSendDataToSwagger = () => {
        if (dataFromPart1) {
            const requestData = {
                ...dataFromPart1,
                listRealEstateImageUrl: dataFromPart2,
            };
            console.log("Data sent to Swagger:", requestData);
            axios.post('http://firstrealestate-001-site1.anytempurl.com/api/invester/createNewRealEstate/2', requestData)
                .then(response => {
                    console.log('Data sent to Swagger:', response.data);
                })
                .catch(error => {
                    console.error('Error sending data to Swagger:', error);
                });
        } else {
            console.error('No data available to send to Swagger');
        }
    };

    return (
        <div>
            <Agencydangtinpart1 sendData={handleSendDataPart1} />
            <Agencydangtinpart2 sendData={handleSendDataPart2} />
            <button onClick={handleSendDataToSwagger}>SendData</button>
        </div>
    )
}
