import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './HelpTopic.css';
import logo from './assets/logo.png';
import bannerImage from './assets/banner.png';

const helpTopicsData = {
  "credit-cards": {
    title: "Credit Cards",
    description: "View transactions, manage rewards, and make payments.",
    options: [
      "View Transactions",
      "Pay Credit Card Bill",
      "Manage Rewards",
      "Set Spending Limits",
      "Report Lost/Stolen Card",
      "Request a Credit Limit Increase"
    ]
  },
  "bank-accounts": {
    title: "Bank Accounts",
    description: "Check your balance, review transactions, and manage accounts.",
    options: [
      "View Balance",
      "View Transactions",
      "Transfer Money",
      "Deposit Money"
    ]
  },
  "auto-financing": {
    title: "Auto Financing",
    description: "Explore loan options, check balances, and make payments.",
    options: [
      "View Auto Loan Balance",
      "Make a Payment",
      "Check Interest Rates",
      "Refinance Auto Loan"
    ]
  },
  "report-fraud": {
    title: "Report Fraud",
    description: "Identify suspicious transactions and report fraudulent activity.",
    options: [
      "Report Unauthorized Transaction",
      "Freeze Card",
      "Contact Fraud Support"
    ]
  }
};

const HelpTopic = () => {
  const { topic } = useParams();
  const topicData = helpTopicsData[topic];

  const [selectedOption, setSelectedOption] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  if (!topicData) {
    return <h2>Topic not found</h2>;
  }

  const handleSubtopicClick = (subtopic) => {
    console.log(`Subtopic clicked: ${subtopic}`);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'subtopic_click',
      subtopicName: subtopic,
      clickTime: new Date().toISOString(),
    });

    fetch('https://cs-25-322-ai-clickstream-data.onrender.com/log-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: localStorage.getItem('sessionId'),
        subtopicName: subtopic,
        clickTime: new Date().toISOString(),
      }),
    }).catch((error) => console.error('Error logging subtopic click:', error));
  };

  return (
    <div className="App">
      <div className="banner">
        <div className="banner-left">
          <img src={logo} alt="Bank Logo" className="banner-logo" />
          <span className="bank-name">LowercaseOne</span>
        </div>
        <h1 className="banner-title">{topicData.title}</h1>
      </div>

      <div className="banner-image-container">
        <img src={bannerImage} alt="Promotional Banner" className="banner-image" />
      </div>

      <div className="help-topic-container">
        <h2>{topicData.title}</h2>
        <p>{topicData.description}</p>

        {topicData.options && (
          <div className="options-container">
            <h3>Available Options:</h3>
            <ul>
              {topicData.options.map((option, index) => (
                <li key={index}>
                  <button
                    className="option-button"
                    onClick={() => {
                      handleSubtopicClick(option);
                      setSelectedOption(option);
                      setConfirmationMessage('');
                    }}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedOption && (
          <div className="response-container">
            <h3>{selectedOption}</h3>
            {selectedOption === "View Balance" && (
              <div>
                <p>Your current balance is: <strong>$5,432.78</strong></p>
              </div>
            )}
            {selectedOption === "View Transactions" && (
              <ul>
                <li>Expensive Coffee - $6.75</li>
                <li>Online Purchase - $48.99</li>
                <li>Gym Membership - $24.99</li>
                <li>Concert Ticket - $89.99</li>
              </ul>
            )}
            {selectedOption === "Pay Credit Card Bill" && (
              <div>
                <p>Current Credit Card Balance: <b>$1,500.00</b></p>
                <input type="number" placeholder="Enter payment amount" className="input-field" />
                <button className="confirm-button">Pay Now</button>
              </div>
            )}
            {selectedOption === "Manage Rewards" && (
              <div>
                <p>You have <b>5,000 reward points</b>.</p>
                <select className="dropdown">
                  <option value="">Select Reward</option>
                  <option value="2500">Gift Card - 2,500 points</option>
                  <option value="5000">Cashback - 5,000 points</option>
                </select>
              </div>
            )}
            {selectedOption === "Set Spending Limits" && (
              <div>
                <input type="number" placeholder="Enter spending limit" className="input-field" />
                <button className="confirm-button">Set Limit</button>
              </div>
            )}
            {selectedOption === "Report Lost/Stolen Card" && (
              <button className="confirm-button">Report Now</button>
            )}
            {selectedOption === "Request a Credit Limit Increase" && (
              <div>
                <p>Current Credit Limit: <b>$5,000</b></p>
                <select className="dropdown">
                  <option value="">Select Increase Amount</option>
                  <option value="500">+$500</option>
                  <option value="1000">+$1,000</option>
                  <option value="2000">+$2,000</option>
                </select>
                <button className="confirm-button">Submit Request</button>
              </div>
            )}
            {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
          </div>
        )}

        <Link to="/">
          <button className="back-button">Go Back to Home Page</button>
        </Link>
      </div>
    </div>
  );
};

export default HelpTopic;
