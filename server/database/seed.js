const sql = require('mysql');
const fs = require('fs');
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

fs.readFile('./seed_workouts.csv', 'utf8', function(err,res){
	console.log('error', err);
	let k = (res).replace(/\r\n/gmi, '|').split('|').map( i => i.split(','));
	k.forEach(i =>{
		if(i[0]){
			queries.insertSingleWorkout(i[0], i[1]);
		}
	});
	fs.readFile('./seed_lifts.csv', 'utf8', function(err, res) {
		console.log('error', err);
		let k = (res).replace(/\r\n/gmi, '|').split('|').map( i => i.split(','));
		k.forEach( i =>{
			if(i[0]){
				queries.insertLift(i[0].trim(), i[1], i[2], i[3]);
			}		
		});
		queries.insertLift(k[2][0], k[2][1], k[2][2], k[2][3] );
	});
});

fs.readFile('./seed_cardio.csv', 'utf8', function(err, res) {
	let k = (res).replace(/\r\n/gmi, '|').split('|').map( i => i.split(','));
	console.log(k[0]);
	k.forEach( i =>{
		if(i[0]){
			queries.insertCardio(i[0].trim(), i[1], i[2], i[3], i[4], i[5]);
		}		
	});
});

/*
press ctrl+c after readFiles have completed
no connection.end within this app
*/