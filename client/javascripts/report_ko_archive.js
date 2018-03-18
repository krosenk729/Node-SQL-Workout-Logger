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
	this.getName = name;
}

Tab.prototype.getDetails = function(){
	const url = this.endpoint;
	const self = this;
	$.ajax({
		type: 'GET',
		url: url,
		success: function(data){
			console.log(data);
			const test = jQuery('<svg>');
			self.details(test);
			console.log(self.getName);
			if(self.getName == 'Lifts'){ monthlyReport(data) }
		}
	});
	// this.details(Math.random());
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

ko.applyBindings(viewModel);

///////////////////////////////////////////////////////////////////

var frag = `<div class="nav nav-pills nav-justified" data-bind="foreach: tabs">
	<a class="nav-item nav-link" href="#" data-bind="text: name, click: $parent.selectedTab, css:{active: $parent.selectedTab() === $data}"></a>
</div>
<div class="card" data-bind="with: selectedTab">
	<div class="card-body">
		<div data-bind="visible: !details.loaded()">Loading...</div>
		<div id="loaded-body" data-bind="text: details">...Loaded
		</div>
		<button data-bind="visible: details.loaded, click: details.refresh" type="button" class="btn btn-secondary">Refresh?</button>
	</div>
</div>`