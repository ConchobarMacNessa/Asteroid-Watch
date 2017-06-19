function missDistanceGraph() {
  d3.json(jsonUrl, function (err, data) {

    var existingG = svg.selectAll('.gAsteroid')._groups[0];
    var existingCircles = svg.selectAll('.asteroid')._groups[0];
    // var existingText = svg.selectAll('.textNode')._groups[0];

    var xCoordinates = [
      15,
      94,
      172,
      250,
      329,
      407,
      486,
      564,
      643,
      721
    ];

    for (var i = 0; i < 10; i++) {
    existingG[i].style.transition = "transform 1.5s";
    existingG[i].setAttribute('transform',`translate(${xCoordinates[i]}, 500)`);
    existingCircles[i].style.transition = "r 1.5s";
    existingCircles[i].setAttribute('r',0);
    // existingText[i].style.transition = "opacity 1s";
    // existingText[i].setAttribute('opacity',0);
  }

  var startPoint = 500;

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

      var update = svg.selectAll('rect')
        .data(data.filter(d => d.close_approach_data.miss_distance.kilometers), d => d.name)

      update
        .exit()
        .transition(t)
        .delay(800)
        .attr('y', height)
        .attr('height', 0)
        .remove(); //removes any object without a corresponding data object

      yScale.domain([0, d3.max(data, d => d.close_approach_data.miss_distance.kilometers)]);
      yAxis
        .transition(t)
        .delay(800)
        .call(d3.axisLeft(yScale));

      update
        .transition(t)
        .delay(800)
        .attr('y', d => yScale(d.close_approach_data.miss_distance.kilometers))
        .attr('height', d => startPoint - yScale(d.close_approach_data.miss_distance.kilometers));

    update
        .enter()
        .append('rect')
        .attr('fill-opacity', 0.5)
        .on('mouseover', function(d, i, elements) {
          d3.selectAll(elements)
            .filter(':hover')
            .call(fade, 1);
        })
        .on('mouseout', function (d, i, elements) {
          d3.selectAll(elements)
            .call(fade, 0.5);
        })
        .attr('y', startPoint)
        .attr('height', 0)
        .attr('x', d => xScale(d.name))
        .attr('width', 50)
        .transition(t)
        .delay(800)
        .attr('y', d => yScale(d.close_approach_data.miss_distance.kilometers))
        .attr('height', d => startPoint - yScale(d.close_approach_data.miss_distance.kilometers));
  });
}
