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
import fraudIcon from './assets/fraud.png';
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
  const searchTerm = query.replace(/-/g, ' ');
  const results = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="banner">
        <div className="banner-left">
          <img src={logo} alt="Bank Logo" className="banner-logo" />
          <span className="bank-name">LowercaseOne</span>
        </div>
        <h1 className="banner-title">Search Results</h1>
        <div className="banner-right">
          <Link to="/" className="icon-button">
            <img src={require('./assets/search.png')} alt="Home" className="icon-image" />
          </Link>
        </div>
      </div>

      <div className="banner-image-container">
        <img src={bannerImage} alt="Promotional Banner" className="banner-image" />
      </div>

      <div className="bottom-banner">
        <h2 className="bottom-banner-title">Results for "{searchTerm}"</h2>
        <div className="button-container">
          {results.length > 0 ? (
            results.map((topic, index) => (
              <Link to={`/help/${topic.name.toLowerCase().replace(/ /g, '-')}`} key={index}>
                <button className="bottom-banner-button">
                  <img src={topic.icon} alt={topic.name} className="button-icon" />
                  <span className="button-name">{topic.name}</span>
                  <span className="button-description">{topic.description}</span>
                </button>
              </Link>
            ))
          ) : (
            <p style={{ color: 'white' }}>No results found.</p>
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