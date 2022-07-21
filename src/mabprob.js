//#Function for creating a Grid
//Source: https://cagrimmett-jekyll.s3.amazonaws.com/til/2016/08/17/d3-lets-make-a-grid.html
function gridData() {
    var data = new Array();
    var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;
    var width = 100;
    var height = 100;

    //number of rows
    for (var row = 0; row < 4; row++) {
        data.push( new Array() );

        //number of columns
        for (var column = 0; column < 4; column++) {
            data[row].push({
                x: xpos,
                y: ypos,
                width: width,
                height: height
            })

            xpos += width;
        }
        //reset the x position after a row is complete
        xpos = 1;

        ypos += height;
    }
    return data;
}

//create grid and initialize size

var gridData = gridData();

var grid = d3.select("#grid")
    .append("svg")
    .attr("width","510px")
    .attr("height","510px");


//Create grid rows
var row = grid.selectAll(".row")
    .data(gridData)
    .enter().append("g")
    .attr("class", "row");

//Create grid columns
var column = row.selectAll(".square")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("class","square")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("width", function(d) { return d.width; })
    .attr("height", function(d) { return d.height; })
    .style("fill", "#fff")
    .style("stroke", "#222");