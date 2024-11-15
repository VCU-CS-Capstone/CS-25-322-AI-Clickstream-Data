// src/App.js

import React from 'react';
import './App.css';
import creditCardIcon from './assets/card.png';
import bankAccountIcon from './assets/check.png';
import autoIcon from './assets/car.png';
import travelIcon from './assets/person.png';

function App() {
  return (
    <div className="App">
      {/* Top Banner */}
      <div className="banner">
        <h1>Customer Service Page</h1>
        
        {/* Static Buttons */}
        <button className="banner-button">Credit Cards</button>
        <button className="banner-button">Checkings and Savings</button>
        <button className="banner-button">Auto</button>
        <button className="banner-button">Business</button>
        <button className="banner-button">Commercial</button>
        <button className="banner-button">Benefits and Tools</button>
      </div>

      {/* Search Bar Section */}
      <div className="search-text">
        <p>What can we help you find?</p>
      </div>
      <div className="search-container">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Help Center Search"
        />
        <button className="search-button">Search</button>
      </div>

      {/* Bottom Banner */}
      <div className="bottom-banner">
        {/* Title Above Buttons */}
        <h2 className="bottom-banner-title">CHOOSE A HELP TOPIC</h2>
        
        
        {/* Buttons with Images in Horizontal Layout */}
        <div className="button-container">
          <button className="bottom-banner-button">
            <img src={creditCardIcon} alt="Credit Cards" className="button-icon" />
            Credit Cards
          </button>
          <button className="bottom-banner-button">
            <img src={bankAccountIcon} alt="Bank Accounts" className="button-icon" />
            Bank Accounts
          </button>
          <button className="bottom-banner-button">
            <img src={autoIcon} alt="Auto Financing" className="button-icon" />
            Auto Financing
          </button>
          <button className="bottom-banner-button">
            <img src={travelIcon} alt="Travel" className="button-icon" />
            Travel
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;