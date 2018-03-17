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

monthlyReport = function(data){
	let svg =  d3.select('#loaded-body').append('svg'),
		margin = {
			top: 20, 
			right: 20, 
			bottom: 30, 
			left: 40
		},
    	width = +svg.attr('width') - margin.left - margin.right,
    	height = +svg.attr('height') - margin.top - margin.bottom;
    
    // X & Y Scales
    let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    	y = d3.scaleLinear().rangeRound([height, 0]);
	
	let g = svg.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')' );

	
	x.domain(...data.map(i => i.month));
	y.domain([0, Math.max(...data.map(i => i.all_the_pounds))]);

	g.append('g')
		.attr('class', 'axis axis--x')
		.attr('transform', 'translate(0,' + height + ')')
		.call(d3.axisBottom(x));

	g.append('g')
		.attr('class', 'axis axis--y')
		.call(d3.axisLeft(y).ticks(10, '%'))
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '0.71em')
		.attr('text-anchor', 'end')
		.text('Total Lbs');

	g.selectAll('.bar')
		.data()
		.attr('class', 'axis axis--y')
		.call(d3.axisLeft(y).ticks(10, '%'))

	g.selectAll(".bar")
		.data(data)
		.enter().append('rect')
		.attr('class', 'bar')
		.attr('x', d => d.month)
		.attr('y', d => d.all_the_pounds)
		.attr('width', x.bandwidth())
		.attr('height', d => height - y(d.all_the_pounds));

}