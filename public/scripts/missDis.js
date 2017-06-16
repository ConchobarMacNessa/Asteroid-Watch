function missDistanceGraph() {
  d3.json(jsonUrl, function (err, data) {
  var startPoint = 500;

  function fade (selection, opacity) {
    selection.style('fill-opacity', opacity);
  }

  var xScale = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, 800])
    .padding(0.2)

  svg
    .append('g')
      .attr('transform', `translate(0, ${startPoint})`)
      .classed('axis', true)
      .call(d3.axisBottom(xScale)
        .tickSizeInner(10)
        .tickSizeOuter(20)
        .tickPadding(15));

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.close_approach_data.miss_distance.kilometers)])
    .range([startPoint, 0]);

  var yAxis = svg
    .append('g')
    .classed('axis', true)
    .call(d3.axisLeft(yScale));

      var t = d3.transition().duration(1000);

      var update = svg.selectAll('rect')
        .data(data.filter(d => d.close_approach_data.miss_distance.kilometers), d => d.name)

      update
        .exit()
        .transition(t)
        .attr('y', height)
        .attr('height', 0)
        .remove(); //removes any object without a corresponding data object

      yScale.domain([0, d3.max(data, d => d.close_approach_data.miss_distance.kilometers)]);
      yAxis
        .transition(t)
        .delay(1000)
        .call(d3.axisLeft(yScale));

      update
        .transition(t)
        .delay(1000)
        .attr('y', d => yScale(d.close_approach_data.miss_distance.kilometers))
        .attr('height', d => startPoint - yScale(d.close_approach_data.miss_distance.kilometers));

    update
        .enter()
        .append('rect')
        .on('mouseover', function(d, i, elements) {
          d3.selectAll(elements)
            .filter(':not(:hover)')
            .call(fade, 0.5);
        })
        .on('mouseout', function (d, i, elements) {
          d3.selectAll(elements)
            .call(fade, 1);
        })
        .attr('y', startPoint)
        .attr('height', 0)
        .attr('x', d => xScale(d.name))
        .attr('width', 50)
        .transition(t)
        .delay(update.exit().size() ? 1000 : 0)
        .attr('y', d => yScale(d.close_approach_data.miss_distance.kilometers))
        .attr('height', d => startPoint - yScale(d.close_approach_data.miss_distance.kilometers));
  });
}
