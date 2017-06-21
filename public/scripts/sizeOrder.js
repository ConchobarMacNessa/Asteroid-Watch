function size(data){
  removePopUp();

setTimeout(function(){
  appendPopUpText(data, pageTwoFirstText, 'translate(0, 0)', 165, function(){
    return changePopUp(data, pageTwoSecondText);
  })
}, 2500);


  tick = false;

  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.estimated_diameter.kilometers.estimated_diameter_max)])
    .range([0, 40]);

  var radiuses = [];

    data.forEach(function(d){
      radiuses.push(rScale(d.estimated_diameter.kilometers.estimated_diameter_max))
    })

  radiuses.sort(function(a,b){
    return b - a
  })

var circles = svg
  .selectAll('.gAsteroid')
  .selectAll('circle')

  var xPosition = 100;

    for (var i = 0; i < 10; i++){
      if (i > 0) {
        xPosition += radiuses[i-1] * 2 + 10;
      }
      circles._groups[i][0]
        .style.transition = "cx 1s";
      circles._groups[i][0].setAttribute('cx', xPosition);
      setTimeout(function(){
        addCs(circles._groups)
      }, 1000)
    }
}


function addCs(groups){
  for (var i = 0; i < 10; i++){
  groups[i][0]
    .style.transition = "cy 2.5s";
  groups[i][0].setAttribute('cy', 250);
  }
}

function sayHello(data){
  console.log(data);
}
