import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from './images/donaation.png';
import img2 from './images/donation2.png';
import img3 from './images/donation3.png';
import img4 from './images/donation4.png';
import img5 from './images/donation5.png';
import Navbar from './navbar';
import './css/donation.css';

const Donation = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [donationType, setDonationType] = useState('one-time');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleDonationTypeChange = (e) => {
        setDonationType(e.target.value);
    };

    const buyFunction = async () => {
        try {
            const response = await axios.post('https://wildguard-back-2.onrender.com/api/payment', {
                name,
                address,
                donationType,
                amount
            });
            if (response.status === 200) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="donation-page">
            <div className="image-container">
                    <img src={img1} alt="Donation" className="image" />
                    <div className="text-overlay">
                        <h1 id="h1">Donate to <br></br>Wildguard360</h1>
                        <p id='pd'>Support Wildlife <br></br>Protection and<br></br>Conservation</p>
                    </div>
                    {/* <div className="text-down">
                        <p>Support Wildlife Protection and Conservation</p>
                    </div> */}
                </div>
                <div className="container">
                    <div className="geading">Join Our Mission to Protect Wildlife</div>
                    <p id="p">At Wildguard360, we are committed to preserving wildlife and their natural habitats through innovative technology and dedicated rescue operations. Your support is crucial in helping us achieve our mission.</p>
                    <div className="image-row">
                        <div className="image-donation">
                            <div className="column">
                                <img src={img2} alt="Wildlife" className="side-image" />
                                <img src={img3} alt="Wildlife" className="side-image" />
                            </div>
                            <img src={img4} alt="Wildlife" className="side" />
                        </div>
                        <div className="donation-list">
                            <h2>How Your Donation Helps</h2>
                            <ul>
                            <li>Provides a week of food and medical supplies for a rescued animal.</li>
                            <li>Funds a field trip for students to learn about wildlife conservation.</li>
                            <li>Supports the maintenance and upgrade of our animal detection technology.</li>
                            <li>Contributes to a rescue operation for an endangered species.</li>
                        </ul>
                            </div>
                    </div>
                </div>
                <h1 id="f">Donate Now</h1>
                {/* Donation Form */}
                <div className="donate-form">
                <div className="form">
                    <img
                        src={selectedImage || img5}
                        alt="Selected or Default"
                        className="select"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input"
                    />
                     {/* <div className="donation-options">
                        <label className={`button ${donationType === 'one-time' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                value="one-time"
                                checked={donationType === 'one-time'}
                                onChange={handleDonationTypeChange}
                                className='hidden-radio'
                            />
                            One Time
                        </label>
                        
                    </div>  */}
                    <div className="contact-info">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Your Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input-field"
                        />
                        <input
                            type="number"
                            placeholder="Amount to Donate"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <button onClick={buyFunction} className="submit-button">Pay</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Donation;
