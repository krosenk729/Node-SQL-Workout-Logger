const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Middleware
// ===========================================================
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static( path.join(__dirname, 'client') ));

// Routes
// ===========================================================
const api = require('./server/routes/api');
app.use('/api', api);

app.get('/', function(req, res) {
  res.sendFile( path.join(__dirname, 'client/views/index.html') );
});

app.get(/^[^(api)]|^[^(images)]|^[^(javascripts)]|^[^(styles)]/i, function(req, res){
  res.redirect('/');
});

// Listener
// ===========================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

