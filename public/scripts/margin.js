var margin = { top: 10, right: 20, bottom: 30, left: 30 };
var width = 1000 - margin.left - margin.right;
var height = 565 - margin.top - margin.bottom;

var svg = d3.select(".chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .classed("info", true)
  .attr("height", height + 200 + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(100, " + margin.top + ")");

var jsonUrl = 'https://gist.githubusercontent.com/ConchobarMacNessa/261d83d938e01ebe87dd7a9fd45eef0f/raw/066ca035a9f063dd6c4fc841ea23e84ce54f783d/AsteroidWatch.json';
