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
  const [rewardPoints, setRewardPoints] = useState(5000);
  const [spendingLimit, setSpendingLimit] = useState('');
  const [creditLimit, setCreditLimit] = useState(5000);
  const [creditBalance, setCreditBalance] = useState(1500);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [creditLimitIncrease, setCreditLimitIncrease] = useState('');
  const [cardDisabled, setCardDisabled] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([
    { id: 1, name: "Expensive Coffee", amount: "$6.75" },
    { id: 2, name: "Online Purchase", amount: "$48.99" },
    { id: 3, name: "Gym Membership", amount: "$24.99" },
    { id: 4, name: "Concert Ticket", amount: "$89.99" }
  ]);
  const [accountBalance, setAccountBalance] = useState(5432.78);
const [transferAmount, setTransferAmount] = useState('');
const [depositAmount, setDepositAmount] = useState('');
const [autoLoanBalance, setAutoLoanBalance] = useState(12000); // Example auto loan balance
const [autoPaymentAmount, setAutoPaymentAmount] = useState('');
const [interestRate, setInterestRate] = useState(3.5); // Example interest rate
const [refinanceAmount, setRefinanceAmount] = useState('');
const [fraudType, setFraudType] = useState('');
const [fraudDescription, setFraudDescription] = useState('');
const [cardFrozen, setCardFrozen] = useState(false);
const [selectedCard, setSelectedCard] = useState('');
const [frozenCards, setFrozenCards] = useState([]); 


  if (!topicData) {
    return <h2>Topic not found</h2>;
  }

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

            {selectedOption === "View Transactions" && (
              <ul>
                {transactionHistory.map((txn) => (
                  <li key={txn.id}>{txn.name} - {txn.amount}</li>
                ))}
              </ul>
            )}

            {selectedOption === "Pay Credit Card Bill" && (
              <div>
                <p>Current Credit Card Balance: <b>${creditBalance.toFixed(2)}</b></p>
                <input
                  type="number"
                  placeholder="Enter payment amount"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="input-field"
                />
                <button
                  className="confirm-button"
                  onClick={() => {
                    const amount = parseFloat(paymentAmount);
                    if (amount > 0 && amount <= creditBalance) {
                      setCreditBalance(creditBalance - amount);
                      setConfirmationMessage(`Payment of $${amount.toFixed(2)} processed successfully!`);
                    } else if (amount > creditBalance) {
                      setConfirmationMessage("Payment exceeds balance. Enter a valid amount.");
                    } else {
                      setConfirmationMessage("Enter a valid payment amount.");
                    }
                    setPaymentAmount('');
                  }}
                >
                  Pay Now
                </button>
              </div>
            )}

            {selectedOption === "Manage Rewards" && (
              <div>
                <p>You have <b>{rewardPoints} reward points</b>.</p>
                <select className="dropdown" onChange={(e) => {
                  const pointsUsed = parseInt(e.target.value, 10);
                  if (pointsUsed <= rewardPoints) {
                    setRewardPoints(rewardPoints - pointsUsed);
                    setConfirmationMessage("Reward redeemed!");
                  } else {
                    setConfirmationMessage("Not enough points to redeem this reward.");
                  }
                }}>
                  <option value="">Select Reward</option>
                  <option value="2500">Gift Card - 2,500 points</option>
                  <option value="5000">Cashback - 5,000 points</option>
                </select>
              </div>
            )}

            {selectedOption === "Set Spending Limits" && (
              <div>
                <input
                  type="number"
                  placeholder="Enter spending limit"
                  value={spendingLimit}
                  onChange={(e) => setSpendingLimit(e.target.value)}
                  className="input-field"
                />
                <button className="confirm-button" onClick={() => {
                  if (spendingLimit > 0) {
                    setConfirmationMessage(`Spending limit set to $${spendingLimit}`);
                  } else {
                    setConfirmationMessage("Enter a valid spending limit.");
                  }
                }}>
                  Set Limit
                </button>
              </div>
            )}

{selectedOption === "Report Lost/Stolen Card" && (
  <button
    className="confirm-button"
    onClick={() => {
      setConfirmationMessage("Your card has been reported lost/stolen. A new one will be sent within 5-7 business days.");
      setCardDisabled(true); // Disables the button after reporting
    }}
    disabled={cardDisabled}
  >
    Report Now
  </button>
)}

{selectedOption === "Request a Credit Limit Increase" && (
  <div>
    <p>Current Credit Limit: <b>${creditLimit}</b></p>
    <select
      value={creditLimitIncrease}
      onChange={(e) => setCreditLimitIncrease(e.target.value)}
      className="dropdown"
    >
      <option value="">Select Increase Amount</option>
      <option value="500">+$500</option>
      <option value="1000">+$1,000</option>
      <option value="2000">+$2,000</option>
    </select>
    <button
      className="confirm-button"
      onClick={() => {
        if (creditLimitIncrease) {
          const increaseAmount = parseInt(creditLimitIncrease, 10);
          setCreditLimit(creditLimit + increaseAmount);
          setConfirmationMessage(`Credit limit increased to $${creditLimit + increaseAmount}`);
          setCreditLimitIncrease(""); // Reset dropdown
        } else {
          setConfirmationMessage("Select a valid credit limit increase.");
        }
      }}
    >
      Submit Request
    </button>
  </div>
)}

{selectedOption === "View Balance" && (
  <div>
    <p>Your current balance is: <strong>${accountBalance.toFixed(2)}</strong></p>
  </div>
)}

{selectedOption === "Transfer Money" && (
  <div>
    <input
      type="text"
      placeholder="Recipient Account Number"
      className="input-field"
    />
    <input
      type="number"
      placeholder="Amount ($)"
      value={transferAmount}
      onChange={(e) => setTransferAmount(e.target.value)}
      className="input-field"
    />
    <button
      className="confirm-button"
      onClick={() => {
        const amount = parseFloat(transferAmount);
        if (amount > 0 && amount <= accountBalance) {
          setAccountBalance(accountBalance - amount);
          setConfirmationMessage(`Successfully transferred $${amount.toFixed(2)}!`);
        } else if (amount > accountBalance) {
          setConfirmationMessage("Transfer amount exceeds account balance.");
        } else {
          setConfirmationMessage("Enter a valid transfer amount.");
        }
        setTransferAmount('');
      }}
    >
      Transfer Now
    </button>
  </div>
)}

{selectedOption === "Deposit Money" && (
  <div>
    <input
      type="number"
      placeholder="Deposit Amount ($)"
      value={depositAmount}
      onChange={(e) => setDepositAmount(e.target.value)}
      className="input-field"
    />
    <button
      className="confirm-button"
      onClick={() => {
        const amount = parseFloat(depositAmount);
        if (amount > 0) {
          setAccountBalance(accountBalance + amount);
          setConfirmationMessage(`Successfully deposited $${amount.toFixed(2)}!`);
        } else {
          setConfirmationMessage("Enter a valid deposit amount.");
        }
        setDepositAmount('');
      }}
    >
      Deposit Now
    </button>
  </div>
)}

{selectedOption === "View Auto Loan Balance" && (
  <div>
    <p>Your current auto loan balance is: <strong>${autoLoanBalance.toFixed(2)}</strong></p>
  </div>
)}

{selectedOption === "Make a Payment" && (
  <div>
    <p>Current Auto Loan Balance: <b>${autoLoanBalance.toFixed(2)}</b></p>
    <input
      type="number"
      placeholder="Enter payment amount"
      value={autoPaymentAmount}
      onChange={(e) => setAutoPaymentAmount(e.target.value)}
      className="input-field"
    />
    <button
      className="confirm-button"
      onClick={() => {
        const amount = parseFloat(autoPaymentAmount);
        if (amount > 0 && amount <= autoLoanBalance) {
          setAutoLoanBalance(autoLoanBalance - amount);
          setConfirmationMessage(`Payment of $${amount.toFixed(2)} processed successfully!`);
        } else if (amount > autoLoanBalance) {
          setConfirmationMessage("Payment exceeds loan balance. Enter a valid amount.");
        } else {
          setConfirmationMessage("Enter a valid payment amount.");
        }
        setAutoPaymentAmount('');
      }}
    >
      Pay Now
    </button>
  </div>
)}

{selectedOption === "Check Interest Rates" && (
  <div>
    <p>Your current auto loan interest rate is: <strong>{interestRate}%</strong></p>
  </div>
)}

{selectedOption === "Refinance Auto Loan" && (
  <div>
    <input
      type="number"
      placeholder="Enter refinance amount"
      value={refinanceAmount}
      onChange={(e) => setRefinanceAmount(e.target.value)}
      className="input-field"
    />
    <button
      className="confirm-button"
      onClick={() => {
        const amount = parseFloat(refinanceAmount);
        if (amount > 0 && amount <= autoLoanBalance) {
          setAutoLoanBalance(autoLoanBalance - amount);
          setConfirmationMessage(`Your refinance request for $${amount.toFixed(2)} has been submitted.`);
        } else if (amount > autoLoanBalance) {
          setConfirmationMessage("Refinance amount exceeds loan balance. Enter a valid amount.");
        } else {
          setConfirmationMessage("Enter a valid refinance amount.");
        }
        setRefinanceAmount('');
      }}
    >
      Refinance Now
    </button>
  </div>
)}

{selectedOption === "Report Unauthorized Transaction" && (
  <div>
    <label>Select Type of Fraud:</label>
    <select
      className="dropdown"
      value={fraudType}
      onChange={(e) => setFraudType(e.target.value)}
    >
      <option value="">Select Fraud Type</option>
      <option value="Unauthorized Purchase">Unauthorized Purchase</option>
      <option value="Phishing Attempt">Phishing Attempt</option>
      <option value="Identity Theft">Identity Theft</option>
    </select>

    <label>Provide Details:</label>
    <textarea
      className="input-field"
      placeholder="Describe what happened..."
      value={fraudDescription}
      onChange={(e) => setFraudDescription(e.target.value)}
    />

    <button
      className="confirm-button"
      onClick={() => {
        if (fraudType && fraudDescription) {
          setConfirmationMessage(`Fraud Report Submitted: ${fraudType} - "${fraudDescription}"`);
          setFraudType('');
          setFraudDescription('');
        } else {
          setConfirmationMessage("Please fill out all fields.");
        }
      }}
    >
      Submit Report
    </button>
  </div>
)}

{selectedOption === "Freeze Card" && (
  <div>
    <label>Select a Card to Freeze:</label>
    <select
      className="dropdown"
      value={selectedCard}
      onChange={(e) => setSelectedCard(e.target.value)}
    >
      <option value="">Select Card</option>
      <option value="Credit Card">Credit Card</option>
      <option value="Debit Card">Debit Card</option>
      <option value="Auto Loan Card">Auto Loan Card</option>
    </select>

    <button
      className="confirm-button"
      onClick={() => {
        if (!selectedCard) {
          setConfirmationMessage("Please select a card to freeze.");
          return;
        }
        if (frozenCards.includes(selectedCard)) {
          setConfirmationMessage(`${selectedCard} is already frozen.`);
          return;
        }

        setFrozenCards([...frozenCards, selectedCard]); // Track frozen cards internally
        setConfirmationMessage(`${selectedCard} has been frozen.`);
      }}
      disabled={!selectedCard} // Disable button if no card is selected
    >
      Freeze Card
    </button>
  </div>
)}

{selectedOption === "Contact Fraud Support" && (
  <div>
    <p>
  Call <a href="tel:1800555FRAUD"><strong>1-800-555-FRAUD </strong></a> 
  or visit our <strong>Fraud Support Center</strong> for immediate assistance.
</p>
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