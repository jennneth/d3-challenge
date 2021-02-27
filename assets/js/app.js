// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")  
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

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
        var x = d3.scaleLinear()
        .domain([30, d3.max(data, d => d.age)])
        .range([ 0, chartWidth ]);
        svg.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.obesity)])
        .range([chartHeight, 0]);
        svg.append("g")
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
        chartGroup.selectAll("text")
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
        .attr("y", 0 - chartMargin.left - 10)
        .attr("x", 0 - chartHeight/2)
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Obesity");

        // x labels
        chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`)
        .attr("class", "aText")
        .text("Age");
    }).catch(function(error){
        console.log(error);
    });


