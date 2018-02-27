let WorkoutQueries = function(connection){
	const _mostRecentCardio = `
	SELECT c.cardio_type, w.workout_date, c.duration
	FROM cardio AS c
	LEFT OUTER JOIN workouts AS w
	WHERE c.workout_id = w.workout_id
	ON c.workout_id = w.workout_id
	ORDER BY w.workout_date
	LIMIT 10;
	`;

	const _runsMilesByMonths = `
	SELECT DATE_FORMAT(w.workout_date, '%m') AS month, SUM(c.duration), SUM(c.distance)
	FROM cardio AS c
	LEFT OUTER JOIN workouts AS w
	ON c.workout_id = w.workout_id
	WHERE c.cardio_type = 'run'
	AND w.workout_date >= '2017-01-01'
	GROUP BY month;
	`;

	const _runLastTen = `
	SELECT w.workout_date, c.duration, c.distance, c.duration/c.distance AS pace
	FROM cardio AS c
	LEFT OUTER JOIN workouts AS w
	ON c.workout_id = w.workout_id
	WHERE c.cardio_type = 'run'
	ORDER BY w.workout_date DESC
	LIMIT 10;
	`;

	const _spinsPerformance = `
	SELECT DATE_FORMAT(w.workout_date, '%m') AS month, SUM(c.duration), AVG(c.power), AVG(c.rank), MAX(c.power)
	FROM cardio AS c
	LEFT OUTER JOIN workouts AS w
	ON c.workout_id = w.workout_id
	WHERE c.cardio_type = 'spin'
	AND w.workout_date > '2017-12-01'
	GROUP BY month;
	SELECT AVG(c.power) AS lifetime_avg_power, AVG(c.rank) AS lifetime_avg_rank
	FROM cardio AS c
	WHERE c.cardio_type = 'spin';
	`;

	const _spinsLastTen = `
	SELECT w.workout_date, c.duration, c.power, c.rank
	FROM cardio AS c
	LEFT OUTER JOIN workouts AS w
	ON c.workout_id = w.workout_id
	WHERE c.cardio_type = 'spin'
	ORDER BY w.workout_date DESC
	LIMIT 10;
	`;

	const _mostRecntLifts = `
	SELECT l.lift_type, w.workout_date, w.reps, w.weight
	FROM lift AS l
	LEFT OUTER JOIN workouts AS w
	ON l.workout_id = l.workout_id
	ORDER BY w.workout_date
	LIMIT 20;
	`;
	
	const _liftsLastMonths = `
	SELECT DATE_FORMAT(w.workout_date, '%m') AS month, SUM(l.weight * l.reps) AS all_the_pounds
	FROM lift AS l
	LEFT OUTER JOIN workouts AS w
	ON l.workout_id = w.workout_id
	WHERE w.workout_date > '2017-01-01'
	GROUP BY month;
	`;

	const _liftsPerformance = `
	SELECT MAX(weight) AS max_bench
	FROM lift
	WHERE lift_type = 'bench';
	SELECT MAX(weight) AS max_squat
	FROM lift
	WHERE lift_type = 'squat';
	SELECT MAX(weight) AS max_deadlift
	FROM lift
	WHERE lift_type = 'deadlift';
	`;

	const _cardioInsert = `
	INSERT INTO cardio (cardio_type, duration, distance, power, rank, workout_id)
	VALUES (?, ?, ?, ?, ?, ?)
	`;

	const _liftInsert = `
	INSERT INTO lift (lift_type, reps, weight, workout_id)
	VALUES (?, ?, ?, ?)
	`;

	const _liftInsertByDate = `
	INSERT INTO lift (workout_id, lift_type, reps, weight)
	SELECT workout_id, ?, ?, ?
	FROM workouts
	WHERE workout_type = 'lift'
	AND workout_date = ?
	LIMIT 1
	`;

	// const _updateRecord = `UPDATE ? SET ? WHERE ?`;

	const _insertWrapper = function(workout_date, workout_type){
		let created_on = new Date();
		created_on = created_on.getFullYear() + '-' + (created_on.getMonth() + 1) + '-' + created_on.getDate();
		return `
		INSERT INTO workouts (workout_date, workout_type, created_on)
		VALUES ('${workout_date}', '${workout_type}', '${created_on}')
		`;
	};

	const logOutput = function(err, res){
		// Comment these out to preserve sanity
		if(err){ console.log('EFFOR: \tSomeone call the developer and tell them...\n \n', err) }
		if(res){ console.log('response: ', res) }
	}

	this.insertCardio = function(workout_date, cardio_type, duration, distance, power, rank){
		connection.query(_insertWrapper(workout_date, 'cardio'), (err, res)=>{
			console.log('error: ', err);
			console.log('response: ', res);
			connection.query(
				_cardioInsert,
				[cardio_type, duration, distance, power, rank, res.insertId], 
				logOutput);
		});
	}

	this.insertLift = function(workout_date, lift_type, reps, weight){
		connection.query(
			_liftInsertByDate,
			[lift_type, reps, weight, workout_date], 
			logOutput);
	}
	
	this.insertSingleLift = function(workout_date, lift_type, reps, weight){
		connection.query(_insertWrapper(workout_date, 'lift'), (err, res)=>{
			console.log('error: ', err);
			console.log('response: ', res);
			connection.query(
				_liftInsert,
				[lift_type, reps, weight, res.insertId], 
				logOutput);
		});
	}

	this.insertSingleWorkout = function(workout_date, workout_type){
		connection.query(_insertWrapper(workout_date, workout_type), logOutput);
	}

	this.updateRecord = function(table, record_id, col, val){
		let id_name = table === 'workouts' ? 'workout_id' : 'id';
		connection.query(
			`UPDATE ${table} SET ? WHERE ?`,
			[{[col]: val}, {[id_name]: record_id}],
			logOutput);
	}
	
	this.report = function(type){
		switch(type){
			case 'runmilesbymonth':
			connection.query(_runsMilesByMonths, logOutput);
			break;
			case 'runlast10':
			connection.query(_runLastTen, logOutput);
			break;
			case 'spinperformance':
			connection.query(_spinsPerformance, logOutput);
			break;
			case 'spinlast10':
			connection.query(_spinsLastTen, logOutput);
			break;
			case 'lifttotalsummary':
			connection.query(_liftsPerformance, logOutput);
			break;
		}
	}
}

module.exports = WorkoutQueries ;