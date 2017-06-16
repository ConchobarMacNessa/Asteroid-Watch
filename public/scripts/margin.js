var margin = { top: 10, right: 20, bottom: 30, left: 30 };
var width = 1000 - margin.left - margin.right;
var height = 565 - margin.top - margin.bottom;

var svg = d3.select(".chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .classed("info", true)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(100, " + margin.top + ")");

var jsonUrl = 'https://gist.githubusercontent.com/ConchobarMacNessa/1cbf3116ef71b70ba150706c78ae7cf4/raw/b17e150e0b9b532e3519e5d4c81351ba4d35692e/asteroids.json';
