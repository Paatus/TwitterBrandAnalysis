$(function () {

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=world-population-history.csv&callback=?', function (csv) {

        // Parse the CSV Data
        /*Highcharts.data({
            csv: data,
            switchRowsAndColumns: true,
            parsed: function () {
                console.log(this.columns);
            }
        });*/

        // Very simple and case-specific CSV string splitting
        function CSVtoArray(text) {
            return text.replace(/^"/, '')
                .replace(/",$/, '')
                .split('","');
        };

        csv = csv.split(/\n/);

        var countries = {},
            mapChart,
            countryChart,
            numRegex = /^[0-9\.]+$/,
            quoteRegex = /\"/g,
            categories = CSVtoArray(csv[1]).slice(4);

        // Parse the CSV into arrays, one array each country
        $.each(csv.slice(2), function (j, line) {
            var row = CSVtoArray(line),
                data = row.slice(4);

            $.each(data, function (i, val) {

                val = val.replace(quoteRegex, '');
                if (numRegex.test(val)) {
                    val = parseInt(val);
                } else if (!val) {
                    val = null;
                }
                data[i] = val;
            });
            countries[row[1]] = {
                name: row[0],
                code: row[1],
                data: data
            };
        });
        // For each country, use the latest value for current population
        var data = [];
		for (var code in countries) {
            var value = null,
                year,
                itemData = countries[code].data,
                i = itemData.length;

            while (i--) {
                if (typeof itemData[i] === 'number') {
                    value = itemData[i];
                    year = categories[i];
                    break;
                }
            }
            data.push({
                name: countries[code].name,
                code: code,
                value: value,
                year: year
            });
        }
		// get data with ajax and add it to map
		$.ajax({
			url: "/api/world/total",
			data: {},
			type: "GET",
			dataType: "json",
			success: function(returnData) {
				d = translateToMap(returnData);
				for(i in d) {
					var val = parseFloat(d[i].value);
					d[i].value = (val == 0 ? 0.00001 : val);
				}
				mapChart.series[0].setData(d, false);
				mapChart.redraw();
			},
			error: function( xhr, status, errorThrown ) {},
			complete: function( xhr, status ) {}
		});
        // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
        var mapData = Highcharts.geojson(Highcharts.maps['custom/world']);
        $.each(mapData, function () {
            this.id = this.properties['hc-key']; // for Chart.get()
            this.flag = this.id.replace('UK', 'GB').toLowerCase();
        });

        // Wrap point.select to get to the total selected points
        Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {

            proceed.apply(this, Array.prototype.slice.call(arguments, 1));

            var points = mapChart.getSelectedPoints();

            if (points.length) {
                if (points.length === 1) {
                    $('#info #flag').attr('class', 'flag ' + points[0].flag);
                    $('#info h2').html(points[0].name);
                } else {
                    $('#info #flag').attr('class', 'flag');
                    $('#info h2').html('Comparing countries');

                }
                $('#info .subheader').html('<h4>Historical population</h4><small><em>Shift + Click on map to compare countries</em></small>')

                if (!countryChart) {
                    countryChart = $('#container').highcharts({
                        chart: {
                            height: 250,
                            spacingLeft: 0
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            tickPixelInterval: 0.1,
                            crosshair: true
                        },
                        yAxis: {
                            title: null,
                            opposite: true
                        },
                        tooltip: {
                            shared: true
                        },
                        plotOptions: {
                            series: {
                                animation: {
                                    duration: 500
                                },
                                marker: {
                                    enabled: false
                                },
                                threshold: 0,
                                pointStart: 0 /*parseInt(categories[0])*/,
                            }
                        }
                    }).highcharts();
                }

                $.each(points, function (i) {
                    // Update
                    if (countryChart.series[i]) {
                        /*$.each(countries[this.code].data, function (pointI, value) {
                            countryChart.series[i].points[pointI].update(value, false);
                        });*/
                        countryChart.series[i].update({
                            name: this.name,
                            data: countries[this.code].data,
                            type: points.length > 1 ? 'line' : 'area'
                        }, false);
                    } else {
                        countryChart.addSeries({
                            name: this.name,
                            data: countries[this.code].data,
                            type: points.length > 1 ? 'line' : 'area'
                        }, false);
                    }
                });
                while (countryChart.series.length > points.length) {
                    countryChart.series[countryChart.series.length - 1].remove(false);
                }
                countryChart.redraw();

            } else {
                $('#info #flag').attr('class', '');
                $('#info h2').html('');
                $('#info .subheader').html('');
                if (countryChart) {
                    countryChart = countryChart.destroy();
                }
            }



        });

        // Initiate the map chart
        mapChart = $('#container').highcharts('Map', {

            title : {
                text : 'Brand opinion of the searches for this user'
            },

            subtitle: {
                text: ''
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
                type: 'logarithmic',
                endOnTick: false,
                startOnTick: true,
                min: 0.00001
            },

            tooltip: {
                footerFormat: '<span style="font-size: 10px">(Click for details)</span>'
            },

            series : [{
                data : data,
                mapData: mapData,
                joinBy: ['iso-a2', 'code'],
                name: 'Brand opinion of the searches for this user',
                allowPointSelect: false,
                cursor: 'pointer',
                states: {
                    select: {
                        color: '#a4edba',
                        borderColor: 'black',
                        dashStyle: 'shortdot'
                    }
                }
            }]
        }).highcharts();

        // Pre-select a country
        //mapChart.get('us').select();
    });
});
