
//require packages
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport-local');
const session = require('express-session');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const exphbrs = require('express-handlebars');
const bcrypt = require('bcryptjs');
const bluebird = require('bluebird');
const fs = require('fs');
mongoose.Promise = bluebird;
const routes = require('./routes/routes')
const app = express();

//render templates
app.engine('handlebars', exphbrs());
app.set('views', './views');
app.set('view engine', 'handlebars');

//tell app where to look for static content
app.use(express.static('public'));

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//validator middleware
app.use(validator());

//default session
app.use(
  session({
    secret: "blargh",
    resave: false,
    saveUninitialized: true,
  })
)

//tell app how to use routes
app.use('/', routes);

//connect app to mongoDB
mongoose.connect('mongodb://localhost:27017/snippets', { useMongoClient: true })
.then(() => app.listen(3000, () => console.log('LETS GO!!!')));
