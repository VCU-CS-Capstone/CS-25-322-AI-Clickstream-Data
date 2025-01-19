const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON requests

// Default route
app.get('/', (req, res) => {
    res.send('Customer Service API is running...');
});

// Start server
const PORT = process.env.PORT || 5002; // Change to 5002
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

