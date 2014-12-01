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
