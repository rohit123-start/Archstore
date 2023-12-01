const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON data
app.use(bodyParser.json());

// POST route to handle the payload
app.post('/', (req, res) => {
  const { str } = req.body;

  // Regular expression to count words
  const wordCount = str.match(/\S+/g)?.length || 0;
    console.log(wordCount)
  // Checking if the word count is at least 8
  if (wordCount >= 8) {
    return res.status(200).send('200 OK');
  } else {
    return res.status(403).send('Not Acceptable');
  }
});

// Starting the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
