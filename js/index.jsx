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

var graph_props = {
	margin_x: 20,
	margin_y: 20
}

var d3_chart = {};

d3_chart.create = function(el, props, state) {
	var svg = d3.select(el).append("svg")
		.attr("class", "d3")
		.attr("width", props.width)
		.attr("height", props.height)

	svg.append("g")
		.attr("class", "d3-points");

	this.update(el, state);
};

d3_chart._draw_points = function(el, scales , data) {
  var g = d3.select(el).selectAll('.d3-points');

  var point = g.selectAll('.d3-point')
    .data(data);

	point
		.enter()
		.insert("circle")
		.attr("cx", function(d) { return scales.x (d.x); })
		.attr("cy", function(d) { return scales.y (d.y); })
		.attr("r", 10)
		.attr("class", "line-graph dot");
};

d3_chart._scales = function(el, domain) {

	var width = el.offsetWidth - (graph_props.margin_x*2);
	var height = el.offsetHeight - (graph_props.margin_y*2);

	var x = d3.scale.linear()
		.range([0, width]) // the amount of the svg to cover
		.domain(domain.x); // the range of values we'll be showing
	var y = d3.scale.linear()
		.range([height, 0])
		.domain(domain.y);
	return {
		x: x,
		y: y
	};
};

d3_chart._draw_axis = function(el, domain, graph_props) {
	var xAxis = d3.svg.axis().scale(domain.x);
	var yAxis = d3.svg.axis().scale(domain.y).orient("left");

	var width = el.offsetWidth - (graph_props.margin_x*2);
	var height = el.offsetHeight - (graph_props.margin_y*2);

	el_for_d3 = d3.select(".d3");
	el_for_d3.append("svg:g").call(xAxis)
		.attr("transform", "translate(" +  graph_props.margin_x + ", " + height + ")")
		.attr("class", "line-graph axis");
	el_for_d3.append("svg:g").call(yAxis)
		.attr("transform", "translate(" + graph_props.margin_x + ", " + graph_props.margin_y + ")")
		.attr("class", "line-graph axis");
};

d3_chart.update = function(el, state) {
	var scales = this._scales(el, state.domain);
	this._draw_axis(el, scales, graph_props);
	this._draw_points(el, scales, state.data);
}

d3_chart.destroy = function(el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};

var Chart = React.createClass({
	propTypes: {
		data: React.PropTypes.array,
		domain: React.PropTypes.object
	},

	componentDidMount: function() {
	  var el = this.getDOMNode();

		d3_chart.create(el, {
			width: '100%',
			height: '300px'
		}, this.getChartState());
	},

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    d3_chart.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  },

  componentWillUnmount: function() {
    var el = this.getDOMNode();
    d3_chart.destroy(el);
  },

  render: function() {
    return (
      <div className="chart"></div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    var min_x = d3.min(sample_data, function(d) { return (d.x) });
    var max_x = d3.max(sample_data, function(d) { return (d.x) });

    var min_y = d3.min(sample_data, function(d) { return (d.y) });
    var max_y = d3.max(sample_data, function(d) { return (d.y) });

		return {
			data: sample_data,
			domain: { x: [min_x, max_x], y: [min_y, max_y] },
	  };
  },

	render: function() {
		return (
			<div className="app">
			  <Chart
				  data={this.state.data}
					domain={this.state.domain}
				/>
			</div>
		);
	}
});

//var LineGraph = React.createClass({
	//componentDidMount: function() {
		//var data = this.props.initial_data;

    //var min_x = d3.min(data, function(d) { return (d.x) });
    //var max_x = d3.max(data, function(d) { return (d.x) });

    //var min_y = d3.min(data, function(d) { return (d.y) });
    //var max_y = d3.max(data, function(d) { return (d.y) });

		//var graph_width = this.props.width*0.9
		//var graph_height = this.props.height*0.9
		//var graph_x = this.props.width*0.1
		//var graph_y = this.props.height*0.1
		//var xRange = d3.scale.linear()
			//.range([graph_x, graph_width]) // the amount of the svg to cover
			//.domain([min_x, max_x]);       // the range of values we'll be showing
		//var yRange = d3.scale.linear()
			//.range([graph_height, graph_y])
			//.domain([min_y, max_y]);

		//var xAxis = d3.svg.axis().scale(xRange);
		//var yAxis = d3.svg.axis().scale(yRange).orient("left");

		//var graph = React.findDOMNode(this);
		//var d3_graph = d3.select(graph);
		//d3_graph.append("svg:g").call(xAxis)
			//.attr("transform", "translate(0, " + graph_height + ")")
			//.attr("class", "line-graph axis");
		//d3_graph.append("svg:g").call(yAxis)
			//.attr("transform", "translate(" + graph_x + ", 0)")
			//.attr("class", "line-graph axis");

		//var circles = d3_graph.selectAll("circle").data(data);

		//circles
			//.enter()
			//.insert("circle")
			//.attr("cx", function(d) { return xRange (d.x); })
			//.attr("cy", function(d) { return yRange (d.y); })
			//.attr("r", 10)
			//.attr("class", "line-graph dot");
	//},
	//render: function() {
		//var graph = <svg
			//className="lineGraph" 
			//width={this.props.width}
			//height={this.props.height}/>
		//return (
			//graph
		//);
	//}
//});

React.render(
	<App/>,
	document.getElementById('content')
);
