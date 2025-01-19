import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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

ReactGA.initialize('G-1NFCNQ46LT');
ReactGA.send('pageview');

function App() {

  const TrackPageView = () => {
    const location = useLocation();
    useEffect(() => {
      ReactGA.send({ hitType: 'pageview', page: location.pathname });
    }, [location]);

    return null;
  };

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
                  <button className="banner-button">Credit Cards</button>
                </Link>
                <Link to="/redirect">
                  <button className="banner-button">Checkings and Savings</button>
                </Link>
                <Link to="/redirect">
                  <button className="banner-button">Auto</button>
                </Link>
                <Link to="/redirect">
                  <button className="banner-button">Business</button>
                </Link>
                <Link to="/redirect">
                  <button className="banner-button">Commercial</button>
                </Link>
                <Link to="/redirect">
                  <button className="banner-button">Benefits and Tools</button>
                </Link>
              </div>

              {/* Search Bar Section */}
              <div className="search-text">
                <p>What can we help you find?</p>
              </div>
              <div className="search-container">
                <input type="text" className="search-bar" placeholder="Help Center Search" />
                <button className="search-button">Search</button>
              </div>

              {/* Bottom Banner */}
              <div className="bottom-banner">
                <h2 className="bottom-banner-title">CHOOSE A HELP TOPIC</h2>
                <div className="button-container">
                  <Link to="/redirect">
                    <button className="bottom-banner-button">
                      <img src={creditCardIcon} alt="Credit Cards" className="button-icon" />
                      Credit Cards
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="bottom-banner-button">
                      <img src={bankAccountIcon} alt="Bank Accounts" className="button-icon" />
                      Bank Accounts
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="bottom-banner-button">
                      <img src={autoIcon} alt="Auto Financing" className="button-icon" />
                      Auto Financing
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="bottom-banner-button">
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
                    <button className="recommended-button">
                      <img src={topic1} alt="Activate credit card" className="button-icon" />
                      Activate credit card
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button">
                      <img src={topic2} alt="Make credit card payment" className="button-icon" />
                      Make credit card payment
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button">
                      <img src={topic3} alt="Lost or stolen debit card" className="button-icon" />
                      Lost or stolen debit card
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button">
                      <img src={topic4} alt="Cash advance" className="button-icon" />
                      Cash advance
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button">
                      <img src={topic5} alt="Make a deposit" className="button-icon" />
                      Make a deposit
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button">
                      <img src={topic6} alt="Sign-in support" className="button-icon" />
                      Sign-in support
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button">
                      <img src={topic7} alt="Dispute a credit charge" className="button-icon" />
                      Dispute a credit charge
                    </button>
                  </Link>
                  <Link to="/redirect">
                    <button className="recommended-button">
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
