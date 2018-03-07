const sql = require('mysql');
const connection = sql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'root',
	multipleStatements: true
});

// implicit connection status with query
// if troubleshooting , uncomment this block
/*
connection.createConnection((err)=>{
	if(err){
		console.log('Error on connection', err.stack);
		return ;
	}
	console.log('Connecetd as '+ connection.threadID);
});
*/

let query = `
CREATE DATABASE IF NOT EXISTS db_runsql;
USE db_runsql;

CREATE TABLE workouts (
	workout_id INT NOT NULL AUTO_INCREMENT,
	workout_type ENUM('cardio', 'lift') NOT NULL,
	workout_date DATE NOT NULL,
	created_on DATE NOT NULL,
	PRIMARY KEY (workout_id)
);

CREATE TABLE cardio (
	id INT NOT NULL AUTO_INCREMENT,
	cardio_type ENUM('run', 'spin') NOT NULL,
	duration DECIMAL(5, 2),
	distance DECIMAL(5, 2) DEFAULT 0,
	power INT DEFAULT 0,
	rank INT DEFAULT 0,
	workout_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (workout_id) REFERENCES workouts(workout_id)
);

CREATE TABLE lift (
	id INT NOT NULL AUTO_INCREMENT,
	lift_type ENUM('bench', 'deadlift', 'squat') NOT NULL,
	reps INT,
	weight INT,
	workout_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (workout_id) REFERENCES workouts(workout_id)
);
`;
connection.query(query, (err, res)=>{
	console.log(res);
	connection.end();
});
