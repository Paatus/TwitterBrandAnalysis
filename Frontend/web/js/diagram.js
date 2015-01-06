$(function() {
	$('#container1').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Brand tweet amounts'
        },
        xAxis: {
            //categories: ['Shan', 'Oranges', 'Pears', 'Grapes', 'Bananas']
			categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Amount of tweets'
            }
        },
        legend: {
            reversed: false
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Positive',
			color: '#88FF88',
            data: []
        }, {
            name: 'Neutral',
			color: '#FFFF55',
            data: []
        }, {
            name: 'Negative',
			color: '#FF5555',
            data: []
        }]
    });
	var chart = $("#container1").highcharts();
    //Get keywords
	keywords = [];
	$.ajax({
		url: "/api/keywords/get/",
		success: function(data) {
			keywords = data.keywords;
			chart.xAxis[0].update({categories: data.keywords})
			
			//Get data for each keyword
			kwdata = {};
			keywords.forEach(function(kw) {
				$.ajax({
					url: "/api/amount/" + kw,
					success: function(data) {
						kwdata[kw] = data;
						chart.series[0].addPoint(parseInt(data.positive));
						chart.series[1].addPoint(parseInt(data.neutral));
						chart.series[2].addPoint(parseInt(data.negative));
					}
				});
			});

		}
	});
	
});


$(function() {
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function(data) {

        // Create the chart
        $('#container2').highcharts('StockChart', {

            rangeSelector: {
                inputEnabled: $('#container2').width() > 480,
                selected: 1
            },

            title: {
                text: 'Shan Stock Price'
            },

            series: [{
                name: 'Shan Stock Price',
                data: data,
                type: 'spline',
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });
});



$(function() {
    $('#container3').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Compare brand'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Shan',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
});


	var w = 520, //960
		h = 250, //600
		minFont = 10,
		maxFont = 50,
		fill = d3.scale.category20(),
		words = [],
		fontSize = d3.scale.log().range([minFont, maxFont]);
	
	var layout = d3.layout.cloud()
		.timeInterval(10)
		.size([w, h])
		.fontSize(function(d) { return fontSize(+d.value); })
		.text(function(d) { return d.key; })
		.on("end", draw);
	
	var svg = d3.select("#container4").append("svg")
		.attr("width", w)
		.attr("height", h);
	
	var background = svg.append("g"),
		vis = svg.append("g")
		.attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

	function draw(data, bounds) {
		scale = bounds ? Math.min(
			w / Math.abs(bounds[1].x - w / 2),
			w / Math.abs(bounds[0].x - w / 2),
			h / Math.abs(bounds[1].y - h / 2),
			h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
		words = data;
		var text = vis.selectAll("text")
			.data(words, function(d) { return d.text.toLowerCase(); });
		text.transition()
			.duration(1000)
			.attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
			.style("font-size", function(d) { return d.size + "px"; });
		text.enter().append("text")
			.attr("text-anchor", "middle")
			.attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
			.style("font-size", function(d) { return d.size + "px"; })
			.style("opacity", 1e-6)
		.transition()
			.duration(1000)
			.style("opacity", 1);
		text.style("font-family", function(d) { return d.font; })
			.style("fill", function(d) { return fill(d.text.toLowerCase()); })
			.text(function(d) { return d.text; });
		var exitGroup = background.append("g")
			.attr("transform", vis.attr("transform"));
		var exitGroupNode = exitGroup.node();
		text.exit().each(function() {
		exitGroupNode.appendChild(this);
		});
		exitGroup.transition()
			.duration(1000)
			.style("opacity", 1e-6)
			.remove();
		vis.transition()
			.delay(1000)
			.duration(750)
			.attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
	}
	
	function update(data) {
		layout.spiral("archimedean");
		words = [];
		fontSize.domain([+newdata[newdata.length - 1].value || 1, +newdata[0].value]);
		layout.stop().words(data).start();
	}
	
	$.ajax({
		url: "/api/top/keyword/10080/0",
		success: function(data) {
			obj = JSON.parse(data);
			list = [];
			for(var key in obj) {
				list.push({word: key, weight: parseInt(obj[key])})
			}	
			list.sort(function(a, b) {	
				a = a.weight;	
				b = b.weight;	
				return a < b ? 1 : (a > b ? -1 : 0);	
			});	
			newdata = [];	
			for(var i = 0; i < 100; i++) {	
				newdata.push({key: list[i].word, value: list[i].weight });
			}
			update(newdata);
		}
	});
