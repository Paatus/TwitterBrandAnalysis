$(document).ready(function() {
				$('#fullpage').fullpage({
					menu: '#menu',
					anchors: ['home', 'map', '3rdPage'],
					sectionsColor: ['#292f33', '#f5f8fa', '#55ACEE'],
					autoScrolling: false
				});
			});

$(document).ready(function() {
						// instantiate d3plus
							var visualization = d3plus.viz()
							.container("#viz") // container DIV to hold the visualization
							.data(sample_data) // data to use with the visualization
							.coords(countries) // pass topojson coordinates
							.type("geo_map")   // visualization type
							.id("id")     // key for which our data is unique on
							.text("country")      // key to use for display text
							.color("value")    // key for coloring countries
							.tooltip("value")  // keys to place in tooltip
							.draw()			   // finally, draw the visualization!			 
						});