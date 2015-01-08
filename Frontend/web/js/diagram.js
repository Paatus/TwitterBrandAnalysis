$(function() {
    $('#barchart').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Brand tweet amounts'
        },
        xAxis: {
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
        },/* {
            name: 'Neutral',
            color: '#FFFF55',
            data: []
        },*/ {
            name: 'Negative',
            color: '#FF5555',
            data: []
        }]
    });
    
	$('#linechart').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Brand opinion over the last 12 hours'
        },
        subtitle: {
            text: 'Displayed times are in UTC'
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Opinion (%)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        }
    });

    var barchart = $("#barchart").highcharts();
    var linechart = $("#linechart").highcharts();

	var date = new Date();
	var array = [];
	for(var i = 12; i > 0; i--)
	{
		var hour = date.getUTCHours() - i;
		var hourmax = date.getUTCHours() -i + 1;
		if(hour < 0)
		{
			hour += 24;
		}
		if(hourmax < 0)
		{
			hourmax += 24;
		}
		array.push(hour + ":" + date.getUTCMinutes() + "-" + hourmax + ":" + date.getUTCMinutes());
	}
	linechart.xAxis[0].update({categories: array});
    
    $.ajax({
        url: "/api/keywords/get/",
        success: function(data) {
            data.keywords.forEach(function(kw) {
				
				//Populate barchart
                $.ajax({
                    url: "/api/amount/" + kw,
                    success: function(kwdata) {
						var newcat =  barchart.xAxis[0].categories;
						newcat.push(kw);
						barchart.xAxis[0].update({categories: newcat});
                        barchart.series[0].addPoint(parseInt(kwdata.positive));
                        //barchart.series[1].addPoint(parseInt(kwdata.neutral));
                        barchart.series[1].addPoint(parseInt(kwdata.negative));
                    }
                });

                //Populate linechart
                var serie = linechart.addSeries({
					name: kw,
					data: []
				})
				for(var i = 11; i >= 0; i--) {
					$.ajax({
						url: "/api/world/keyword/" + kw + "/" + (i + 1) * 60 + "/" + i * 60,
						success: function(kwdata) {
							var value = 0;
							var count = 0;
							for (var prop in kwdata) {
								var a = kwdata[prop];
								value = (value * count + parseFloat(a[0]) * parseInt(a[1])) / (count + parseInt(a[1]));
								count += parseInt(a[1]);
							}
							serie.addPoint(Math.round(value * 10000) / 100);
						}
					});
				}
            });
        }
    });
    
});


$(function() {
    
    var w = $("#wordcloud").width(), //520
        h = $("#wordcloud").height(), //250
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
    
    var svg = d3.select("#wordcloud").append("svg")
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
    
    function update(newdata) {
        layout.spiral("archimedean");
        words = [];
        fontSize.domain([+newdata[newdata.length - 1].value || 1, +newdata[0].value]);
        layout.stop().words(newdata).start();
    }
    
    $.ajax({
        url: "/api/top/keyword/10080/0",
        success: function(data) {
            //obj = JSON.parse(data);
            var obj = data;
            var list = [];
            for(var key in obj) {
                list.push({word: key, weight: parseInt(obj[key])})
            }   
            list.sort(function(a, b) {  
                a = a.weight;   
                b = b.weight;   
                return a < b ? 1 : (a > b ? -1 : 0);    
            }); 
            var newdata = [];
            
            for(var i = 0; i < 100 && i < list.length; i++) {
                newdata.push({key: list[i].word, value: list[i].weight });
            }
            update(newdata);
        }
    });
});

/*
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
*/

