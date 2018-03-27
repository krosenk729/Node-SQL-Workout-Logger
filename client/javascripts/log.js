
// Utility Function: formatted date 
// ===========================================================

const todayDate = function(){
  const td = new Date(),
    myyear = td.getFullYear(),
    mymonth = Number(td.getMonth()) + 1,
    myday = td.getDate();

  const padNumber = function(n){
    return n < 10 ? '0' + n : n;
  }

    return myyear +'-'+ padNumber(mymonth) +'-'+ padNumber(myday);
}


// Class Functions: lift and workout
// ===========================================================

const Lift = function(){
  this.lift_type = ko.observable('bench');
  this.reps = ko.observable( 10 );
  this.weight = ko.observable( 45 );
}

const Workout = function(){
  this.type = ko.observable('spin');
  this.workout_date = ko.observable(todayDate());
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
}


// Knockout Class Bindings 
// ===========================================================

let myko = new Workout();
ko.applyBindings(myko);


// Form Event
// ===========================================================

$('form').on('submit', function(event){
  event.preventDefault();
  let endpoint, attrs = {workout_date: myko.workout_date()};
  switch(myko.type()){
    case 'lift':
      attrs.lifts = [];
      myko.lifts().forEach( l => {
        attrs.lifts.push({ 
          lift_type: l.lift_type(), 
          reps: l.reps(), 
          weight: l.weight() 
        });
      });
      attrs.lifts = JSON.stringify(attrs.lifts);
      endpoint = '/api/lift';
      break;
    default:
      endpoint = '/api/cardio';
        attrs.cardio_type = myko.type();
        attrs.duration = myko.duration();
        attrs.distance = myko.distance() || 0;
        attrs.power = myko.power() || 0;
        attrs.rank = myko.rank() || 0;
      break;
  }
  $.ajax({
    url: endpoint,
    type: 'POST',
    data: attrs,
    success: function(data){
      console.log(data);
    }
  });
});