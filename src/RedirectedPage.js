import React from 'react';
import { Link } from 'react-router-dom';
import './RedirectedPage.css';
import logo from './assets/logo.png';
import bannerImage from './assets/banner.png';
import locationIcon from './assets/location.png';
import searchIcon from './assets/search.png';
import personIcon from './assets/person.png';

const RedirectedPage = () => {
  const handleBackButtonClick = () => {
    console.log("Go Back to Home Page button clicked.");
  };

  return (
    <div className="App">
      {/* Header Section */}
      <div className="banner">
        <div className="banner-left">
          <img src={logo} alt="Bank Logo" className="banner-logo" />
          <span className="bank-name">LowercaseOne</span>
        </div>
        <h1 className="banner-title">Customer Service</h1>
        <div className="banner-right">
          <a href="tel:+123456789" className="icon-button">
            <img src={locationIcon} alt="Phone" className="icon-image" />
          </a>
          <a href="mailto:support@yourbank.com" className="icon-button">
            <img src={searchIcon} alt="Email" className="icon-image" />
          </a>
          <Link to="/redirect" className="icon-button" onClick={handleBackButtonClick}>
            <img src={personIcon} alt="Support" className="icon-image" />
          </Link>
        </div>
      </div>

      {/* Banner Image Section */}
      <div className="banner-image-container">
        <img src={bannerImage} alt="Promotional Banner" className="banner-image" />
      </div>

      {/* Redirected Message Section */}
      <div className="redirected-message-container">
        <h2>You have been redirected!</h2>
        <p>Please return to the home page for assistance.</p>
        <Link to="/">
          <button className="back-button" onClick={handleBackButtonClick}>
            Go Back to Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RedirectedPage;
