import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RedirectedPage from './RedirectedPage.js';
import HelpTopic from './HelpTopic.js';
import JiraDashboard from './components/JiraDashboard.js';
import CreateIssueForm from './components/CreateIssueForm.js';
import { generateMockEpics } from './mockData/epicGenerator.js';

import TagManager from 'react-gtm-module';

import logo from './assets/logo.png';
import creditCardIcon from './assets/card.png';
import bankAccountIcon from './assets/account.png';
import autoIcon from './assets/auto.png';
import fraudIcon from './assets/fraud.png';
import bannerImage from './assets/banner.png';

import callIcon from './assets/call.png';
import emailIcon from './assets/email.png';
import supportIcon from './assets/person.png';
import searchIcon from './assets/search.png';

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
  const debounceTimeout = useRef(null);

  const topics = [
    { name: 'Credit Cards', icon: creditCardIcon, description: 'Manage your credit card accounts' },
    { name: 'Bank Accounts', icon: bankAccountIcon, description: 'View and manage your bank accounts' },
    { name: 'Auto Financing', icon: autoIcon, description: 'Explore auto loan options' },
    { name: 'Report Fraud', icon: fraudIcon, description: 'Report suspicious activity or fraud' },
  ];

  const [sessionId] = useState(localStorage.getItem('sessionId') || generateSessionId());
  useEffect(() => {
    localStorage.setItem('sessionId', sessionId);
  }, [sessionId]);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      sessionId: sessionId,
      pagePath: window.location.pathname,
    });
  }, [sessionId]);
/*
  const handleSearch = (value=searchTerm) => {
    const results = topics.filter((topic) =>
      topic.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTopics(results);
    window.dataLayer.push({
      event: 'homepage_search',
      search_term: value,
      source: 'homepage_search_bar',
      clickTime: new Date().toISOString(),
    });
    
  }; */

  const handleSearchDebounced = (value) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
  
    debounceTimeout.current = setTimeout(() => {
      if (value.trim() === "") {
        setFilteredTopics(topics); 
        window.dataLayer.push({
          event: 'search_cleared',
          source: 'homepage_search_bar',
          clickTime: new Date().toISOString(),
        });
      } else {
        const results = topics.filter((topic) =>
          topic.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTopics(results);
        window.dataLayer.push({
          event: 'homepage_search',
          search_term: value,
          search_result_count: results.length,
          source: 'homepage_search_bar',
          clickTime: new Date().toISOString(),
        });
      }
    }, 800); 
  };
  

  const handleButtonClick = (buttonName) => {
    console.log(`Button clicked: ${buttonName}`);
    window.dataLayer.push({
      event: 'button_click',
      sessionId: sessionId,
      buttonName: buttonName,
      clickTime: new Date().toISOString(),
    });
    fetch('https://cs-25-322-ai-clickstream-data.vercel.app/log-click', {
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
    fetch('https://cs-25-322-ai-clickstream-data.vercel.app/log-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sessionId,
        sessionEndTime: new Date().toISOString(),
      }),
    }).catch((error) => console.error('Error logging session:', error));
  };

  useEffect(() => {
    const handleBeforeUnload = () => sendSessionData();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [sendSessionData]);

  const handleGenerateEpics = async () => {
    const epics = await generateMockEpics('MYH', 3);
    alert(`Created ${epics.length} mock epics.`);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
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

              <div className="search-container">
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search help topics"
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    handleSearchDebounced(value);
                  }}
                />
                <button
                  className="search-icon-button"
                  onClick={() => {
                    handleButtonClick('Search Button');
                   // handleSearch();
                  }}
                >
                  <img src={searchIcon} alt="Search" className="icon-image" />
                </button>
              </div>

              <div className="bottom-banner">
                <h2 className="bottom-banner-title">What can we help you with?</h2>
                <div className="button-container">
                  {(filteredTopics.length > 0 ? filteredTopics : topics).map((topic, index) => (
                    <Link to={`/help/${topic.name.toLowerCase().replace(/ /g, '-')}`} key={index}>
                      <button
                        onClick={() => handleButtonClick(topic.name)}
                        className="bottom-banner-button"
                      >
                        <img src={topic.icon} alt={topic.name} className="button-icon" />
                        <span className="button-name">{topic.name}</span>
                        <span className="button-description">{topic.description}</span>
                      </button>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="jira-section">
                <h2></h2>
                <JiraDashboard projectKey="MYH" />
                <CreateIssueForm projectKey="MYH" />
              </div>
            </div>
          }
        />
        <Route path="/help/:topic" element={<HelpTopic />} />
        <Route path="/redirect" element={<RedirectedPage />} />
      </Routes>
    </Router>
  );
};

export default App