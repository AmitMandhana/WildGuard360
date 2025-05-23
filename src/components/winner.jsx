import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', image);

        axios.post('https://wildguard-back-2.onrender.com/lost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            setUploadedImageUrl(response.data.img);
        })
        .catch(error => {
            console.error('There was an error uploading the image!', error);
        });
    };

    return (
        <div>
            <h2>Upload an Image</h2>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload</button>

            {uploadedImageUrl && (
                <div>
                    <h3>Matched Images:</h3>
                    <img src={uploadedImageUrl} alt="Uploaded" style={{ width: '300px', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
