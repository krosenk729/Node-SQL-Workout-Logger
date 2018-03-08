let Lift = function(){
  this.lift_type = ko.observable('bench');
  this.reps = ko.observable( 10 );
  this.weight = ko.observable( 45 );
}

let Workout = function(){
  this.type = ko.observable('run');
  this.workout_date = ko.observable( new Date() );
  this.duration = ko.observable( 45 );
  this.distance = ko.observable( '' );
  this.power = ko.observable( 300 );
  this.rank = ko.observable( '' );
  this.lifts = ko.observableArray([new Lift()]);

  this.addlift = function(){
    this.lifts.push(new Lift());
  };

  this.removelift = function(lift){
    this.lifts.remove(lift);
  };

  this.saveworkout = function(){

  };
}

ko.applyBindings(new Workout());

$('form').on('submit', function(event){
  event.preventDefault();
  console.log('EVENT ', event);
});