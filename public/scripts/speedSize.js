function speedSize(data){

  removePopUp();

  setTimeout(function(){
    finalPopUp(data);
  }, 2000);

  tick = false;

  var startPoint = 500;

  var xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.estimated_diameter.kilometers.estimated_diameter_max))
    .range([0, 800])
    .nice();

  var yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.close_approach_data.relative_velocity.kilometers_per_second))
    .range([startPoint, 0])
    .nice();

setTimeout(function appendAxis(){
  var yAxis = d3.axisLeft(yScale)
  svg.call(yAxis);

  var xAxis = d3.axisBottom(xScale)
    .ticks(5);

  svg
    .append('g')
      .attr('transform', `translate(0, ${height})`)
      .classed('axis', true)
    .call(xAxis);

  svg
    .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", -40 - margin.left)
       .attr("x",0 - (height / 2))
       .attr("dy", "1em")
       .style("text-anchor", "middle")
       .text("km per second");

  svg
    .append("text")
      .attr("transform", `translate(${width/2}, ${height + margin.top + 40})`)
      .style("text-anchor", "middle")
      .text("Size in km");

  }, 2000);

  var gElementsGroups = svg.selectAll('.gAsteroid')._groups[0]

  var asteroidObj = [];
  data.map(function(d){
    var tempObj = {};
    tempObj.speed = d.close_approach_data.relative_velocity.kilometers_per_second;
    tempObj.size = d.estimated_diameter.kilometers.estimated_diameter_max
    asteroidObj.push(tempObj)
  });

  var asteroids = svg.selectAll('.gAsteroid')
  .selectAll('circle')
    .transition(d3.transition()
      .duration(1000))
    .attr('cx', 0)
    .attr('cy', 0);


  for (var i = 0; i < gElementsGroups.length; i++) {
    for (var i = 0; i < asteroidObj.length; i++){
      gElementsGroups[i].style.transition = "transform 1s"
        gElementsGroups[i].setAttribute('transform',`translate(${xScale(asteroidObj[i].size)}, ${yScale(asteroidObj[i].speed)})`);
      }
  }
}
