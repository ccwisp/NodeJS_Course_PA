const express = require('express');
const fs = require('fs-extra');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 3001;

// Adding a new user
app.post('/users', (req, res) => {
  const un = req.body.login;
  const pw = req.body.password;
  if (un && pw) {
    const db = fs.readJsonSync('./db.json');
    db[un] = pw;
    fs.writeJsonSync('./db.json', db);

    return res.status(201).send(Object.keys(db).pop());
  }

  res.status(404).send(`Could not register account`);
});

// Returning a user
app.post('/user/', (req, res) => {
  const { un, pw } = req.body;
  if (un && pw) {
    const db = fs.readJsonSync('./db.json');
    if (db[un] == pw) return res.send(un);
  }

  res.status(404).send('User not found in our super secret database');
});

app.listen(port, () => {
  console.log(`Server running at ${port} port`);
});
