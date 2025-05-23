import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import lottie from 'lottie-web';
import './css/success.css';

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const address = searchParams.get('address');
    const donationType = searchParams.get('donationType');
    const amount = searchParams.get('amount');

    useEffect(() => {
        // Load and control the Lottie animation
        const animationContainer = document.getElementById('animation-container');
        const animation = lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://lottie.host/ea807cf1-a5ff-410a-abd8-52f51c6d11f8/YZtPXe4ArE.json'
        });

        let iterationCount = 0;
        animation.addEventListener('loopComplete', () => {
            iterationCount++;
            if (iterationCount >= 3) {
                animation.stop();
            }
        });

        return () => {
            animation.destroy();
        };
    }, []);

    const handleDownloadCertificate = () => {
        navigate('/certificate', { state: { name, address, donationType, amount } });
    };

    return (
        <div className="payment-success-container">
            <div id="animation-container" className="animation-container"></div>
            <div className="message-container">
                <h1>Congratulations, {name}!</h1>
                <p>Your payment of ₹{amount} was successful.</p>
                <button className="continue-button" onClick={handleDownloadCertificate}>
                    Download My Certificate
                </button>
            </div>
        </div>
    );
};

export default Success;
