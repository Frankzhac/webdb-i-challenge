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

// add(): calling add passing it a account object will add it to the database
// and return a promise that resolves with the newly inserted account.

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

// Update accepts two arguments, the first is the id of the account to update
// and the second is an object with the changes to apply

server.put('/accounts/:id', (req, res) => {
  const { id } = req.params;
  const { name, budget } = req.body;
  if (!name || !budget) {
    res.status(400).json({
      errorMessage: "The user with the specified ID does not exist."
    });
  }

  db.update(id, { name, budget })
    .then(response => {
      if (response == 0) {
        res.status(404).json({
          errorMessage: "Please provide name and bio for the user."
        })
      }

      db.findById(id)
        .then(account => {
          if (account.length === 0) {
            res.status(500).json({
              error: "The user information could not be modified."
            })
          } else {
            res.json(account);
          }
        })
        .catch(err => {
          res.status(200).json({
            errorMessage: "Can't find user by id."
          });
        });
    })
});

// remove(): the remove method accepts an id as it's first parameter and upon successfully deleting the account from the database
// it returns returns a promise that resolves with the number of records deleted.

server.delete('/accounts/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(response => {
      if (response === 0) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.json({
          success: `User with id: ${id} removed from system`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The user could not be removed"
      });
    });
});


module.exports = server;
