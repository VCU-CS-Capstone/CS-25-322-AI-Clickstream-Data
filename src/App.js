import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import './App.css';
import creditCardIcon from './assets/card.png';
import bankAccountIcon from './assets/check.png';
import autoFinancingIcon from './assets/car.png';
import travelIcon from './assets/person.png';
import capitalOneLogo from './assets/logo.png';
import searchIcon from './assets/search.png';
import locationIcon from './assets/location.png';
import userIcon from './assets/user.png';

// Initialize Google Analytics with your Measurement ID
ReactGA.initialize('G-WBTJJXYXWX'); // Replace with your actual GA4 Measurement ID

function HelpPage() {
  return (
    <div className="help-page">
      <h1>Help Center</h1>
      <p>This is where users will see more details about the selected topic.</p>
      <Link to="/">Go Back</Link>
    </div>
  );
}

// Track page views whenever the route changes
function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);
}

function HomePage() {
  return (
    <div className="help-center">
      {/* Top Navigation Banner */}
      <header className="nav-banner">
        <div className="left-section">
          <Link to="/">
            <img src={capitalOneLogo} alt="Capital One Logo" className="logo" />
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/help-page">Credit Cards</Link>
          <Link to="/help-page">Checking & Savings</Link>
          <Link to="/help-page">Auto</Link>
          <Link to="/help-page">Business</Link>
          <Link to="/help-page">Commercial</Link>
          <Link to="/help-page">Benefits & Tools</Link>
        </nav>

        <div className="right-section">
          <Link to="/help-page" className="icon-button">
            <img src={searchIcon} alt="Search" />
          </Link>
          <Link to="/help-page" className="icon-button">
            <img src={locationIcon} alt="Location" />
          </Link>
          <Link to="/help-page" className="icon-button">
            <img src={userIcon} alt="User Profile" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <section className="search-section">
          <h1>What can we help you find?</h1>
          <div className="search-container">
            <input type="text" placeholder="Help Center Search" className="search-bar" />
            <button className="search-btn">Search</button>
          </div>
        </section>

        <section className="help-topics">
          <h2>Choose a Help Topic</h2>
          <div className="topics">
            <Link to="/help-page" className="topic">
              <img src={creditCardIcon} alt="Credit Cards" />
              <h3>Credit Cards</h3>
              <p>Apply, activate your card or browse topics.</p>
              <span>Get help with cards ></span>
            </Link>
            <Link to="/help-page" className="topic">
              <img src={bankAccountIcon} alt="Bank Accounts" />
              <h3>Bank Accounts</h3>
              <p>Open a new account, link accounts and more.</p>
              <span>Get help with banking ></span>
            </Link>
            <Link to="/help-page" className="topic">
              <img src={autoFinancingIcon} alt="Auto Financing" />
              <h3>Auto Financing</h3>
              <p>Activate your online account, manage your auto loan and more.</p>
              <span>Get help with auto ></span>
            </Link>
            <Link to="/help-page" className="topic">
              <img src={travelIcon} alt="Capital One Travel" />
              <h3>Capital One Travel</h3>
              <p>Make the most of your Venture benefits.</p>
              <span>Get help with travel ></span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <usePageTracking /> {/* Track page views */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/help-page" element={<HelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
