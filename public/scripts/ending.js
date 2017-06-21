function ending(){

var toBeRemoved = [
  '.gAsteroid',
  '.tick',
  'path',
  '.axis',
  'text'
];

  function removeContent(){
    toBeRemoved.forEach(function(e){
      console.log(e);
      svg
        .selectAll(e)
          .remove();
    })
  }
  removeContent();

  document.getElementById('finalPopUp').style.display = 'none';

  var holder = svg
    .append('g')
      .attr('class', 'finalContainer')
      .attr('transform', `translate(552, ${height/2})`);

  holder
    .append('rect')
      .attr('class', 'finalText')
      .attr('fill', '#313131')
      .attr('display', 'block')
      .attr('fill-opacity', 0)
      .transition(d3.transition()
        .duration(2000))
      .attr('fill-opacity', 1)
      .attr('width', 300)
      .attr('height', 50);

  var textholder = holder
    .append('text')
      .attr('class', 'finalText')
      .attr('fill', '#E4E7F2')
      .attr('fill-opacity', 0)
      .transition(d3.transition()
        .duration(2000))
      .attr('fill-opacity', 1)
      .text('created by AE Carr, 2017')

}
