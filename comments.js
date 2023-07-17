// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const comments = require('./comments');

// Configure express to use body-parser as middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.status(200).send(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id === req.params.id);
  if (comment) {
    res.status(200).send(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// Create a comment
app.post('/comments', (req, res) => {
  if (req.body.id && req.body.name && req.body.comment) {
    comments.push(req.body);
    res.status(200).send('Comment created');
  } else {
    res.status(400).send('Comment not created');
  }
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id === req.params.id);
  if (comment) {
    comment.name = req.body.name;
    comment.comment = req.body.comment;
    res.status(200).send('Comment updated');
  } else {
    res.status(404).send('Comment not found');
  }
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id === req.params.id);
  if (comment) {
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.status(200).send('Comment deleted');
  } else {
    res.status(404).send('Comment not found');
  }
});

// Listen on port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});