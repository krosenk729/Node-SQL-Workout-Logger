const express = require('express');
const router = express.Router();

// Express Middleware (Body Parse, Static Files, View Engines)
// ===========================================================
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');


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
    title: 'Express'
  });
});

/*router.get(/^[^(api)]|^[^(images)]|^[^(javascripts)]|^[^(styles)]/i, function(req, res){
  res.redirect('/log');
});*/


// Export
// ===========================================================
module.exports = router;