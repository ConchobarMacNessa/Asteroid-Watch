var margin = { top: 10, right: 50, bottom: 30, left: 50 };
var width = 400 - margin.left - margin.right;
var height = 200 - margin.top - margin.bottom;

var svg = d3.select('.chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

var jsonUrl = 'https://gist.githubusercontent.com/ConchobarMacNessa/1cbf3116ef71b70ba150706c78ae7cf4/raw/ae6a99e8fbd629b22fb09731469edf04e0e682a7/asteroids.json'

d3.json(jsonUrl, function (err, data) {
  var radius = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.near_earth_objects.estimated_diameter.kilometers.estimated_diameter_max)])
    .range([0, 40]); //this might need to change

console.log(data);

});


function responsivefy(svg) {
  var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

  svg.attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(resize);

  d3.select(window).on("resize." + container.attr("id"), resize);

  function resize() {
      var targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
  }
}
