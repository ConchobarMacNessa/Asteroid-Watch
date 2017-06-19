function orbit(){
  d3.json(jsonUrl, function(error, data){
    ticked = false;

  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.estimated_diameter.kilometers.estimated_diameter_max)])
    .range([0, 40]);

    // var planets = svg
    //   .selectAll('.planet')
    //   .data(planetObj)
    //   .enter()
    //   .append('g')
    //     .attr('class', 'planet')
    //   .append('circle')
    //     .attr('id', (d) => d.name)
    //     .attr('cy', (d) => d.cy)
    //     .attr('cx', (d) => d.cx)
    //     .attr('r', (d) => d.r)
    //     .attr('fill', 'yellow');

var simulation = d3.forceSimulation()
    .nodes(data)
    .on('tick', ticked)
    .velocityDecay(0.05)
    .alphaTarget(1);

    function findGravity(planetName, attribute){

      return planetObj.find(x => x.name === planetName)[attribute];
    }

  var asteroids = svg
      .selectAll('.gAsteroid')
      .selectAll('circle')
        .attr('cx', d => findGravity(d.close_approach_data.orbiting_body, 'cx'))


    setTimeout(function(){
      cySetter();
    }, 500)
    
  var cySetter = function() {
    asteroids
      .transition(t)
      .delay(800)
      .attr('cy', d => findGravity(d.close_approach_data.orbiting_body, 'cy'))
  }

});
}
