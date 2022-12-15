const express = require('express');
const session = require("express-session");
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs'); //bcrypt hash is an async function, very slow alorithm

const PORT = 3001;


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


// Routes
app.post('/signup', async (req, res) => {
    try {
        const {username, password} = req.body; //sending username and Password to endpoint /signup

        if (!username || !password) {
            res.status(400).json(`Missing ${!username ? "username" : 'password'}!`) //If the username and/or the password is missing, an error message will appear
        }

        const hash = await bcrypt.hash(password, 13); /*This is how you can combine hash and salt function together. Nr 13 is a salt generator. 
        The higher the generator number is the more times the password gets randomized so it becomes safer.The higher the number,the slower the funciton becomes*/
        await db('users').insert({username: username, password: hash}); //Inserting the hash and username to the 'users' dababase
    
        res.status(200).json('Congratulations, you have registerd a username and password!');
    } catch(error) {

        if(e.errno === 19) {
            res.status(400).json('Error message, This username is already been taken!');
        } else {
            res.status(400).json('Something went wrong... Username or password is missing!');
        }
    }
});

app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body; //sending username and Password to endpoint /login

        if (!username || !password) {
            res.status(400).json(`Missing ${!username ? "username" : 'password'}!`)//If the username and/or the password is missing, an error message will appear
        }

        const user = await db('users').first('*').where({username: username}); //From the users table, we want to select the first row where the username equals to the username from the request body.

        if(user) { // Here we check if the user exists in the database and check if the password is correct event though the password is hashed. The compare method helps us here to identify hashed password. We can do this because the input always gives the same output
            const validPass = await bcrypt.compare(password, user.password); 
            if(validPass) {
                res.status(200).json('Valid username and password!');
            } else {
                res.status(400).json('You have entered wrong password!'); //If you have the wrong password
            }
        } else {
            res.status(404).json('User don\t exist!'); //If the user dont exists
        }

    } catch(error) {
        res.status(400).json('Something went wrong... Username or password is not matching!');
    }
});





// Error handling
app.use((err, req, res, next) => {console.error(err.stack);
    res.status(502).send('CLOSE WEBPAGE!');
});

app.listen(PORT, () => console.log(`Have a lovely auction at our website ${PORT}`));