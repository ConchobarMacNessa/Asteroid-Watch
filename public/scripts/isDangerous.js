function dangerous(){
  d3.json(jsonUrl, function(err, data) {

  var nonDangerousAs = svg
    .selectAll('.gAsteroid')
    .selectAll('circle');
  for (var i = 0; i < 10; i++){
    nonDangerousAs._groups[i][0].style.transition = 'cx 1s';
    nonDangerousAs._groups[i][0].setAttribute('cx', 100);
  }
  var dangerousAsteroid = svg
    .selectAll('.hazardous')
    .selectAll('circle');

  dangerousAsteroid._groups[0][0].style.transition = 'cx 2s';
  dangerousAsteroid._groups[0][0].setAttribute('cx', 300);

  });
}
