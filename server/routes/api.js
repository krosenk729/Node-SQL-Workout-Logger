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
console.log('jaws config', process.env.JAWS_CONFIG_host);

const connection = sql.createConnection({
  host: process.env.JAWS_CONFIG_host,
  port: process.env.JAWS_CONFIG_port,
  user: process.env.JAWS_CONFIG_user,
  password: process.env.JAWS_CONFIG_password,
  database: process.env.JAWS_CONFIG_database,
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

router.route('/lift/recent')
.get(function(req, res){
  queries.report('alllift', (err, data)=>{
    if(err){ return res.send(err); }
    res.json( data );
  });
});

router.route('/lift/lastMonths')
.get(function(req, res){
  queries.report('liftslastmonths', (err, data)=>{
    if(err){ return res.send(err); }
    res.json( data );
  });
});

router.route('/lift/recent')
.get(function(req, res){
  queries.report('liftsrecent', (err, data)=>{
    if(err){ return res.send(err); }
    res.json( data );
  });
});

// Export
// ===========================================================
module.exports = router;