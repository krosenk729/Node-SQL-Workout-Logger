const inquirer = require('inquirer');
const CLIQuestions = require('./modules/questions');
const questions = new CLIQuestions();

/* Database Config */
const sql = require('mysql');
require('dotenv').config();
const connection = sql.createConnection({
	...process.env.JAWS_CONFIG,
	multipleStatements: true
});
const WorkoutQueries = require('./modules/queries');
const queries = new WorkoutQueries(connection);

/* Inquirer Prompts */
console.log('Let\'s Log a Workout and Run Some SQL');
console.log('*************************************');

inquirer.prompt(questions.gateQuestion())
.then(answer =>{
	if(answer.why === 'Log'){
		promptForWorkout();
	} else if (answer.why === 'Update'){
		promptForUpdate();
	} else {
		promptForReport();
	}
});

const promptForWorkout = function(){
	inquirer.prompt(questions.workoutQuestions())
	.then((workout)=>{
		if(workout.workout_type === 'lift'){
			promptForLift(workout);
		} else {
			promptForCardio(workout);
		}
	});

};

/* Get Cardio Workout */
const promptForCardio = function(workout){
	inquirer.prompt(questions.cardioQuestions())
	.then(cardio => queries.insertCardio(workout.workout_date, cardio.cardio_type, cardio.duration, cardio.distance || 0, cardio.power || 0, cardio.rank || 0));
}

/* Recursively Get Lift Sets */
const promptForLift = function(workout){
	let lifts = [];

	function getLifts(){
		inquirer.prompt(questions.liftQuestions())
		.then(lift =>{
			lifts.push({
				lift_type: lift.lift_type,
				reps: lift.reps,
				weight: lift.weight,
				workout_date: workout.workout_date
			});

			if(lift.still_lifting === 'yes'){ 
				getLifts(); 
			}else{
				// Stop recursion and insert array into db
				lifts.forEach( l => queries.insertLift(l.workout_date, l.lift_type, l.reps, l.weight));
			}
		});
	}
	getLifts();
}

/* Get Specific Update from User & Send to DB */
const promptForUpdate = function(){
	inquirer.prompt(questions.updateQuestions())
	.then( update => {
		queries.updateRecord(update.table, update.id, update.col || 'workout_date', update.val)
	});
};

/* Get Report Type from User & Display */
const promptForReport = function(){
	inquirer.prompt(questions.reportQuestions())
	.then( report => {
		console.log(report.type);
		queries.report(report.type);
	});
}
