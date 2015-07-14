var sample_data = [
  {
		"x": 1,
		"y": 5
	}, 
  {
		"x": 20,
		"y": 20
	}, 
  {
		"x": 40,
		"y": 10
	}, 
  {
		"x": 60,
		"y": 40
	}, 
  {
		"x": 80,
		"y": 5
	}, 
  {
		"x": 100,
		"y": 60
  }
];

var LineGraph = React.createClass({
	componentDidMount: function() {
		var data = this.props.initial_data;

    var min_x = d3.min(data, function(d) { return (d.x) });
    var max_x = d3.max(data, function(d) { return (d.x) });

    var min_y = d3.min(data, function(d) { return (d.y) });
    var max_y = d3.max(data, function(d) { return (d.y) });

		var graph_width = this.props.width*0.9
		var graph_height = this.props.height*0.9
	  var graph_x = this.props.width*0.1
	  var graph_y = this.props.height*0.1
		var xRange = d3.scale.linear()
		  .range([graph_x, graph_width]) // the amount of the svg to cover
			.domain([min_x, max_x]);       // the range of values we'll be showing
		var yRange = d3.scale.linear()
	    .range([graph_height, graph_y])
	    .domain([min_y, max_y]);

		var xAxis = d3.svg.axis().scale(xRange);
		var yAxis = d3.svg.axis().scale(yRange).orient("left");

		var graph = React.findDOMNode(this);
		var d3_graph = d3.select(graph);
		d3_graph.append("svg:g").call(xAxis)
	    .attr("transform", "translate(0, " + graph_height + ")")
		  .attr("class", "line-graph axis");
		d3_graph.append("svg:g").call(yAxis)
	    .attr("transform", "translate(" + graph_x + ", 0)")
		  .attr("class", "line-graph axis");

		var circles = d3_graph.selectAll("circle").data(data);

		circles
			.enter()
			.insert("circle")
			.attr("cx", function(d) { return xRange (d.x); })
			.attr("cy", function(d) { return yRange (d.y); })
			.attr("r", 10)
			.attr("class", "line-graph dot");
	},
	render: function() {
		var graph = <svg
	    className="lineGraph" 
	    width={this.props.width}
	    height={this.props.height}/>
		return (
			graph
		);
	}
});

React.render(
	<LineGraph
	  width={500}
		height={500}
		initial_data={sample_data}
	/>,
	document.getElementById('content')
);
