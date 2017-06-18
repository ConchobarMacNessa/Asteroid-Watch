function dangerous(){
  d3.json(jsonUrl, function (err, data) {
    tick = true;

    var asteroidCircle = svg.
      selectAll('.asteroid');

  asteroidCircle
    .attr('cx', 0)
    .attr('cy', 0)

  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.estimated_diameter.kilometers.estimated_diameter_max)])
    .range([0, 40]);

  var simulation = d3.forceSimulation()
    .force('x', d3.forceX(width/2).strength(0.05))
    .force('y', d3.forceY(height/2).strength(0.05))
    .force('collide', d3.forceCollide(d => rScale(d.estimated_diameter.kilometers.estimated_diameter_max) + 1))

    simulation.nodes(data)
      .velocityDecay(0.4)
      .alphaTarget(0)

  });
}
