const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from 'public' or your frontend build folder
app.use(express.static(path.join(__dirname, 'public')));

// For single-page apps, send index.html for all unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
