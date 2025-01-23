import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RedirectedPage from './RedirectedPage';
import logo from './assets/logo.png';
import creditCardIcon from './assets/card.png';
import bankAccountIcon from './assets/account.png';
import autoIcon from './assets/auto.png';
import travelIcon from './assets/travel.png';
import fraudIcon from './assets/fraud.png';
import loanIcon from './assets/loan.png';
import chatIcon from './assets/rep.png';
import atmIcon from './assets/atm.png';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);

  const topics = [
    { name: 'Credit Cards', icon: creditCardIcon },
    { name: 'Bank Accounts', icon: bankAccountIcon },
    { name: 'Auto Financing', icon: autoIcon },
    { name: 'Travel Services', icon: travelIcon },
    { name: 'Report Fraud', icon: fraudIcon },
    { name: 'Apply for a Loan', icon: loanIcon },
    { name: 'Chat with Us', icon: chatIcon },
    { name: 'Find ATM/Branch', icon: atmIcon },
  ];

  const handleSearch = () => {
    const results = topics.filter((topic) =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTopics(results);
  };

  return (
    <Router>
      <div className="App">
        {/* Top Banner */}
        <div className="banner">
          <div className="banner-left">
            <img src={logo} alt="Bank Logo" className="banner-logo" />
            <span className="bank-name">LowercaseOne</span>
          </div>
          <h1 className="banner-title">Customer Service</h1>
          <div className="banner-right">
            <button className="help-button">Support</button>
            <button className="help-button">Contact</button>
            <button className="help-button">Help</button>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search help topics"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Help Topics Section */}
        <div className="bottom-banner">
          <h2 className="bottom-banner-title">Choose a Help Topic</h2>
          <div className="button-container">
            {(filteredTopics.length > 0 ? filteredTopics : topics).map(
              (topic, index) => (
                <Link to="/redirect" key={index}>
                  <button className="bottom-banner-button">
                    <img
                      src={topic.icon}
                      alt={topic.name}
                      className="button-icon"
                    />
                    {topic.name}
                  </button>
                </Link>
              )
            )}
          </div>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/RedirectedPage" element={<RedirectedPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;