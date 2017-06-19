
function speedSize(){
d3.json(jsonUrl, function (err, data) {

  tick = false;

  var startPoint = 500;

  var yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.close_approach_data.relative_velocity.kilometers_per_second))
    .range([startPoint, 0])
    .nice();
  var yAxis = d3.axisLeft(yScale)
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
      .classed('axis', true)
    .call(xAxis);

  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.estimated_diameter.kilometers.estimated_diameter_max)])
    .range([0, 40]);

  var gElementsGroups = svg.selectAll('.gAsteroid')._groups[0]

  var asteroidObj = [];
  data.map(function(d){
    var tempObj = {};
    tempObj.speed = d.close_approach_data.relative_velocity.kilometers_per_second;
    tempObj.size = d.estimated_diameter.kilometers.estimated_diameter_max
    asteroidObj.push(tempObj)
  })

  // var dangerousAsteroid = svg
  //   .selectAll('.hazardous')
  //   .selectAll('circle');
  //   dangerousAsteroid._groups[0][0].style.transition = 'cx 0.5s';
  //   dangerousAsteroid._groups[0][0].setAttribute('cx', 50);

function alignToZero(){
  var asteroids = svg.selectAll('.gAsteroid')
  .selectAll('circle')
  .transition(d3.transition()
    .duration(250))
  .attr('cy', 0)
  .attr('cx', 50);
}

function plotGraph(){
  for (var i = 0; i < gElementsGroups.length; i++) {
    for (var i = 0; i < asteroidObj.length; i++){
      gElementsGroups[i].style.transition = "transform 1s"
        gElementsGroups[i].setAttribute('transform',`translate(${xScale(asteroidObj[i].size)}, ${yScale(asteroidObj[i].speed)})`);
      }
  }
}
  alignToZero()

setTimeout(function(){
  plotGraph()
}, 10)

});
}
