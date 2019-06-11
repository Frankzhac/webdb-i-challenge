const express = require('express');
const db = require('./data/accounts-model')

const server = express();
server.use(express.json());

// your code here
const port = 4000;

server.get('/', (req, res) => {
  res.send('Hello Word');
});

// Accounts Model start below

// Get
server.get('/accounts', (req, res) => {
  db.find()
    .then(accounts => {
      res.json({ accounts });
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});

module.exports = server;
