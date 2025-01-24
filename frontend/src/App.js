import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Redirect from './Redirect'; 
import ReactGA from 'react-ga4';

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

ReactGA.initialize('G-C9KTTC3D1E');
ReactGA.send('pageview');

function App() {

  const TrackPageView = () => {
    const location = useLocation();
    useEffect(() => {
      ReactGA.send({ hitType: 'pageview', page: location.pathname });
    }, [location]);

    return null;
  };

  const logClick = (buttonName) => {
    const sessionId = localStorage.getItem('sessionId') || generateSessionId();
    localStorage.setItem('sessionId', sessionId);

    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked',
      label: buttonName,
    });    
  
    fetch('http://testtest-hh2d.onrender.com/log-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sessionId,
        buttonName: buttonName,
        clickTime: new Date().toISOString(),
      }),
    }).catch((error) => console.error('Error logging click:', error));
  };
  
  const generateSessionId = () => {
    return Math.random().toString(36).substr(2, 9) + '-' + Date.now();
  }; 
  
  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId') || generateSessionId();
    localStorage.setItem('sessionId', sessionId);
  
    window.addEventListener('beforeunload', () => {
      fetch('http://localhost:3001/log-session-end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionId, endTime: new Date().toISOString() }),
      });
    });
  
    return () => {
      window.removeEventListener('beforeunload', () => {});
    };
  }, []);
  
  return (
    <Router>
      <Routes>
        {/* Main Page */}
        <Route
          path="/"
          element={
            <div className="App">

              {/* Top Banner */}
              <div className="banner">
                <h1>Customer Service Page</h1>
                <Link to="/redirect">
                  <button className="banner-button" onClick={() => logClick('Credit Cards')}>Credit Cards</button>
                </Link>
                <Link to="/redirect">
                  <button className="banner-button" onClick={() => logClick('Checkings and Savings')}>Checkings and Savings</button>
                </Link>
                <Link to="/redirect">
                  <button className="banner-button" onClick={() => logClick('Auto')}>Auto</button>
                </Link>
                <Link to="/redirect">
                  <button className="banner-button" onClick={() => logClick('Business')}>Business</button>
                </Link>
                <Link to="/redirect">
                  <button className="banner-button" onClick={() => logClick('Commercial')}>Commercial</button>
                </Link>
                <Link to="/redirect">
                  <button className="banner-button" onClick={() => logClick('Benefits and Tools')}>Benefits and Tools</button>
                </Link>
              </div>

              {/* Search Bar Section */}
              <div className="search-text">
                <p>What can we help you find?</p>
              </div>
              <div className="search-container">
                <input type="text" className="search-bar" placeholder="Help Center Search" />
                <button className="search-button" onClick={() => logClick('Search Button')}>Search</button>
              </div>

              {/* Bottom Banner */}
              <div className="bottom-banner">
                <h2 className="bottom-banner-title">CHOOSE A HELP TOPIC</h2>
                <div className="button-container">
                  <Link to="/redirect">
                    <button className="bottom-banner-button" onClick={() => logClick('Credit Cards')}>
                      <img src={creditCardIcon} alt="Credit Cards" className="button-icon" />
                      Credit Cards
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="bottom-banner-button" onClick={() => logClick('Bank Accounts')}>
                      <img src={bankAccountIcon} alt="Bank Accounts" className="button-icon" />
                      Bank Accounts
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="bottom-banner-button" onClick={() => logClick('Auto Financing')}>
                      <img src={autoIcon} alt="Auto Financing" className="button-icon" />
                      Auto Financing
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="bottom-banner-button" onClick={() => logClick('Capital One Travel')}>
                      <img src={travelIcon} alt="Capital One Travel" className="button-icon" />
                      Capital One Travel
                    </button>
                  </Link>
                </div>
              </div>

              {/* Recommended Topics */}
              <div className="recommended-topics">
                <h2 className="bottom-banner-title">RECOMMENDED TOPICS</h2>
                <div className="button2-container">
                  <Link to="/redirect">
                    <button className="recommended-button" onClick={() => logClick('Activate Credit Card')}>
                      <img src={topic1} alt="Activate credit card" className="button-icon" />
                      Activate credit card
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button" onClick={() => logClick('Make Credit Card Payment')}>
                      <img src={topic2} alt="Make credit card payment" className="button-icon" />
                      Make credit card payment
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button" onClick={() => logClick('Lost or Stolen Debit Card')}>
                      <img src={topic3} alt="Lost or stolen debit card" className="button-icon" />
                      Lost or stolen debit card
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button" onClick={() => logClick('Cash Advance')}>
                      <img src={topic4} alt="Cash advance" className="button-icon" />
                      Cash advance
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button" onClick={() => logClick('Make a Deposit')}>
                      <img src={topic5} alt="Make a deposit" className="button-icon" />
                      Make a deposit
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button" onClick={() => logClick('Sign-in Support')}>
                      <img src={topic6} alt="Sign-in support" className="button-icon" />
                      Sign-in support
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button" onClick={() => logClick('Dispute a Credit Charge')}>
                      <img src={topic7} alt="Dispute a credit charge" className="button-icon" />
                      Dispute a credit charge
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button" onClick={() => logClick('Increase Credit Limit')}>
                      <img src={topic8} alt="Increase credit limit" className="button-icon" />
                      Increase credit limit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          }
        />

        {/* Redirected Page */}
        <Route path="/redirect" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
