d3.json(jsonUrl, function (err, data) {

  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.estimated_diameter.kilometers.estimated_diameter_max)])
    .range([0, 40]);

var simulation = d3.forceSimulation()
  .force('x', d3.forceX(width/2).strength(0.05))
  .force('y', d3.forceY(height/2).strength(0.05))
  .force('collide', d3.forceCollide(d => rScale(d.estimated_diameter.kilometers.estimated_diameter_max) + 1))


var circles = svg
  .selectAll('.asteroid')
  .data(data)
  .enter()
  .append('g')
  .attr('class', 'gAsteroid')
  // .attr('transform', d => {
  //   return `translate(${getRandomInt(0, 800)}, ${getRandomInt(100, 400)})`
  // });
  // .attr('transform', 'translate(100, 100)');

  circles
    .append("circle")
    	.attr("cy", 0)
    	.attr("cx", 0)
      .attr('class', 'asteroid')
    	.attr("r", d => rScale(d.estimated_diameter.kilometers.estimated_diameter_max))
      .style('fill-opacity', 0.5)
      .style('fill', '#E0473D')
      .on('mouseover', function(d, i, elements) {
        d3.selectAll(elements)
          .filter(':hover')
          .call(fade, 1);
      })
      .on('mouseout', function(d, i, elements){
        d3.selectAll(elements)
          .call(fade, 0.5);
      })

  // circles
  //   .append('text')
  //     .attr('class', 'textNode')
  //     .style('text-anchor', 'middle')
  //     .attr('y', 4)
  //     .text(d => d.name);

  simulation.nodes(data)
    .on('tick', ticked)

  var asteroidCircle = svg.
    selectAll('.asteroid');

  function ticked() {
    asteroidCircle
      .attr('cx', function(d){
        return d.x
      })
      .attr('cy', function(d){
        return d.y
      })
    // textNode
    // .attr('cx', function(d){
    //   return d.x
    // })
    // .attr('cy', function(d){
    //   return d.y
    // })
  }

});


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
