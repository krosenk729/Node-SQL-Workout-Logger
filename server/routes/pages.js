const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');

// Express Middleware (Body Parse, Static Files, View Engines)
// ===========================================================
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Request Resonses
// ===========================================================

router.get('/log', function(req, res){
    res.render('log', { 
    title: 'Log a Workout'
  });
  // res.sendFile( path.join(__dirname, 'client/views/index.html') );
});

router.get('/report', function(req, res){
    res.render('report', { 
    title: 'Report on Those Logs'
  });
});

router.get(/^[^(api)]|^[^(images)]|^[^(javascripts)]|^[^(styles)]/i, function(req, res){
  res.redirect('/log');
});


// Export
// ===========================================================
module.exports = router;