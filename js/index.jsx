var LineGraph = React.createClass({
	render: function() {
		var graph = <svg className="lineGraph"></svg>
		
		var xRange = d3.scale.linear()
		  .range([40, 400]) // the amount of the svg to cover
			.domain([0, 100]) // the range of values we'll be showing
		var yRange = d3.scale.linear().range([40, 400]).domain([0, 100])

		return (
			graph
		);
	}
});

React.render(
	<LineGraph />,
	document.getElementById('content')
);
