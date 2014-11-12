var tz_to_c = {
    "Midway Island": "nausa",
    "Samoa": "osasm",
    "Hawaii": "nausa",
    "Alaska": "nausa",
    "Tijuana": "namex",
    "Pacific Time (US & Canada)": "nausa",
    "Mazatlan": "namex",
    "Mountain Time (US & Canada)": "nausa",
    "Arizona": "nausa",
    "Chihuahua": "namex",
    "Central Time (US & Canada)": "nausa",
    "Mexico City": "namex",
    "Central America": "nausa",
    "Monterrey": "namex",
    "Saskatchewan": "nacan",
    "Eastern Time (US & Canada)": "nausa",
    "Quito": "saecu",
    "Indiana (East)": "nausa",
    "Bogota": "sacol",
    "Caracas": "saven",
    "Georgetown": "nacym",
    "La Paz": "sabol",
    "Atlantic Time (Canada)": "nacan",
    "Newfoundland": "nacan",
    "Santiago": "sachl",
    "Buenos Aires": "sabra",
    "Greenland": "nagrl",
    "Mid-Atlantic": "nausa",
    "Brasilia": "sabra",
    "Cape Verde Is.": "afcpv",
    "Azores": "euprt",
    "London": "eugbr",
    "Monrovia": "aflbr",
    "Dublin": "euirl",
    "UTC": "nagrl",
    "Lisbon": "euprt",
    "Casablanca": "afmar",
    "Ljubljana": "eusvn",
    "Zagreb": "euhrv",
    "Budapest": "euhun",
    "Skopje": "eumkd",
    "Vienna": "euaut",
    "Prague": "eucze",
    "Bern": "eudeu",
    "Amsterdam": "eunld",
    "Sarajevo": "eubih",
    "Stockholm": "euswe",
    "Brussels": "eubel",
    "Bratislava": "eusvk",
    "Belgrade": "eusrb",
    "Rome": "euita",
    "Warsaw":"eupol",
    "Paris":"eufra",
    "West Central Africa": "afnga",
    "Madrid": "euesp",
    "Copenhagen": "eudnk",
    "Kyiv": "euukr",
    "Athens": "eugrc",
    "Pretoria": "afzaf",
    "Jerusalem": "asisr",
    "Vilnius": "euhrv",
    "Bucharest": "eurou",
    "Helsinki": "eufin",
    "Sofia": "eubgr",
    "Cairo": "afegy",
    "Riga": "eulva",
    "Harare": "afzwe",
    "Istanbul": "astur",
    "Tallinn": "euest",
    "Nairobi": "afken",
    "Riyadh": "assau",
    "Kuwait": "askwt",
    "Baghdad": "asirq",
    "Minsk": "eublr",
    "Tehran": "asirn",
    "Baku": "asaze",
    "Yerevan": "asarm",
    "Muscat": "asomn",
    "Tbilisi": "asgeo",
    "Volgograd": "asrus",
    "Kabul": "asafg",
    "Karachi": "aspak",
    "Tashkent": "asuzb",
    "New Delhi": "asind",
    "Sri Jayawardenepura": "aslka",
    "Kathmandu": "asnpl",
    "Almaty": "askaz",
    "Ekaterinburg": "asrus",
    "Dhaka": "asbgd",
    "Rangoon": "asmmr",
    "Jakarta": "asidn",
    "Hanoi": "asvnm",
    "Novosibirsk": "asrus",
    "Urumqi": "aschn",
    "Ulaan Bataar": "asmng",
    "Hong Kong": "ashkg",
    "Perth": "ocaus",
    "Beijing": "aschn",
    "Taipei": "astwn",
    "Kuala Lumpur": "asmys",
    "Singapore": "assgp",
    "Krasnoyarsk": "asrus",
    "Chongqing": "aschn",
    "Seoul": "askor",
    "Irkutsk": "asrus",
    "Tokyo": "asjpn",
    "Darwin": "ocaus",
    "Yakutsk": "asrus",
    "Port Moresby": "ocaus",
    "Brisbane": "ocaus",
    "Guam": "ocgum",
    "Adelaide": "ocaus",
    "Solomon Is.": "ocslb",
    "New Caledonia": "ocncl",
    "Hobart": "ocaus",
    "Sydney": "ocaus",
    "Melbourne": "ocaus",
    "Magadan": "asrus",
    "Kamchatka": "asrus",
    "Marshall Is.": "ocmhl",
    "Fiji": "ocfji",
    "Wellington": "ocnzl",
    "Nuku'alofa": "octon",
    "Chennai": "asind",
    "Bangkok": "astha",
    "Guadalajara": "namex",
    "Berlin": "eudeu",
    "Moscow": "asrus",
    "Abu Dhabi": "asare",
    "America/New_York": "nausa",
    "Mumbai": "asind",
    "Islamabad":"aspak",
    "Lima": "saper",
    "Edinburgh": "eugbr",
    "null":"nausa",
    "Canberra":"ocaus",
    "Kolkata":"asind",
    "Asia/Kolkata":"asind",
    "America/Los_Angeles":"nausa",
    "Auckland":"ocnzl",
    "MST":"nausa",
    "America/Chicago":"nausa",
    "America/Boise":"nausa",
    "Osaka":"asjpn",
    "EST":"nausa",
    "BST":"eugbr",
    "CST":"nausa",
    "Sapporo": "asjpn",
    "PST":"nausa",
    "America/Mexico_City":"namex",
    "AST":"asafg",
    "America/Detroit":"nausa",
    "St. Petersburg":"asrus",
    "GMT":"eugbr",
    "Vladivostok":"asrus",
    "Asia/Kuala_Lumpur":"asmys"
};


function get_id_from_tz(tz) {
	if (tz in tz_to_c) {
		return tz_to_c[tz];
	} else {
                return tz;
        }
}

$(document).ready(function() {
				$('#fullpage').fullpage({
					menu: '#menu',
					anchors: ['home', 'map', '3rdPage'],
					sectionsColor: ['#292f33', '#f5f8fa', '#55ACEE'],
					autoScrolling: false
				});
			});

$(document).ready(function() {
	$.get( "world" )
	  .done(function( data ) {
	sample_data = [];
	    for (var e in data) {
                sample_data.push({"value": parseFloat(data[e][0]), "id":get_id_from_tz(e), "country":"Kenny" });
                console.log({"value": parseFloat(data[e][0]), "id":get_id_from_tz(e) });
		//console.log(get_id_from_tz(e) + " " + parseFloat(data[e][0]) + " " + parseInt(data[e][1]));
	    }
	var visualization = d3plus.viz()
	.container("#viz") // container DIV to hold the visualization
	.data(sample_data) // data to use with the visualization
	.coords(countries) // pass topojson coordinates
	.type("geo_map")   // visualization type
	.id("id")     // key for which our data is unique on
	.text("country")      // key to use for display text
	.color("value")    // key for coloring countries
	.tooltip("value")  // keys to place in tooltip
	.draw();			   // finally, draw the visualization!			 
	//alert( "Data Loaded: " + data );
	});
	/*var visualization = d3plus.viz()
	.container("#viz") // container DIV to hold the visualization
	.data(sample_data) // data to use with the visualization
	.coords(countries) // pass topojson coordinates
	.type("geo_map")   // visualization type
	.id("id")     // key for which our data is unique on
	.text("country")      // key to use for display text
	.color("value")    // key for coloring countries
	.tooltip("value")  // keys to place in tooltip
	.draw();*/			   // finally, draw the visualization!			 
	//sample_data.push({"value": 1, "country": "Australia","id":"ocaus"});
	//sample_data.push({"value": 1, "country": "Sweden","id":"euswe"});
	//get_id_from_tz(0);
						});
