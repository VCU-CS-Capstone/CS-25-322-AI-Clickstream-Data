import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RedirectedPage from './RedirectedPage.js';

import logo from './assets/logo.png';
import creditCardIcon from './assets/card.png';
import bankAccountIcon from './assets/account.png';
import autoIcon from './assets/auto.png';
import travelIcon from './assets/travel.png';
import fraudIcon from './assets/fraud.png';
import loanIcon from './assets/loan.png';
import chatIcon from './assets/rep.png';
import atmIcon from './assets/atm.png';
import bannerImage from './assets/banner.png';

import callIcon from './assets/call.png';
import emailIcon from './assets/email.png';
import supportIcon from './assets/person.png';
import searchIcon from './assets/search.png';

import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-NTZGQV7N',
};
TagManager.initialize(tagManagerArgs);

const generateSessionId = () => {
  return Math.random().toString(36).substr(2, 9) + '-' + Date.now();
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [clickData, setClickData] = useState([]); 

  const topics = [
    { name: 'Credit Cards', icon: creditCardIcon, description: 'Manage your credit card accounts' },
    { name: 'Bank Accounts', icon: bankAccountIcon, description: 'View and manage your bank accounts' },
    { name: 'Auto Financing', icon: autoIcon, description: 'Explore auto loan options' },
    { name: 'Travel Services', icon: travelIcon, description: 'Book and manage your travel plans' },
    { name: 'Report Fraud', icon: fraudIcon, description: 'Report suspicious activity or fraud' },
    { name: 'Apply for a Loan', icon: loanIcon, description: 'Apply for personal or business loans' },
    { name: 'Chat with Us', icon: chatIcon, description: 'Get assistance from a representative' },
    { name: 'Find ATM/Branch', icon: atmIcon, description: 'Locate ATMs and branches near you' },
  ];

  const [sessionId, setSessionId] = useState(localStorage.getItem('sessionId') || generateSessionId());
  useEffect(() => {
    localStorage.setItem('sessionId', sessionId);
  }, [sessionId]);

  // fetch clickstream from MongoDB
  useEffect(() => {
    fetch('https://cs-25-322-ai-clickstream-data.onrender.com/get-clicks')
      .then((response) => response.json())
      .then((data) => setClickData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Track page views in GTM
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      sessionId: sessionId,
      pagePath: window.location.pathname,
    });
  }, [sessionId, window.location.pathname]);

  // Search function
  const handleSearch = () => {
    const results = topics.filter((topic) =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTopics(results);
  };

  const handleButtonClick = (buttonName) => {
    console.log(`Button clicked: ${buttonName}`);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'button_click',
      sessionId: sessionId,
      buttonName: buttonName,
      clickTime: new Date().toISOString(),
    });

    fetch('https://cs-25-322-ai-clickstream-data.onrender.com/log-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sessionId,
        buttonName: buttonName,
        clickTime: new Date().toISOString(),
      }),
    }).catch((error) => console.error('Error logging click:', error));
  };

  const sendSessionData = () => {
    fetch('https://cs-25-322-ai-clickstream-data.onrender.com/log-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sessionId,
        sessionEndTime: new Date().toISOString(),
      }),
    }).catch((error) => console.error('Error logging session:', error));
  };

  // session data is sent when the user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => sendSessionData();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              {/* Top Banner */}
              <div className="banner">
                <div className="banner-left">
                  <img src={logo} alt="Bank Logo" className="banner-logo" />
                  <span className="bank-name">LowercaseOne</span>
                </div>
                <h1 className="banner-title">Customer Service</h1>
                <div className="banner-right">
                  <a href="tel:+18045555555" className="icon-button" onClick={() => handleButtonClick('Phone Icon')}>
                    <img src={callIcon} alt="Phone" className="icon-image" />
                  </a>
                  <a href="mailto:support@yourbank.com" className="icon-button" onClick={() => handleButtonClick('Email Icon')}>
                    <img src={emailIcon} alt="Email" className="icon-image" />
                  </a>
                  <Link to="/redirect" className="icon-button" onClick={() => handleButtonClick('Support Icon')}>
                    <img src={supportIcon} alt="Support" className="icon-image" />
                  </Link>
                </div>
              </div>

              <div className="banner-image-container">
                <img src={bannerImage} alt="Promotional Banner" className="banner-image" />
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
                <button className="search-icon-button" onClick={() => {
                  handleButtonClick('Search Button');
                  handleSearch();
                }}>
                  <img src={searchIcon} alt="Search" className="icon-image" />
                </button>
              </div>

              {/* Help Topics Section */}
              <div className="bottom-banner">
                <h2 className="bottom-banner-title">What can we help you with?</h2>
                <div className="button-container">
                  {(filteredTopics.length > 0 ? filteredTopics : topics).map((topic, index) => (
                    <Link to="/redirect" key={index}>
                      <button onClick={() => handleButtonClick(topic.name)} className="bottom-banner-button">
                        <img src={topic.icon} alt={topic.name} className="button-icon" />
                        <span className="button-name">{topic.name}</span>
                        <span className="button-description">{topic.description}</span>
                      </button>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="click-data-container">
                <h2>Logged Click Events</h2>
                <ul>
                  {clickData.map((click, index) => (
                    <li key={index}>
                      {click.buttonName} - {click.sessionId} - {new Date(click.clickTime).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          }
        />
        <Route path="/redirect" element={<RedirectedPage />} />
      </Routes>
    </Router>
  );
};

export default App;
