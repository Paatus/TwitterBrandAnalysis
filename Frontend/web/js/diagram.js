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


$(function() {

var fill = d3.scale.category20();



var w = 520,
    h = 250;

var canvas = d3.select("#container4").append("svg")
            .attr("width", w)
            .attr("height", h)


var wordArray = ["Hello", "world", "normally", "you", "want", "more", "words",
        "than", "this","that","Hello", "world", "normally", "you", "want", "more", "words",
        "than", "this","that","Hello", "world", "normally", "you", "want", "more", "words",
        "than", "this","that"];

d3.layout.cloud().size([w, h])
    .words(wordArray.map(function(d) {
        return {
            text: d,
            size:20 + Math.random() * 20
        };
    }))
    .padding(5)
    .rotate(function() {
        return ~~(Math.random() * 36) * 5;
    })
    .font("Impact")
    .fontSize(function(d) {
        return d.size;
    })
    .on("end", draw)
    .start();

function draw(words) {
    canvas

    .append("g")
// .attr("width", w)
// .attr("height", h);
// .attr("x1",700)
// .attr("y1",700)
        .attr("transform","translate(240,130)")
        // .attr("transform", "translate(" + [w >> 1, h >> 1] + ")")
        .selectAll("text")
        .data(words)
        .enter()
            .append("text")
            .style("font-size", function(d) {return d.size + "px";})
            .style("font-family", "Impact")
            .style("fill", function(d, i) {return fill(i);})
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";})
            .text(function(d) {return d.text;});
}
});

$(function() {


var fill = d3.scale.category20();



var w = 520,
    h = 250;

var canvas = d3.select(".container41").append("svg")
            .attr("width", w)
            .attr("height", h)


var wordArray = ["Shan", "Shan", "Shan","Shan", "Shan", "Shan","Shan", "Shan", "Shan","Shan", "Shan", "Shan","Shan", "Shan", "Shan","Shan", "Shan", "Shan"];

d3.layout.cloud().size([w, h])
    .words(wordArray.map(function(d) {
        return {
            text: d,
            size:20 + Math.random() * 20
        };
    }))
    .padding(5)
    .rotate(function() {
        return ~~(Math.random() * 5) * 30 - 75;
    })
    .font("Impact")
    .fontSize(function(d) {
        return d.size;
    })
    .on("end", draw)
    .start();

function draw(words) {
    canvas

    .append("g")
// .attr("width", w)
// .attr("height", h);
// .attr("x1",700)
// .attr("y1",700)
        .attr("transform","translate(240,130)")
        // .attr("transform", "translate(" + [w >> 1, h >> 1] + ")")
        .selectAll("text")
        .data(words)
        .enter()
            .append("text")
            .style("font-size", function(d) {return d.size + "px";})
            .style("font-family", "Impact")
            .style("fill", function(d, i) {return fill(i);})
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";})
            .text(function(d) {return d.text;});
}
});

