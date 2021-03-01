// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter") 
  .classed("chart", true)
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //load the data from data.csv
  d3.csv("assets/data/data.csv").then(function(data) {

    // Print the Data
    console.log(data);

    //format the data and cast the age and obesity values to numbers
    data.forEach(function(data) {
        data.age = +data.age;
        data.obesity = +data.obesity;
    });
    console.log(data);
    
    
    //age vs obesity
        // Add X axis
        console.log("max age", d3.max(data, d => d.age));
        max_age = d3.max(data, d => d.age) + 5;
        var x = d3.scaleLinear()
        //.domain([30, (d3.max(data, d => d.age)] +5))
        .domain([30,max_age])
        .range([ 0, width ]);
        chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`) //here
        .call(d3.axisBottom(x));

        // Add Y axis
        max_obesity = d3.max(data, d => d.obesity)+5;
        var y = d3.scaleLinear()
        .domain([15, max_obesity])
        .range([height, 0]);
        chartGroup.append("g")
        //.attr("transform", `translate(${width}, 10)`) //here
        .call(d3.axisLeft(y));

        // Add dots
        chartGroup.selectAll('.circle')
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.age); } )
        .attr("cy", function (d) { return y(d.obesity); } )
        .attr("r", 15)
        .attr("stroke-width", 1.5)
        .classed("stateCircle", true)

        //Add State Abbreviations
        chartGroup.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function (d) { return x(d.age); } )
        .attr("y", function (d) { return y(d.obesity - .35); } )
        .classed("stateText", true)
        .text(d => d.abbr)

        //y labels
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left+20)
        .attr("x", 0 - (height/2))
        //.attr("dy", "1em")
        .attr("class", "aText")
        .text("Obesity");

        // x labels
        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + 30})`)
        .attr("class", "aText")
        .text("Age");
    }).catch(function(error){
        console.log(error);
    });


