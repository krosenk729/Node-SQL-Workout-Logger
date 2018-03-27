const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
// ===========================================================
app.use(bodyParser.json());
const parseUrlencoded = bodyParser.urlencoded({extended: true});

app.use(cors());

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

// Cardio View, Insert
// ===========================================================

router.route('/cardio')
.get(function(req, res){
  queries.report('allcardio', (err, data)=>{
    if(err){ return res.send(err); }
    res.json( data );
  });
})
.post(function(req, res){
  if(!req.body.workout_date || !req.body.cardio_type || !req.body.duration){
    res.send('Bad Request');
    return ;
  }
  console.log(req.body);
  queries.insertCardio(
    req.body.workout_date, 
    req.body.cardio_type, 
    req.body.duration, 
    req.body.distance || 0, 
    req.body.power || 0,
    req.body.rank || 0,
    (err, data) =>{ 
      res.send(data);
    }
  );
});

// Cardio Report
// ===========================================================

router.route('/spin')
.get(function(req, res){
  queries.report('spinlast10', (err, data)=>{
    if(err){ return res.send(err); }
    res.json( data );
  });
});

router.route('/spin/perf')
.get(function(req, res){
  queries.report('spinperformance', (err, data)=>{
    if(err){ return res.send(err); }
    res.json( data );
  });
});

router.route('/run')
.get(function(req, res){
  queries.report('runlast10', (err, data)=>{
    if(err){ return res.send(err); }
    res.json( data );
  });
});


// Lift View, Insert
// ===========================================================

router.route('/lift')
.get(function(req, res){
  queries.report('alllift', (err, data)=>{
    if(err){ return res.send(err); }
    res.json( data );
  });
})
.post(function(req, res){
  console.log(JSON.parse(req.body.lifts)[0]);
  // console.log( JSON.parse( req.body['lifts[]'][0] ));
  // return res.json(req.body);
  if(!req.body.workout_date || !req.body.lifts){
    res.send('Bad Request');
    return ;
  }
  let lifts = JSON.parse(req.body.lifts);
  for(let l of lifts){
    queries.insertSingleLift(
      req.body.workout_date,
      l.lift_type,
      l.reps,
      l.weight
      );
  }
  res.send( 'success' );
});


// Lift Report
// ===========================================================

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