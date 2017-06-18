function size(){
  d3.json(jsonUrl, function (err, data) {
    // tick = true;
//     var rScale = d3.scaleSqrt()
//       .domain([0, d3.max(data, d => d.estimated_diameter.kilometers.estimated_diameter_max)])
//       .range([0, 40]);
//
//     var simulation = d3.forceSimulation()
//       .force('x', d3.forceX(width/2).strength(0.05))
//       .force('y', d3.forceY(height/2).strength(0.05))
//       .force('collide', d3.forceCollide(d => rScale(d.estimated_diameter.kilometers.estimated_diameter_max) + 1))
//
//       simulation.nodes(data)
//         .on('tick', ticked)
//         .velocityDecay(0)
//         .alphaTarget(2)
//         .force('box', null)
//
// setTimeout(function(){
  tick = false;

  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.estimated_diameter.kilometers.estimated_diameter_max)])
    .range([0, 40]);

  var radiuses = [];

    data.forEach(function(d){
      radiuses.push(rScale(d.estimated_diameter.kilometers.estimated_diameter_max))
    })

  radiuses.sort(function(a,b){
    return b - a
  })

  var gCircles = svg
    .selectAll('.gAsteroid')
    .selectAll(`.\\385580`);

var circles = svg
  .selectAll('.gAsteroid')
  .selectAll('circle')

  var xPosition = 0;

    for (var i = 0; i < 10; i++){
      if (i > 0) {
        xPosition += radiuses[i-1] * 2 + 10;
      }
      circles._groups[i][0]
        .style.transition = "cx 1s";
      circles._groups[i][0].setAttribute('cx', xPosition);
      setTimeout(function(){
        addCs(circles._groups)
      }, 1000)
    }

// }

function addCs(groups){
  for (var i = 0; i < 10; i++){
  groups[i][0]
    .style.transition = "cy 2.5s";
  groups[i][0].setAttribute('cy', 250);
  }
}

});
}
