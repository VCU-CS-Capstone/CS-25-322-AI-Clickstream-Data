import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RedirectedPage from './RedirectedPage';
import HelpTopic from './HelpTopic';
import logo from './assets/logo.png';
import creditCardIcon from './assets/card.png';
import bankAccountIcon from './assets/account.png';
import autoIcon from './assets/auto.png';
import loanIcon from './assets/loan.png';
import bannerImage from './assets/banner.png';
import fraudIcon from './assets/fraud.png';


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);

  const topics = [
    { name: 'Credit Cards', icon: creditCardIcon, description: 'Manage your credit card accounts' },
    { name: 'Bank Accounts', icon: bankAccountIcon, description: 'View and manage your bank accounts' },
    { name: 'Auto Financing', icon: autoIcon, description: 'Explore auto loan options' },
    { name: 'Report Fraud', icon: fraudIcon, description: 'Report suspicious activity or fraud' },
  ];

  const handleSearch = () => {
    const results = topics.filter((topic) =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTopics(results);
  };

  return (
    <Router>
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
                  <a href="tel:+123456789" className="icon-button">
                    <img src={require('./assets/location.png')} alt="Phone" className="icon-image" />
                  </a>
                  <a href="mailto:support@yourbank.com" className="icon-button">
                    <img src={require('./assets/search.png')} alt="Email" className="icon-image" />
                  </a>
                  <a href="/support" className="icon-button">
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
                <button className="search-icon-button" onClick={handleSearch}>
                  <img src={require('./assets/search.png')} alt="Search" className="icon-image" />
                </button>
              </div>

              {/* Help Topics Section */}
              <div className="bottom-banner">
                <h2 className="bottom-banner-title">What can we help you with?</h2>
                <div className="button-container">
                  {(filteredTopics.length > 0 ? filteredTopics : topics).map((topic, index) => (
                    <Link to={`/help/${topic.name.toLowerCase().replace(/ /g, '-')}`} key={index}>
                      <button className="bottom-banner-button">
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

        {/* Help Topics Page */}
        <Route path="/help/:topic" element={<HelpTopic />} />

        {/* Redirected Page */}
        <Route path="/redirect" element={<RedirectedPage />} />
      </Routes>
    </Router>
  );
};

export default App;