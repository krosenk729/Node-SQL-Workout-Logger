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
require('dotenv').config();
const connection = sql.createConnection({
  ... process.env.JAWS_CONFIG,
  multipleStatements: true
});
const WorkoutQueries = require('../modules/queries');
const queries = new WorkoutQueries(connection);

// Request Resonses | /API Mount
// ===========================================================

router.route('/cardio')
.get(function(req, res){
  queries.report('allcardio', (err, data)=>{
    if(err){ return res.send(err); }
    res.json( data );
  });
});

router.route('/lift')
.get(function(req, res){
  queries.report('alllift', (err, data)=>{
    if(err){ return res.send(err); }
    res.json( data );
  });
});

// Export
// ===========================================================
module.exports = router;