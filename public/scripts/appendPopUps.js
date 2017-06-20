function appendPopUpText(data, popuptext, position, boxHeight, func){

  var holder = svg
    .append('g')
      .attr('class', 'popupBoxHolder')
      .attr('transform', position);

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
      .attr('height', boxHeight);

  var textholder = holder
    .append('text')

var y = 20;
popuptext.forEach(function(text){
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
  .attr('class', 'nextButton')
  .attr('transform', `translate(70, ${boxHeight - 35})`)

  buttonHolder
  .append('path')
    .attr('d', 'M 20,17 5,30 5,5 z')
    .attr('fill', '#E0473D')
    .attr('class', 'startButtonRect')
    .on('click', function(){
      func(data);
    })
    .attr('display', 'block')
    .attr('fill-opacity', 0)
    .transition(d3.transition()
      .duration(2000))
    .attr('fill-opacity', 1)

 }

 function changePopUp(data, text) {
   console.log(data);
   var currentPopUp = svg
   .selectAll('.popupBoxHolder')
     .transition(t)
     .attr('transform', 'translate(650, 0)');

    setTimeout(function(){
      appendPopUpText(data, text, 'translate(650, 0)', 165, function(){
        return dangerous(data);
      })
    }, 1500)
    setTimeout(function(){

      removePopUp();
    }, 1000)
 }

 function removePopUp(){
   var previousTextBox = svg
     .selectAll('.popupBoxHolder')
     .remove();
 }
