function start(){
d3.json(jsonUrl, function (err, data) {

  tick = true;

  setTimeout(function(){
    appendPopUpText(data, pageOneText, 'translate(0, 100)', 180, size)
  }, 1000);

fadeOutElements(['start', 'title'])

var rScale = d3.scaleSqrt()
  .domain([0, d3.max(data, d => d.estimated_diameter.kilometers.estimated_diameter_max)])
  .range([0, 40]);

var simulation = d3.forceSimulation()
  .force('collide', d3.forceCollide(d => rScale(d.estimated_diameter.kilometers.estimated_diameter_max) + 1))

var boxForce = boundedBox()
    .bounds([[0, 0], [width - 40, height + 20]])
    .size(function (d) { return [100, 100] })

var circles = svg
  .selectAll('.asteroid')
  .data(data)
  .enter()
  .append('g')
    .attr('id', (d) => {
      modal(d);
      return d.simplified_name;
    })
    .attr('class', (d) =>{
      if (d.is_potentially_hazardous_asteroid){
        return 'gAsteroid hazardous';
      }
      return 'gAsteroid';
    })
    .on('click', function(d){
      openModal(d)
    })

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
      .on('click', function(d, i, elements){
        d3.selectAll(elements)
            .filter(':not(:hover)')
              .style('fill', '#E0473D')
        d3.selectAll(elements)
            .filter(':hover')
            .style('fill', '#EAB22B')
      })

  simulation.nodes(data)
    .on('tick', ticked)
    .velocityDecay(0.05)
    .alphaTarget(1)
    .force('box', boxForce);

});
}
