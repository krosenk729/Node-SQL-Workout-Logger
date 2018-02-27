let CLIQuestions = function(){
	const _gateQuestion = [
	{
		type: 'list',
		name: 'why',
		message: 'Are you here to log or report?\n',
		choices: ['Log', 'Report', 'Update']
	}
	];

	const _workoutQuestions = [
	{
		type: 'list',
		name: 'workout_type',
		message: 'What Workout Did You Do? \n ',
		choices: [
		{
			name: 'Cardio',
			value: 'spin'
		},
		{
			name: 'Weight Lifting',
			value: 'lift'
		}
		]
	},
	{
		type: 'input',
		name: 'workout_date',
		message: 'Date (YYYY-MM-DD): ',
		validate: function(value) {
			const regex = new RegExp(/^(\d{4})[-.\s]?(\d{2})[-.\s]?(\d{2})\s?$/);
			return value.match(regex) ? true : '\n Check that date formatting please ';
		}
	}
	];

	const _cardioQuestions = [
	{
		type: 'list',
		name: 'cardio_type',
		message: 'Cardio Type: \n',
		choices: [
		{
			name: 'Spin',
			value: 'spin'
		},
		{
			name: 'Run',
			value: 'run'
		}
		]
	},
	{
		type: 'input',
		name: 'duration',
		message: 'Time: ',
		validate: function(value){
			const regex = new RegExp(/^(\d{0,3})[.:]?(\d{1,2})?$/);
			return value.match(regex) ? true : '\n Please enter a valid time ';
		}
	},
	{
		type: 'input',
		name: 'distance',
		message: 'Distance: ',
		when: function(answers) {
			return answers.cardio_type === 'run';
		}, 
		validate: function(value){
			return (value > 0) ? true : '\n Please enter a valid distance ';
		}
	}, 
	{
		type: 'input',
		name: 'power',
		message: 'Power: ',
		when: function(answers) {
			return answers.cardio_type === 'spin';
		}, 
		validate: function(value){
			const regex = new RegExp(/^(\d{0,3})$/);
			return value.match(regex) ? true : '\n Please enter a valid power score ';
		}
	}, 
	{
		type: 'input',
		name: 'rank',
		message: 'Rank: ',
		when: function(answers) {
			return answers.cardio_type === 'spin';
		}, 
		validate: function(value){
			return (value > 0) ? true : '\n Please enter a valid class rank ';
		}
	}
	];

	const _liftQuestions = [
	{
		type: 'expand',
		name: 'lift_type',
		message: 'What Was The Lift? \nB = Bench, S = Squat, D = Deadlift \nHit + Enter \n',
		choices: [
		{
			key: 'b',
			name: 'Bench',
			value: 'bench'
		},
		{
			key: 's',
			name: 'Squat',
			value: 'squat'
		},
		{
			key: 'd',
			name: 'Deadlift',
			value: 'deadlift'
		}
		]
	}, 
	{
		type: 'input',
		name: 'reps',
		message: 'Reps: ',
		validate: function(value){
			return (value > 0) ? true : '\n Please enter a valid rep count';
		}
	},  
	{
		type: 'input',
		name: 'weight',
		message: 'Weight: ',
		validate: function(value){
			return (value > 0) ? true : '\n Please enter a valid weight';
		}
	},
	{
		type: 'expand',
		name: 'still_lifting',
		message: '\nDo you need to log another lift?\nHit + Enter \n',
		choices: [
		{
			key: 'y',
			name: 'Yes',
			value: 'yes'
		},
		{
			key: 'n',
			name: 'No',
			value: 'no'
		}
		]
	}
	];

	const _reportQuestions = [
	{
		type: 'list',
		name: 'type',
		message: 'What report do you want to see?',
		choices: [
			'Run: miles by month',
			'Run: last 10',
			'Spin: performance',
			'Spin: last 10',
			'Lift: total summary'
		],
		filter: function(value){
			return value.toLowerCase().replace(/\W/gi,'');
		}
	}
	];

	const _updateQuestions = [
	{
		type: 'expand',
		name: 'table',
		message: '***USE WITH CARE*** \nYou will be updating the DB directly \n \nWhat update are you updating? \n d = Date c = Cardio l = Lift \nHit + Enter \n',
		choices: [
		{
			key: 'd',
			name: 'Workout date update',
			value: 'workouts'
		},
		{
			key: 'c',
			name: 'Cardio workout update',
			value: 'cardio'
		},
		{
			key: 'l',
			name: 'Lift workout update',
			value: 'lift'
		}
		]
	},
	{
		type: 'input',
		name: 'id',
		message: `What is the record id?`,
		validate: function(value){
			return (value > 0) ? true : '\nEnter a valid id please';
		}
	},
	{
		type: 'expand',
		name: 'col',
		message: 'What update are you updating? \n t = Time (duration) d = Distance p = Power r = Rank \nHit + Enter \n',
		choices: [
		{
			key: 't',
			name: 'Time (duration)',
			value: 'duration'
		},
		{
			key: 'd',
			name: 'Distance',
			value: 'distance'
		},
		{
			key: 'p',
			name: 'Power',
			value: 'power'
		},
		{
			key: 'r',
			name: 'Rank',
			value: 'rank'
		}
		],
		when: function(answers) {
			return answers.table === 'cardio';
		}
	},
	{
		type: 'expand',
		name: 'column',
		message: 'What update are you updating? \n r = Reps w = Weight \nHit + Enter \n',
		choices: [
		{
			key: 'r',
			name: 'Reps',
			value: 'reps'
		},
		{
			key: 'w',
			name: 'Weight',
			value: 'weight'
		}
		],
		when: function(answers) {
			return answers.table === 'lift';
		}
	},
	{
		type: 'input',
		name: 'val',
		message: 'What is the new value?',
		validate: function(value){
			return value ? true : '\nNew value is required';
		}
	}
	];

	this.gateQuestion = function(){
		return _gateQuestion;
	}

	this.workoutQuestions = function(){
		return _workoutQuestions;
	}

	this.cardioQuestions = function(){
		return _cardioQuestions;
	}

	this.liftQuestions = function(){
		return _liftQuestions;
	}

	this.reportQuestions = function(){
		return _reportQuestions;
	}

	this.updateQuestions = function(){
		return _updateQuestions;
	}
}

module.exports = CLIQuestions ;
