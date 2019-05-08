const express = require("express"),
		  bodyParser = require("body-parser"),
		  bcrypt = require("bcrypt-nodejs"),
		  cors = require("cors"),
		  knex = require("knex"),
		  // Controllers
		  register = require("./controllers/register"),
		  signin = require("./controllers/signin"),
		  profile = require("./controllers/profile"),
		  image = require("./controllers/image");

const {myPassword} = require('./config.js');		  
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : myPassword,
    database : 'photogenic'
  }
});

const app = express();

app.use(bodyParser.json());
// Connecting to front end, and using cors to bypass google's security block, by letting it know this back end is safe.
app.use(cors(3000));

// "/", res = this is working
app.get("/", (req, res) => {
	res.send(database.users);
});

// "/signin", POST = success/fail on signin
app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
// "/register", POST = user info creation
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });
// "/profile/:userId", GET = read user info
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) });
// "/image", PUT = update user's number of images
app.put("/image", (req, res) => { image.handleImage(req, res, db) })
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) })

app.listen(3001, () => {
	console.log("Listening on port 3001");
});