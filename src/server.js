const express = require('express');
const session = require("express-session");
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs'); //bcrypt hash is an async function, very slow alorithm


//middelware searching for every consecutive request
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))
app.use(session({ //This session receives objects, with the options; secret, resave, saveUninitialized
        secret: "Keep it secret, key that will sign cookie", // A key that will take in some string
        resave: false, // For every request to the server we want to create a new session
        saveUninitialized: false , // If we have not modified the session, we dont want it to save
    })
);

// Database Connection
const db = require('knex')({ //Knex is used to interact with the database
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, './db.sqlite3'),
    },
    useNullAsDefault: true,
});
