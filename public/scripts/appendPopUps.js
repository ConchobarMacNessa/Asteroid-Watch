function appendFirstPageText(data){

  var popupText = ['These 10 circles',
'represent 10 asteroids.',
'Click an asteroid at',
'any time to find out',
'more about it.',
'',
'click below to continue'];

  var holder = svg
    .append('g')
      .attr('class', 'popupBoxHolder')
      .attr('transform', 'translate(0, 100)');

  holder
    .append('rect')
      .attr('class', 'popupBox')
      .attr('fill', 'white')
      .attr('display', 'block')
      .attr('fill-opacity', 0)
      .transition(d3.transition()
        .duration(2000))
      .attr('fill-opacity', 1)
      .attr('width', 180)
      .attr('height', 180);

  var textholder = holder
    .append('text')

var y = 20;
popupText.forEach(function(text){
  textholder
    .append('tspan')
      .attr('x', 10)
      .attr('y', y)
      .attr('class', 'popupBox__text')
      .text(text)

      y += 20;
})
var buttonHolder =
  holder
  .append('g')
  .attr('transform', 'translate(70, 145)')

  buttonHolder
  .append('path')
    .attr('d', 'M 20,17 5,30 5,5 z')
    .attr('fill', '#E0473D')
    .attr('class', 'startButtonRect')
    .on('click', function(){
      size(data);
    })
    .attr('display', 'block')
    .attr('fill-opacity', 0)
    .transition(d3.transition()
      .duration(2000))
    .attr('fill-opacity', 1)

 }
