import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css'; // Ensure this path matches your project structure
import UserReview from '../UserReview/UserReview.jsx';
// import EnterpriseContact from '../EnterpriseContact/EnterpriseContact.jsx';
export default function Footer() {
    const [isUserReviewOpen, setUserReviewOpen] = useState(false);
    // const [isEnterpriseContactOpen, setEnterpriseContactOpen] = useState(false);

    // const handleEnterpriseContactButtonClick = () => {
    //     setEnterpriseContactOpen(true);
    //     setUserReviewOpen(false); // Close the UserReview modal if open
    // };

    const handleReviewButtonClick = () => {
        setUserReviewOpen(true);
        // setEnterpriseContactOpen(false); // Close the EnterpriseContact modal if open
    };
  return (
    <footer>
      <div className="footer">
        <div className="footerrow">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-instagram"></i></a>
          <a href="#"><i className="fa fa-youtube"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
        </div>
        
        <div className="footerrow">
          <ul>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a onClick={handleReviewButtonClick}>User Review</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>
        
        {/* <div className="row">
          INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By: Mahesh
        </div> */}
        {isUserReviewOpen && <UserReview onClose={() => setUserReviewOpen(false)} />}
        {/* {isEnterpriseContactOpen && <EnterpriseContact onClose={() => setEnterpriseContactOpen(false)} />} */}
      </div>
    </footer>
  );
}
