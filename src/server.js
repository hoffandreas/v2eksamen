const express = require('express');
const session = require("express-session");
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs'); //bcrypt hash is an async function, very slow alorithm

// Database Connection
const db = require('knex')({ //Knex is used to interact with the database
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, './db.sqlite3'),
    },
    useNullAsDefault: true,
});

//middelware searching for every consecutive request

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '../public'))
app.use(session({ //This session receives objects, with the options; secret, resave, saveUninitialized
        secret: "Keep it secret, key that will sign cookie", // A key that will take in some string
        resave: false, // For every request to the server we want to create a new session
        saveUninitialized: false , // If we have not modified the session, we dont want it to save
    })
);

const isAuth = (req, res, next) => { //creating an authentication where you must have a user to access the dashboard
    if(req.session.isAuth){
        next()
    } else {
        res.redirect("../login.html")
    }
}

app.get("/", (req, res ) => {
    return res.sendFile("/signup.html", { root: path.join(__dirname, "../public") });
})

app.get("/signup.html", (req, res ) => {
    return res.sendFile("/signup.html", { root: path.join(__dirname, "../public") });
})

app.get("/login.html", (req, res ) => {
    return res.sendFile("/login.html", { root: path.join(__dirname, "../public") });
})

app.get("/dashboard.html", isAuth, (req, res ) => {
    
    return res.sendFile("/dashboard.html", { root: path.join(__dirname, "../public") });
})


app.post('/signup', async (req, res) => {
    try {
        const {username, password} = req.body; //sending username and Password to endpoint /signup

        const hash = await bcrypt.hash(password, 13); /*This is how you can combine hash and salt function together. Nr 13 is a salt generator. 
        The higher the generator number is the more times the password gets randomized so it becomes safer.The higher the number,the slower the funciton becomes*/
        await db('users').insert({username: username, password: hash}); //Inserting the hash and username to the 'users' dababase
    
        return res.redirect('../login.html')

    } catch(error) {
        const name = await req.body.username
        if(name.length > 0) {
            res.status(400).json('Error message, This username is already been taken!')
        } else {
            res.status(400).json('Something went wrong... Username or password is missing!');
        }
    }
});

app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body; //sending username and Password to endpoint /login

        const user = await db('users').first('*').where({username: username}); //From the users table, we want to select the first row where the username equals to the username from the request body.

        if(user) { // Here we check if the user exists in the database and check if the password is correct event though the password is hashed. The compare method helps us here to identify hashed password. We can do this because the input always gives the same output
            const auothenticate = await bcrypt.compare(password, user.password); 
            if(auothenticate) {
                req.session.isAuth = true; //If you are logged in, then you can access the dashboard.
                res.redirect("../dashboard.html")
            } else {
                res.redirect("../login.html") //If you have the wrong password
            }
        } else {
            res.status(404).redirect("../login.html"); //If the user dont exists
        }

    } catch(error) {
        res.status(400).json('Something went wrong... Username or password is not matching!');
    }
});


app.post("/logout",(req, res) => {
    req.session.destroy((error) =>{
        if(error) throw error;
        res.redirect("/")
    })
})


app.use((error, req, res, next) => {console.error(error.stack); // Basic error handling
    res.status(500).send('!ERROR! CLOSE WEBPAGE!');
});

app.listen(3000, () => {
    console.log("listening on *:3000");
});
