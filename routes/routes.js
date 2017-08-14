const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');

const snippet = require('../model/snippet');

routes.use((req, res, next) => {
  if (!req.session.user){
    res.render('login')
  } else {
    res.render('main')
  }
})

routes.get('/', (req, res) => {
  snippet.find()
    // then show my snippets
    .then(snippets => res.render('snippetList', { snippets: snippets }))
    // handle errors
    .catch(err => res.send('there was an error :('));
});

routes.get('/addsnippet', (req, res) => {
  if (req.query.id) {
    snippet.findById(req.query.id)
      // render form with this club
      .then(snippet => res.render('addsnippet', { snippet: snippet }));
  } else {
    res.render('addsnippet');
  }
});

routes.post('/savesnippet', (req, res) => {
  //set a random number as the ID
  if (!req.body.id){
    req.body.id = new mongoose.mongo.ObjectID();
  }
  snippet.findByIdAndUpdate(req.body.id, req.body, { upsert: true })
    .then(() => res.redirect('/'))
    // catch validation errors
    .catch(err => {
      console.log(err);
      res.render('addsnippet', {
        errors: err.errors,
        snippet: req.body
      });
    });
});

routes.get('/deletesnippet', (req, res) => {
  snippet.findById(req.query.id)
    .remove()
    // then redirect to the homepage
    .then(() => res.redirect('/'));
});

module.exports = routes;
