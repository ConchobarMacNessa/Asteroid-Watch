
function speedSize(){
d3.json(jsonUrl, function (err, data) {
  var startPoint = 500;

  svg.selectAll('.asteriod')
      .style('fill', 'yellow');

  var yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.close_approach_data.relative_velocity.kilometers_per_second))
    .range([startPoint, 0])
    .nice();
  var yAxis = d3.axisLeft(yScale);
  svg.call(yAxis);


  var xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.estimated_diameter.kilometers.estimated_diameter_max))
    .range([0, 800])
    .nice();

  var xAxis = d3.axisBottom(xScale)
    .ticks(5);
  svg
    .append('g')
      .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.estimated_diameter.kilometers.estimated_diameter_max)])
    .range([0, 40]);


  var gElements = svg.selectAll('.gAsteroid');
  var gElementsGroups = gElements._groups[0]

  var asteroidObj = [];
  data.map(function(d){
    var tempObj = {};
    tempObj.speed = d.close_approach_data.relative_velocity.kilometers_per_second;
    tempObj.size = d.estimated_diameter.kilometers.estimated_diameter_max
    asteroidObj.push(tempObj)
  })
  var t = d3.transition().duration(1000);


  for (var i = 0; i < gElementsGroups.length; i++) {
    for (var i = 0; i < asteroidObj.length; i++){
      gElementsGroups[i].style.transition = "transform 3s"
        gElementsGroups[i].setAttribute('transform',`translate(${xScale(asteroidObj[i].size)}, ${yScale(asteroidObj[i].speed)})`);
      }
  }
});
}
