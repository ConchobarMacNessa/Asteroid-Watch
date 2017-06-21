function appendPopUpText(data, popuptext, position, boxHeight, func, simulation){

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
      .attr('class', 'popupTextHolder')

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
      func(data, simulation);
    })
    .attr('display', 'block')
    .attr('fill-opacity', 0)
    .transition(d3.transition()
      .duration(2000))
    .attr('fill-opacity', 1)

 };



 function changePopUp(data, text, simulation) {
   svg
    .selectAll('.popupBox__text')
    .remove();

   var currentPopUp = svg
   .selectAll('.popupBoxHolder')
     .transition(d3.transition()
       .duration(3000))
     .attr('transform', 'translate(650, 0)');

     var textholder = svg
      .selectAll('.popupTextHolder');

   var y = 20;
   text.forEach(function(t){
     textholder
       .append('tspan')
         .attr('x', 10)
         .attr('y', y)
         .attr('class', 'popupBox__text')
         .text(t)
         y += 20;
   });
   svg
    .selectAll('.startButtonRect')
      .on('click', function(){
        dangerous(data, simulation);
      });
 };



 function removePopUp(){
   var previousTextBox = svg
     .selectAll('.popupBoxHolder')
     .remove();
 };
