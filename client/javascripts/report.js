// http://jsfiddle.net/qq5zqLcs/

ko.onDemandObservable = function(callback, target){
	var _value = ko.observable();
	var result = ko.computed({
		read: function(){
			if(!result.loaded()){
				callback.call(target);
			}
			return _value();
		},
		write: function(newValue){
			result.loaded(true);
			_value(newValue);
		},
		deferEvaluation: true
	});

	result.loaded = ko.observable();
	result.refresh = function(){
		result.loaded(false);
	}
	return result;
};

function Tab(id, name, endpoint) {
	this.id = id;
	this.name = ko.observable(name);
	this.endpoint = endpoint;
	this.details = ko.onDemandObservable(this.getDetails, this);
}

Tab.prototype.getDetails = function(){
	const url = this.endpoint;
	$.ajax({
		type: 'GET',
		url: url,
		success: function(data){
			console.log(data);
			// this.details(data);
		}
	});
	return 'Hello';
}

var viewModel = {
	tabs: ko.observableArray([
		new Tab(1, "Spin", "https://workoutsql.herokuapp.com/api/spin"),
		new Tab(2, "Spin Performance", "https://workoutsql.herokuapp.com/api/spin/perf"),
		new Tab(3, "Run", "https://workoutsql.herokuapp.com/api/run"),
		new Tab(4, "Lifts", "https://workoutsql.herokuapp.com/api/lift/recent"),
		new Tab(5, "Lifts Monthly", "https://workoutsql.herokuapp.com/api/lift/lastMonths")
	]),
	// showDetails: function(tab){
	// 	this.selectedTab(tab);
	// },

	selectedTab: ko.observable()
};

viewModel.selectedTab(viewModel.tabs()[0]);

viewModel.tabs()[0].details('helllllooooo world');

ko.applyBindings(viewModel);