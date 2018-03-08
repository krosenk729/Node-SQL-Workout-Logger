const express = require('express');
const router = express.Router();

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