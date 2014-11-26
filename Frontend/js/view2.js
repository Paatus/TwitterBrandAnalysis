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
