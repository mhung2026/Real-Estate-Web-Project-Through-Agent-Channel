import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { storage } from "../../firebase/addimage";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export default function Agencydangtinpart2() {
  const [frontImages, setFrontImages] = useState([]);
  const [leftImages, setLeftImages] = useState([]);
  const [rightImages, setRightImages] = useState([]);
  const [diagramImages, setDiagramImages] = useState([]);
  const [certificateImages, setCertificateImages] = useState([]);

  const handleImageChange = async (e, setImageFunction) => {
    const selectedImages = e.target.files;
    const newImages = [];

    // Xóa ảnh cũ trước khi thêm ảnh mới vào
    await clearImagesInStorage(setImageFunction);

    for (let i = 0; i < selectedImages.length; i++) {
      const image = selectedImages[i];
      const imageObjectURL = URL.createObjectURL(image);
      newImages.push({ file: image, url: imageObjectURL });
      uploadImageToFirebase(image, setImageFunction);
    }

    setImageFunction(newImages);
  };

  const uploadImageToFirebase = (image, setImageFunction) => {
    const folder = getImageFolder(setImageFunction);
    const imageRef = ref(storage, `${folder}/${image.name}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            console.log("Uploaded image URL:", url);
            // Send the URL to the API

          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  const getImageState = (setImageFunction) => {
    switch (setImageFunction) {
      case setFrontImages:
        return frontImages;
      case setLeftImages:
        return leftImages;
      case setRightImages:
        return rightImages;
      case setDiagramImages:
        return diagramImages;
      case setCertificateImages:
        return certificateImages;
      default:
        return [];
    }
  };

  const clearImagesInStorage = async (setImageFunction) => {
    const folder = getImageFolder(setImageFunction);
    const images = getImageState(setImageFunction);

    // Delete each image in the storage
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageRef = ref(storage, `${folder}/${image.file.name}`);
      await deleteObject(imageRef);
    }
  };
  const [propertyInfo, setPropertyInfo] = useState({
    realestateName: '',
    address: '',
    roomNumber: '',
    discription: '',
    length: '',
    width: '',
    area: '',
    price: '',
    discount: '',
  });
  const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
  const imageName = propertyInfo.realestateName ? propertyInfo.realestateName.toLowerCase().replace(/\s+/g, '-') : "default";

  const getImageFolder = (setImageFunction) => {
    switch (setImageFunction) {
      case setFrontImages:
        return 'Ảnh mặt trước' + `-${userLoginBasicInformationDto.accountId}`;
      case setLeftImages:
        return 'Ảnh mặt trái' + `-${userLoginBasicInformationDto.accountId}`;
      case setRightImages:
        return 'Ảnh mặt phải' + `-${userLoginBasicInformationDto.accountId}`;
      case setDiagramImages:
        return 'Ảnh mặt sơ đồ đất' + `-${userLoginBasicInformationDto.accountId}`;
      case setCertificateImages:
        return 'Ảnh sổ hồng' + `-${userLoginBasicInformationDto.accountId}`;
      default:
        return '';
    }
  };

  return (
    <div className="App">
      <br></br>
      {/* Ảnh mặt trước */}
      <div>
        <b>Ảnh mặt trước:</b>
        <div className="image-container">
          {frontImages.map((image, index) => (
            <Avatar key={index} src={image.url} sx={{ width: 150, height: 150 }} variant="square" />
          ))}
        </div>
        <input type="file" onChange={(e) => handleImageChange(e, setFrontImages)} multiple />
      </div>
      <br></br>
      {/* Ảnh mặt trái */}
      <div>
        <b>Ảnh mặt trái:</b>
        <div className="image-container">
          {leftImages.map((image, index) => (
            <Avatar key={index} src={image.url} sx={{ width: 150, height: 150 }} variant="square" />
          ))}
        </div>
        <input type="file" onChange={(e) => handleImageChange(e, setLeftImages)} multiple />
      </div>
      <br></br>

      {/* Ảnh mặt bên phải */}
      <div>
        <b>Ảnh mặt bên phải:</b>
        <div className="image-container">
          {rightImages.map((image, index) => (
            <Avatar key={index} src={image.url} sx={{ width: 150, height: 150 }} variant="square" />
          ))}
        </div>
        <input type="file" onChange={(e) => handleImageChange(e, setRightImages)} multiple />
      </div>
      <br></br>

      {/* Sơ đồ đất */}
      <div>
        <b>Ảnh sơ đồ đất:</b>
        <div className="image-container">
          {diagramImages.map((image, index) => (
            <Avatar key={index} src={image.url} sx={{ width: 150, height: 150 }} variant="square" />
          ))}
        </div>
        <input type="file" onChange={(e) => handleImageChange(e, setDiagramImages)} multiple />
      </div>

      <br></br>
      {/* Sổ hồng */}
      <div>
        <b>Sổ hồng:</b>
        <div className="image-container">
          {certificateImages.map((image, index) => (
            <Avatar key={index} src={image.url} sx={{ width: 150, height: 150 }} variant="square" />
          ))}
        </div>
        <input type="file" onChange={(e) => handleImageChange(e, setCertificateImages)} multiple />
      </div>
    </div>
  );
}
