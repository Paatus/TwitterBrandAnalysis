var fill = d3.scale.category20();

console.log(d3);

var w = 520,
    h = 250;
d3.layout.cloud().size([w, h])
    .words([
        "Hello", "world", "normally", "you", "want", "more", "words",
        "than", "this"
    ].map(function(d) {
        return {
            text: d,
            size:10 + Math.random() * 20
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

function draw(words,bounds) {
    d3.select("#container4").append("svg").attr("width", w).attr("height", h).append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")").selectAll("text")
    .data(words).enter().append("text")
    .style("font-size", function(d) {return d.size + "px";})
    .style("font-family", "Impact")
    .style("fill", function(d, i) {return fill(i);}).attr("text-anchor", "middle").attr("transform", function(d) {return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";})
    .text(function(d) {return d.text;});
}
