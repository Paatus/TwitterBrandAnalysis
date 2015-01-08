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
    
    var barchart = $("#barchart").highcharts();

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

            });
        }
    });
    
});
