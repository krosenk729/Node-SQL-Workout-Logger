const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

// Middleware
// ===========================================================
app.use(bodyParser.json());
const parseUrlencoded = bodyParser.urlencoded({extended: false});

// Database
// ===========================================================
const sql = require('mysql');
const connection = sql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password1',
  database: 'db_runsql',
  multipleStatements: true
});
const WorkoutQueries = require('./modules/queries');
const queries = new WorkoutQueries(connection);

// Request Resonses | /API Mount
// ===========================================================

router.route('/cardio')
.get(function(req, res){
  queries.report('allcardio', (err, data){
    if(err){ res.send('Nope'); }
    res.json( data );
  });
});

router.route('/lift')
.get(function(req, res){
  queries.report('alllifts', (err, data){
    if(err){ res.send('Nope'); }
    res.json( data );
  });
});

// Export
// ===========================================================
module.exports = router;