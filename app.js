const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


// Express Middleware (Body Parse, Static Files, View Engines)
// ===========================================================
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static( path.join(__dirname, 'client') ));

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');

// Routes
// ===========================================================
const api = require('./server/routes/api');
const pages = require('./server/routes/pages');
app.use('/api', api);
app.use('/', pages);

// Listener
// ===========================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

