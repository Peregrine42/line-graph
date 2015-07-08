var LineGraph = React.createClass({
	componentDidMount: function() {
		var xRange = d3.scale.linear()
		  .range([40, 400]) // the amount of the svg to cover
			.domain([0, 100]); // the range of values we'll be showing
		var yRange = d3.scale.linear().range([40, 400]).domain([0, 100]);

		var xAxis = d3.svg.axis().scale(xRange);
		var yAxis = d3.svg.axis().scale(yRange).orient("left");

		var graph = React.findDOMNode(this);
		d3_graph = d3.select(graph);
		d3_graph.append("svg:g").call(xAxis);
		d3_graph.append("svg:g").call(yAxis).attr("transform", "translate(40, 0)");
	},
	render: function() {
		var graph = <svg className="lineGraph"></svg>
		return (
			graph
		);
	}
});

React.render(
	<LineGraph />,
	document.getElementById('content')
);
