function Report(name, selector, endpoint, chartFunction) {
	this.name = name;
	this.selector = selector;
	this.endpoint = endpoint;
	this.chartFunction = chartFunction;
}

Report.prototype.getDetails = function(){
	const url = this.endpoint;
	const self = this;
	$.ajax({
		type: 'GET',
		url: url,
		success: function(data){
			let canvas = $(`#${self.selector}`).children()[0];
			self.chartFunction(canvas, data);
		}
	});
}


let spinChart = function(canvas, data){
	let ctx = canvas.getContext('2d');
	let group1 = data.map( i => i.power),
		group2 = data.map( i => i.rank),
		axis = data.map( i => i.workout_date.slice(0, 10));
	let spinBarChart = new Chart(ctx, {
		type: 'bar',
		data: {
			datasets: [{
				label: 'Power',
				data: group1,
				yAxisID: 'y-axis-1',
				backgroundColor: 'rgba(72, 205, 210, .5)'
			},{
				label: 'Rank',
				data: group2,
				type: 'line',
				fill: false,
				yAxisID: 'y-axis-2',
				borderColor: 'rgba(0, 232, 158, .5)'
			}],
			labels: axis
		},
		options: {
			responsive: true,
			legend: {position: top},
			scales: {
				yAxes: [{
					type: 'linear',
					display: true,
					position: 'left',
					id: 'y-axis-1'
				}, {
					type: 'linear',
					display: true,
					position: 'right',
					id: 'y-axis-2'
				}]
			}
		}
	});
};

let runChart = function(canvas, data){
	let ctx = canvas.getContext('2d');
	let group1 = data.map( i => i.distance),
		group2 = data.map( i => i.pace),
		axis = data.map( i => i.workout_date.slice(0, 10));
	let runChart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				label: 'Distance',
				data: group1,
				pointRadius: 5,
				pointHoverRadius: 15,
				pointStyle: 'triangle',
				yAxisID: 'y-axis-1',
				backgroundColor: 'rgba(128, 126, 251, .5)'
			},{
				label: 'Pace',
				data: group2,
				pointRadius: 5,
				pointHoverRadius: 15,
				pointStyle: 'rect',
				yAxisID: 'y-axis-2',
				backgroundColor: 'rgba(117, 226, 228, .5)'
			}],
			labels: axis
		},
		options: {
			responsive: true,
			legend: {position: top},
			scales: {
				yAxes: [{
					type: 'linear',
					display: true,
					position: 'left',
					id: 'y-axis-1',
					bottom: 0,
					ticks: {min: 0}
				}, {
					type: 'linear',
					display: true,
					position: 'right',
					id: 'y-axis-2'
				}]
			}
		}
	});
}

let liftChart = function(canvas, data){
	let ctx = canvas.getContext('2d');
	let group1 = data.filter( i => i.lift_type === 'deadlift').map( i => i.weight),
		group1_color = data.filter( i => i.lift_type === 'deadlift').map( i => 'rgba(0, 232, 158, .5)'),
		group1_labels = data.filter( i => i.lift_type === 'deadlift').map( i => i.workout_date.slice(0, 10)),
		group2 = data.filter( i => i.lift_type === 'bench').map( i => i.weight),
		group2_color = data.filter( i => i.lift_type === 'bench').map( i => 'rgba(72, 205, 210, .5)'),
		group2_labels = data.filter( i => i.lift_type === 'bench').map( i => i.workout_date.slice(0, 10)),
		group3 = data.filter( i => i.lift_type === 'squat').map( i => i.weight),
		group3_color = data.filter( i => i.lift_type === 'squat').map( i => 'rgba(61, 128, 232, .5)'),
		group3_labels = data.filter( i => i.lift_type === 'squat').map( i => i.workout_date.slice(0, 10));
	let liftChart = new Chart(ctx, {
		type: 'bar',
		data: {
			datasets: [{
				data: [...group1, ...group2, ...group3],
				backgroundColor: [...group1_color, ...group2_color, ...group3_color]
			}],
			labels: [...group1_labels, ...group2_labels, ...group3_labels]
		},
		options: {
			responsive: true,
			legend: {position: top}
		}
	});
};

let liftMonthChart = function(canvas, data){
	let ctx = canvas.getContext('2d');
	let group1 = data.map( i => i.all_the_pounds),
		axis = data.map( i => i.month );
	let spinBarChart = new Chart(ctx, {
		type: 'bar',
		data: {
			datasets: [{
				label: 'Total Pounds',
				data: group1,
				backgroundColor: 'rgba(0, 232, 158, .5)'
			}],
			labels: axis
		},
		options: {
			responsive: true,
			legend: {position: top}
		}
	});
};

let spinPerfChart = function(canvas, data){
	let tableRows = '<tbody>';
	for(let i of data[0]){
		tableRows += `<tr>
		<th scope="row">${i.month}</th>
		<td>${i['SUM(c.duration)']}</td>
		<td>${i['AVG(c.power)']}</td>
		<td>${i['AVG(c.rank)']}</td>
		<td>${i['MAX(c.power)']}</td>
		</tr>`;
	}
	tableRows += '</tbody>';
	$('#chart-spin-perf > table').append(tableRows);
};

const reports = [
	new Report("Spin", "chart-spin", "https://workoutsql.herokuapp.com/api/spin", spinChart),
	new Report("Spin Performance", "chart-spin-perf", "https://workoutsql.herokuapp.com/api/spin/perf", spinPerfChart),
	new Report("Run", "chart-run", "https://workoutsql.herokuapp.com/api/run", runChart),
	new Report("Lifts", "chart-lift", "https://workoutsql.herokuapp.com/api/lift/recent", liftChart),
	new Report("Lifts Monthly", "chart-lift-month", "https://workoutsql.herokuapp.com/api/lift/lastMonths", liftMonthChart)
];

reports.forEach(r => r.getDetails());
