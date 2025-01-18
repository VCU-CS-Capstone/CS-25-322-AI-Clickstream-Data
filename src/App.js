import React from 'react';
import './App.css';
import creditCardIcon from './assets/card.png';
import bankAccountIcon from './assets/check.png';
import autoIcon from './assets/car.png';
import travelIcon from './assets/person.png';
import topic1 from './assets/1.png';
import topic2 from './assets/2.png';
import topic3 from './assets/3.png';
import topic4 from './assets/4.png';
import topic5 from './assets/5.png';
import topic6 from './assets/6.png';
import topic7 from './assets/7.png';
import topic8 from './assets/8.png';

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
        <h2 className="bottom-banner-title">CHOOSE A HELP TOPIC</h2>

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
            <img src={travelIcon} alt="Capital One Travel" className="button-icon" />
            Capital One Travel
          </button>
        </div>
      </div>

      <div className="recommended-topics">
        <h2 className="bottom-banner-title">RECOMMENDED TOPICS</h2>
        <div className="button2-container">
          <button className="recommended-button">
            <img src={topic1} alt="Activate credit card" className="button-icon" />
            Activate credit card
          </button>
          <button className="recommended-button">
            <img src={topic2} alt="Make credit card payment" className="button-icon" />
            Make credit card payment
          </button>
          <button className="recommended-button">
            <img src={topic3} alt="Lost or stolen debit card" className="button-icon" />
            Lost or stolen debit card
          </button>
          <button className="recommended-button">
            <img src={topic4} alt="Cash advance" className="button-icon" />
            Cash advance
          </button>
          <button className="recommended-button">
            <img src={topic5} alt="Make a deposit" className="button-icon" />
            Make a deposit
          </button>
          <button className="recommended-button">
            <img src={topic6} alt="Sign-in support" className="button-icon" />
            Sign-in support
          </button>
          <button className="recommended-button">
            <img src={topic7} alt="Dispute a credit charge" className="button-icon" />
            Dispute a credit charge
          </button>
          <button className="recommended-button">
            <img src={topic8} alt="Increase credit limit" className="button-icon" />
            Increase credit limit
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;