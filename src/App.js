import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
import bannerImage from './assets/banner.png';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-FY1PRXB9ZW'); 
ReactGA.send('pageview'); 

const TrackPageView = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  return null;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);

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

  const handleSearch = () => {
    const results = topics.filter((topic) =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTopics(results);
  };

  const handleButtonClick = (buttonName) => {
    console.log(`Button clicked: ${buttonName}`);
    setTotalClicks((prev) => prev + 1);
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked',
      label: buttonName,
      nonInteraction: false,
      customTimestamp: Date.now(),
    });
  };

  const sendTotalClicksToGA = () => {
    ReactGA.event({
      category: 'User Interaction',
      action: 'Total Clicks',
      value: totalClicks, 
    });
  };

  useEffect(() => {
    return () => {
      sendTotalClicksToGA(); 
    };
  }, []);
  

  return (
    <Router>
      <TrackPageView />
      <Routes>
        {/* Home Page */}
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
                    <img src={require('./assets/call.png')} alt="Phone" className="icon-image" />
                  </a>
                  <a href="mailto:support@yourbank.com" className="icon-button" onClick={() => handleButtonClick('Email Icon')}>
                    <img src={require('./assets/email.png')} alt="Email" className="icon-image" />
                  </a>
                  <a href="/redirect" className="icon-button" onClick={() => handleButtonClick('Support Icon')}>
                    <img src={require('./assets/person.png')} alt="Support" className="icon-image" />
                  </a>
                </div>
              </div>

              {/* Banner Image Section */}
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
                }}
                >
                  <img src={require('./assets/search.png')} alt="Search" className="icon-image" />
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
            </div>
          }
        />

        {/* Redirected Page */}
        <Route path="/redirect" element={<RedirectedPage />} />
      </Routes>
    </Router>
  );
};

export default App;
