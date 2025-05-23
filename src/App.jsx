// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Team from './components/Team';
import ContactUs from './components/ContactUs';
import Service from './components/service';
import DetectAnimals from './components/detect';
import Login from './components/Login';
import Donation from './components/donation'; // Ensure this component exists
import Certificate from './components/Certificate';
import Signup from './components/Signup'; // Ensure this component exists
// import ForestFire from './components/ForestFire';
import SnakeClassification from './components/SnakeClassification.jsx';
import BirdClassification from './components/BirdClassification.jsx';
import './App.css'; // Import the CSS file for App component
import MissingPet from './components/MissingPet.jsx';
import DogDiseasesPic from './components/DogDiseasesPic.jsx';
import DiseaseClassifier from './components/DiseaseClassifier.jsx';
import NgoRegister from './components/nogregister.jsx';
import NgoLogin from './components/ngologin.jsx';
import Profile from './components/Profile.jsx';
import Ngo from './components/mgo.jsx';
import Success from './components/success.jsx';
import Footer from './components/Footer/footer.jsx';
import Winner from './components/winner.jsx';
import UserReview from './components/UserReview/UserReview.jsx';
const App = () => {
  return (

      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Home/AboutUs" element={<AboutUs />} />
        <Route path="/Home/Team" element={<Team />} />
        <Route path="/Home/contact-us" element={<ContactUs />} />
        <Route path="/Home/service" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home/donation" element={<Donation />} />
        <Route path="/Home/detect" element={<DetectAnimals />} />
        <Route path="/Certificate" element={<Certificate />} />
        <Route path="/Home/createUser" element={<Signup />} /> {/* Ensure this path matches the link */}
        {/* <Route path="/forestfire" element={<ForestFire />} /> */}
        <Route path="/Home/snakeclassification" element={<SnakeClassification />} />
        <Route path="/Home/birdclassification" element={<BirdClassification />} />
        <Route path="/Home/Missingpet" element={<MissingPet />} />
        <Route path="/Home/DogDiseasesPic" element={<DogDiseasesPic />} />
        <Route path="/Home/DiseaseClassifier" element={<DiseaseClassifier />} />
        <Route path="/" element={<NgoRegister />} />
        <Route path="/ngologin" element={<NgoLogin />} />
        <Route path="/Home/Profile" element={<Profile />} />
        <Route path="/Home/mgo" element={<Ngo />} />
        <Route path="/Home/winner" element={<Winner />} />
        <Route path="/success" element={<Success />} />
        <Route path="/Home/Footer" element={<Footer />} />
        <Route path="/Home/UserReview" element={<UserReview />} />
      </Routes>

  );
};

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import AboutUs from './components/AboutUs';
// import Team from './components/Team';
// import ContactUs from './components/ContactUs';
// import Service from './components/service';
// import DetectAnimals from './components/detect';
// import Login from './components/Login';
// import Donation from './components/donation';
// import Certificate from './components/Certificate';
// import Signup from './components/Signup';
// import MissingPet from './components/MissingPet';
// import NearestVets from './components/NearestVets';
// import ForestFire from './components/ForestFire';
// import SnakeClassification from './components/SnakeClassification.jsx';
// import BirdClassification from './components/BirdClassification.jsx';
// import './App.css';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/AboutUs" element={<AboutUs />} />
//         <Route path="/Team" element={<Team />} />
//         <Route path="/contact-us" element={<ContactUs />} />
//         <Route path="/service" element={<Service />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/donation" element={<Donation />} />
//         <Route path="/detect" element={<DetectAnimals />} />
//         <Route path="/Certificate" element={<Certificate />} />
//         <Route path="/createUser" element={<Signup />} />
//         <Route path="/missing-pet" element={<MissingPet />} />
//         <Route path="/Nearby-Vets" element={<NearestVets />} />
//         <Route path="/forestfire" element={<ForestFire />} />
//         <Route path="/snakeclassification" element={<SnakeClassification />} />
//         <Route path="/birdclassification" element={<BirdClassification />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
