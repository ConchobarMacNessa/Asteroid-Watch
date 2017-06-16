d3.json(jsonUrl, function (err, data) {

  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.estimated_diameter.kilometers.estimated_diameter_max)])
    .range([0, 40]);

var circles = svg
  .selectAll('.asteroid')
  .data(data)
  .enter()
  .append('g')
  .attr('class', 'gAsteroid')
  .attr('transform', d => {
    return `translate(${getRandomInt(0, 800)}, ${getRandomInt(100, 400)})`;
  });

  circles
    .append("circle")
    	.attr("cy", 0)
    	.attr("cx", 0)
      .attr('class', 'asteroid')
    	.attr("r", d => rScale(d.estimated_diameter.kilometers.estimated_diameter_max))
      .style('fill-opacity', 0.5)
      .style('fill', '#E0473D');

  circles
    .append('text')
      .style('text-anchor', 'middle')
      .style('fill', 'black')
      .attr('y', 4)
      .text(d => d.name);

});


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
