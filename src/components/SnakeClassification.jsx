// import React, { useState } from 'react';
// import axios from 'axios';

// function ImageUploader() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [message, setMessage] = useState('');
//     const [imageUrl, setImageUrl] = useState('');

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleUpload = () => {
//         if (!selectedFile) {
//             setMessage('Please select a file first');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('image', selectedFile);

//         axios.post('http://localhost:5000/upload', formData)
//             .then((response) => {
//                 setMessage(response.data.common_name);
//                 setImageUrl(response.data.imageUrl);
//             })
//             .catch((error) => {
//                 setMessage(error.response.data.msg || 'An error occurred');
//             });
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload}>Upload Image</button>
//             {message && <p>{message}</p>}
//             {imageUrl && <img src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />}
//             <p><a href="/snakeclassification">Upload Another Image</a></p>
//         </div>
//     );
// }

// export default ImageUploader;
import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [snakeData, setSnakeData] = useState(null);
    const [activeKey, setActiveKey] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setSnakeData(null);
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        axios.post('https://wildguard-back-2.onrender.com/upload', formData)
            .then((response) => {
                setSnakeData(response.data);
            })
            .catch((error) => {
                setSnakeData(null);
                console.error(error.response.data.msg || 'An error occurred');
            });
    };

    const handleButtonClick = (key) => {
        setActiveKey(key);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
            
            {snakeData && (
                <div>
                    <h3>{snakeData.common_name}</h3>
                    <img src={`https://wildguard-back-2.onrender.com${snakeData.imageUrl}`} alt="Uploaded" />
                    <div>
                        {Object.keys(snakeData).filter(key => key !== 'common_name' && key !== 'imageUrl').map((key) => (
                            <button key={key} onClick={() => handleButtonClick(key)}>
                                View {key.replace(/_/g, ' ')}
                            </button>
                        ))}
                    </div>
                    {activeKey && snakeData[activeKey] && (
                        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '10px' }}>
                            <h4>{activeKey.replace(/_/g, ' ')}</h4>
                            {activeKey === 'link' ? (
                                <a href={snakeData[activeKey]} target="_blank" rel="noopener noreferrer">
                                    {snakeData[activeKey]}
                                </a>
                            ) : (
                                <p>{snakeData[activeKey]}</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ImageUploader;
