function fade (selection, opacity) {
  selection.style('fill-opacity', opacity);
};

var tick;

function ticked() {
  var asteroidCircle = svg.
    selectAll('.asteroid');

  if (tick){
    asteroidCircle
      .attr('cx', function(d){
        return d.x
      })
      .attr('cy', function(d){
        return d.y
      })
  }

};

var t = d3.transition()
  .duration(2000);

function fadeOutElements(arr){
  arr.forEach(function(a){
    document.getElementsByClassName(a)[0].style.transition = 'opacity 0.5s';
    document.getElementsByClassName(a)[0].style.opacity = 0;
  })
};

function removeSvgContent(arr){
  arr.forEach(function(e){
    svg
      .selectAll(e)
        .remove();
  })
}
