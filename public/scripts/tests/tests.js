var yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.close_approach_data.relative_velocity.kilometers_per_second ))
  .range([height, 0])
  .nice();
var yAxis = d3.axisLeft(yScale);
svg.call(yAxis);

var xScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.close_approach_data.miss_distance.kilometers))
  .range([0, width])
  .nice();

var xAxis = d3.axisBottom(xScale)
  .ticks(5);
svg
  .append('g')
    .attr('transform', `translate(0, ${height})`)
  .call(xAxis);

var rScale = d3.scaleSqrt()
  .domain([0, d3.max(data, d => d.estimated_diameter.kilometers.estimated_diameter_max)])
  .range([0, 40]); //this might need to change

var circles = svg
  .selectAll('.asteroid')
  .data(data)
  .enter()
  .append('g')
  .attr('class', 'asteroid')
  .attr('transform', d => {
    return `translate(${xScale(d.close_approach_data.miss_distance.kilometers)}, 100)`;
  });

circles
  .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', d => rScale(d.estimated_diameter.kilometers.estimated_diameter_max))
    .style('fill-opacity', 0.5)
    .style('fill', '#E0473D');

circles
  .append('text')
    .style('text-anchor', 'middle')
    .style('fill', 'black')
    .attr('y', 4)
    .text(d => d.name);
