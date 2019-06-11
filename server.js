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

server.get('/accounts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(account => {
      if (account.length === 0) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.json(account);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
         error: "The user information could not be retrieved."
      });
    });
});

server.post('/accounts', async (req, res) => {
  const { name, budget } = req.body;
  if (!name || !budget) {
    res.status(400).json({
      errorMessage: "Please provide name and budget for the user."
    });
  }
  // add/save new user in the db

  db.add(
    req.body
  )
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({
          success: false,
          error: "There was an error while saving the user to the database",
        });
      });
});

module.exports = server;
