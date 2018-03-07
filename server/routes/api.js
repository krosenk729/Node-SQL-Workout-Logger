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
  host: 's54ham9zz83czkff.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'jwzg9jfk04w2zvow',
  password: 'opn8cxmjvl81f5l7',
  database: 'p9txh84qovd6qqd2',
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