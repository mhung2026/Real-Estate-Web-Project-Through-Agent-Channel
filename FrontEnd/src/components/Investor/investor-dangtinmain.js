import React, { useState } from 'react';
import Agencydangtinpart1 from './investor-dangtinpart1';
import Agencydangtinpart2 from './investor-dangtinpart2';

export default function Agencydangtinmain() {
    const [dataFromPart1, setDataFromPart1] = useState(null);

    const handleSendData = (data) => {
        setDataFromPart1(data);
    };

    return (
        <div>
            <Agencydangtinpart1 sendData={handleSendData} />
            <Agencydangtinpart2 />
            <button onClick={() => console.log(dataFromPart1)}>SendData</button>
        </div>
    )
}
