import React, { useState, useEffect } from 'react';
import {
  Routes, Route, Link, useNavigate, useParams, useLocation
} from 'react-router-dom';
import './App.css';
import RedirectedPage from './RedirectedPage';
import HelpTopic from './HelpTopic';
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

const topics = [
  { name: 'Credit Cards', icon: creditCardIcon, description: 'Manage your credit card accounts' },
  { name: 'Bank Accounts', icon: bankAccountIcon, description: 'View and manage your bank accounts' },
  { name: 'Auto Financing', icon: autoIcon, description: 'Explore auto loan options' },
  { name: 'Report Fraud', icon: fraudIcon, description: 'Report suspicious activity or fraud' },
];

const TopBanner = () => (
  <div className="banner">
    <div className="banner-left">
      <img src={logo} alt="Bank Logo" className="banner-logo" />
      <span className="bank-name">LowercaseOne</span>
    </div>
    <h1 className="banner-title">Customer Service</h1>
    <div className="banner-right">
      <a href="tel:+18045555555" className="icon-button">
        <img src={require('./assets/call.png')} alt="Phone" className="icon-image" />
      </a>
      <a href="mailto:support@yourbank.com" className="icon-button">
        <img src={require('./assets/email.png')} alt="Email" className="icon-image" />
      </a>
      <a href="/redirect" className="icon-button">
        <img src={require('./assets/person.png')} alt="Support" className="icon-image" />
      </a>
    </div>
  </div>
);

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const term = searchTerm.trim();
    if (!term) return;
    const slug = term.toLowerCase().replace(/ /g, '-');
    navigate(`/search/${slug}`);
  };

  return (
    <div className="App">
      <TopBanner />
      <div className="banner-image-container">
        <img src={bannerImage} alt="Promotional Banner" className="banner-image" />
      </div>
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
      <div className="bottom-banner">
        <h2 className="bottom-banner-title">What can we help you with?</h2>
        <div className="button-container">
          {topics.map((topic, index) => (
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
  );
};

const SearchResults = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(query.replace(/-/g, ' '));
  }, [query]);

  const results = topics.filter((topic) =>
    topic.name.toLowerCase().includes(query.replace(/-/g, ' ').toLowerCase())
  );

  const handleSearch = () => {
    const slug = inputValue.toLowerCase().trim().replace(/ /g, '-');
    if (slug) {
      navigate(`/search/${slug}`);
    }
  };

  return (
    <div className="App">
      <TopBanner />
      <div className="banner-image-container">
        <img src={bannerImage} alt="Promotional Banner" className="banner-image" />
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search help topics"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="search-icon-button" onClick={handleSearch}>
          <img src={require('./assets/search.png')} alt="Search" className="icon-image" />
        </button>
      </div>
      <div className="bottom-banner">
        <h2 className="bottom-banner-title">Results for "{query.replace(/-/g, ' ')}"</h2>
        <Link to="/" className="back-home-link">← Back to Home</Link>
        <div className="button-container">
          {results.length > 0 ? (
            results.map((topic, index) => (
              <Link to={`/help/${topic.name.toLowerCase().replace(/ /g, '-')}`} key={index}>
                <button className="bottom-banner-button" onClick={() => console.log(`Button clicked: ${topic.name}`)}>
                  <img src={topic.icon} alt={topic.name} className="button-icon" />
                  <span className="button-name">{topic.name}</span>
                  <span className="button-description">{topic.description}</span>
                </button>
              </Link>
            ))
          ) : (
            <div className="no-results-box">
              <p className="no-results-text">No results found for this search.</p>
              <p className="no-results-subtext">Try a different keyword or browse topics above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <TrackPageView />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/help/:topic" element={<HelpTopic />} />
        <Route path="/redirect" element={<RedirectedPage />} />
      </Routes>
    </>
  );
};

export default App;
