let u = {
	workout_type: 'cardio | spin | lift',
	workout_date: '2018-01-01',
	duration: '',
	distance: '',
	rank: '',
	power: '',
	lifts: [{weight:'Bench', reps:'', lift_type: ''}]
}

let WorkoutModel = function(u) {
	this.workout_type = u.user_workout_type === 'lift' ? 'lift' : 'cardio';
	this.workout_date = u.workout_date;
	this.cardio_type = u.user_workout_type !== 'lift' ? u.user_workout_type : '';
	this.lifts = ko.observableArray(u.lifts);

	this.addLift = function(){
		this.lifts.push({
			lift_type: '',
			sets: '',
			reps: ''
		});
	};

	this.removeLift = function(lift){
		//
	};

	this.save = function(){
		//http://knockoutjs.com/examples/contactsEditor.html
	};
}

ko.applyBindings(new WorkoutModel(u));