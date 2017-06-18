function fade (selection, opacity) {
  selection.style('fill-opacity', opacity);
}

var tick;

function ticked() {
  var asteroidCircle = svg.
    selectAll('.asteroid');

  if (tick){
    asteroidCircle
      .attr('cx', function(d){
        // console.log('ticl')
        return d.x
      })
      .attr('cy', function(d){
        return d.y
      })
  }

}
