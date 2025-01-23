const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const cors = require('cors'); 

app.use(cors()); 
app.use(bodyParser.json());

require('dotenv').config({ path: '/Users/carissatrieu/.env' });

const db = mysql.createConnection({
  host: process.env.CLICK_DB_HOST,
  user: process.env.CLICK_DB_USER,
  password: process.env.CLICK_DB_PASSWORD,
  database: process.env.CLICK_DB_NAME,
  port: process.env.CLICK_DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.message);
      process.exit(1); // Stop the server
    }
    console.log('Connected to MySQL database');
  });
  

// Endpoint to log click data
app.post('/log-click', (req, res) => {
  const { sessionId, buttonName, clickTime } = req.body;
  const query = `
    INSERT INTO clickstream (session_id, button_name, click_time)
    VALUES (?, ?, ?)
  `;
  db.query(query, [sessionId, buttonName, clickTime], (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(200).send('Click logged');
  });
});

// Start server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
