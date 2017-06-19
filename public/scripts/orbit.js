function orbit(){
    ticked = false;
    var planets = svg
      .selectAll('.planet')
      .data(planetObj)
      .enter()
      .append('g')
        .attr('class', 'planet')
      .append('circle')
        .attr('id', (d) => d.name)
        .attr('cy', (d) => d.cy)
        .attr('cx', (d) => d.cx)
        .attr('r', (d) => d.r)
        .attr('fill', 'yellow');
}
