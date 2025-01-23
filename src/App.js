import React from 'react';
import './App.css';
import creditCardIcon from './assets/card.png'; // Replace with appropriate icons
import bankAccountIcon from './assets/check.png';
import autoFinancingIcon from './assets/car.png';
import travelIcon from './assets/person.png';

function App() {
  return (
    <div className="help-center">
      <header className="header">
        <img
          src="logo.png"
          alt="Capital One Logo"
          className="logo"
        />
        <nav className="nav">
          <a href="#">Credit Cards</a>
          <a href="#">Checking & Savings</a>
          <a href="#">Auto</a>
          <a href="#">Business</a>
          <a href="#">Commercial</a>
          <a href="#">Benefits & Tools</a>
        </nav>
      </header>
      <main>
        <section className="search-section">
          <h1>What can we help you find?</h1>
          <input
            type="text"
            placeholder="Help Center Search"
            className="search-bar"
          />
        </section>
        <section className="help-topics">
          <h2>Choose a Help Topic</h2>
          <div className="topics">
            <div className="topic">
              <img src={creditCardIcon} alt="Credit Cards" />
              <h3>Credit Cards</h3>
              <p>Apply, activate your card or browse topics.</p>
              <a href="#">Get help with cards</a>
            </div>
            <div className="topic">
              <img src={bankAccountIcon} alt="Bank Accounts" />
              <h3>Bank Accounts</h3>
              <p>Open a new account, link accounts and more.</p>
              <a href="#">Get help with banking</a>
            </div>
            <div className="topic">
              <img src={autoFinancingIcon} alt="Auto Financing" />
              <h3>Auto Financing</h3>
              <p>Activate your online account, manage your auto loan and more.</p>
              <a href="#">Get help with auto</a>
            </div>
            <div className="topic">
              <img src={travelIcon} alt="Capital One Travel" />
              <h3>Capital One Travel</h3>
              <p>Make the most of your Venture benefits.</p>
              <a href="#">Get help with travel</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
