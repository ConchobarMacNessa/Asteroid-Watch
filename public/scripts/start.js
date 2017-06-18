function start(){
d3.json(jsonUrl, function (err, data) {

  tick = true;

  data = data.sort(function(a,b) {

    return b.estimated_diameter.kilometers.estimated_diameter_max - a.estimated_diameter.kilometers.estimated_diameter_max;

  })

var rScale = d3.scaleSqrt()
  .domain([0, d3.max(data, d => d.estimated_diameter.kilometers.estimated_diameter_max)])
  .range([0, 40]);

var simulation = d3.forceSimulation()
  // .force('x', d3.forceX(width/2).strength(0.05))
  // .force('y', d3.forceY(height/2).strength(0.05))
  .force('collide', d3.forceCollide(d => rScale(d.estimated_diameter.kilometers.estimated_diameter_max) + 1))

var boxForce = boundedBox()
    .bounds([[0, 0], [width - 20, height - 20]])
    .size(function (d) { return [100, 100] })

var circles = svg
  .selectAll('.asteroid')
  .data(data)
  .enter()
  .append('g')
  .attr('id', (d) => d.simplified_name)
  .attr('class', (d) =>{
    if (d.is_potentially_hazardous_asteroid){
      return 'gAsteroid hazardous';
    }
    return 'gAsteroid';
  })
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
    .velocityDecay(0.05)
    .alphaTarget(1)
    .force('box', boxForce)

    function boundedBox() {
      var nodes, sizes
      var bounds
      var size = constant([0, 0])

      function force() {
          var node, size
          var xi, x0, x1, yi, y0, y1
          var i = -1
          while (++i < nodes.length) {
              node = nodes[i]
              size = sizes[i]
              xi = node.x + node.vx
              x0 = bounds[0][0] - xi
              x1 = bounds[1][0] - (xi + size[0])
              yi = node.y + node.vy
              y0 = bounds[0][1] - yi
              y1 = bounds[1][1] - (yi + size[1])
              if (x0 > 0 || x1 < 0) {
                  node.x += node.vx
                  node.vx = -node.vx
                  if (node.vx < x0) { node.x += x0 - node.vx }
                  if (node.vx > x1) { node.x += x1 - node.vx }
              }
              if (y0 > 0 || y1 < 0) {
                  node.y += node.vy
                  node.vy = -node.vy
                  if (node.vy < y0) { node.vy += y0 - node.vy }
                  if (node.vy > y1) { node.vy += y1 - node.vy }
              }
          }
      }

      force.initialize = function (_) {
          sizes = (nodes = _).map(size)
      }

      force.bounds = function (_) {
          return (arguments.length ? (bounds = _, force) : bounds)
      }

      force.size = function (_) {
          return (arguments.length
               ? (size = typeof _ === 'function' ? _ : constant(_), force)
               : size)
      }

      return force
  }

  function constant(_) {
      return function () { return _ }
  }

});
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
