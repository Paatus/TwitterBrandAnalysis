
var width = 550;
var height = 240;

var fill = d3.scale.category20();

var widthScale = d3.scale.linear()
// domain here means data range by given
                .domain([0,70])
// range for container
                .range([0,width]);

// var heightScale = d3.scale.linear()
//                 .domain([0,340])
//                 .range([0,height]);
var axis = d3.svg.axis()
            .scale(widthScale);



var canvas = d3.select("#container4")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
                .append("g")
                .attr("transform","translate(20,0)");
                // call method


var color =  d3.scale.linear()
                .domain([0,70])
                .range(["red","blue"]);



var numberArray =[20,40,50,70];

var singleWord = canvas.selectAll("rect")
                        .data(numberArray)
                        // place holder slection
                        .enter()
                            .append("rect")
// d stander for each data from wordData
                            .attr("width",function(d){return widthScale(d);})
                            .attr("height",10)
                            .attr("fill", function(d, i) {return color(d);})
// get radom color
// .attr("fill", function(d, i) {return fill(i);})
// i means the index for each data for example first, second,
                            .attr("y", function(d,i){return i*50});

canvas.append("g")
        .attr("transform","translate(0,160)")
        .call(axis);


