const sql = require('mysql');
const fs = require('fs');
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


// Cardio
// ===========================================================

fs.readFile('./seed_cardio.csv', 'utf8', function(err, res) {
	// parse each row into array 
	let k = (res).replace(/\r\n/gmi, '|').split('|').map( i => i.split(','));
	console.log(k[0]);

	// insert each row into db 
	k.forEach( i =>{
		if(i[0]){
			queries.insertCardio(i[0].trim(), i[1], i[2], i[3], i[4], i[5]);
		}		
	});

});


// Lifts
// ===========================================================

fs.readFile('./seed_workouts.csv', 'utf8', function(err,res){
	console.log('error', err);
	// parse each row into array 
	let k = (res).replace(/\r\n/gmi, '|').split('|').map( i => i.split(','));

	// insert each workout into db 
	k.forEach(i =>{
		if(i[0]){
			queries.insertSingleWorkout(i[0], i[1]);
		}
	});

	fs.readFile('./seed_lifts.csv', 'utf8', function(err, res) {
		console.log('error', err);
		// parse each row into array 
		let k = (res).replace(/\r\n/gmi, '|').split('|').map( i => i.split(','));

		// insert each lift into db
		k.forEach( i =>{
			if(i[0]){
				queries.insertLift(i[0].trim(), i[1], i[2], i[3]);
			}		
		});
		// queries.insertLift(k[2][0], k[2][1], k[2][2], k[2][3] );
	});
});

/*
press ctrl+c after readFiles have completed
no connection.end within this app
*/