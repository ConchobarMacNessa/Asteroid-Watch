function modal(d){

  var modalText = createModalText(d);
  var app = document.getElementById('modal');

  var modal = createEl('div', 'modal__container', `modal${d.simplified_name}`)
  var modalContent = createEl('div', 'modal__content', d.simplified_name);
  var modalText = createEl('p', 'modal__text', null, modalText);
  var close = createEl('span', 'modal__close', `close${d.simplified_name}`, 'X', closeModal);

  app.appendChild(modal);
  modal.appendChild(modalText);
  modal.appendChild(close);
  modal.style.display = 'none';
}

function createModalText(data){
  var text = `This asteroid, named ${data.name}, has a maximum diameter of ${data.estimated_diameter.kilometers.estimated_diameter_max}km. It will next approach Earth on ${data.close_approach_data.close_approach_date}, at a speed of ${data.close_approach_data.relative_velocity.kilometers_per_second}km/s, and will miss Earth by ${data.close_approach_data.miss_distance.kilometers}km.`
  return text;
}

function closeModal(e){
  var modalId = `modal${e.target.id.slice(5)}`
  document.getElementById(modalId).style.display = 'none';

  var asteroids = svg
    .selectAll('.asteroid')
    .style('fill', '#E0473D')
}

var isOpen = false;

function openModal(d){
  var modals = document.getElementsByClassName('modal__container');
  Object.keys(modals).forEach(function (prop) {
    modals[prop].style.display = 'none';
  })

  var modalId = `modal${d.simplified_name}`;
  var modal = document.getElementById(modalId);
  modal.style.transition = 'display 2s';
  modal.style.display = 'flex';
}

function createEl(element, className, id, text, func) {
  var el = document.createElement(element);
  el.className = className || '';
  el.id = id || '';
  el.textContent = text || '';
  if (func) {el.onclick = func };
  return el;
}

function finalPopUp(){

  var popupText = 'This graph shows the asteroids arranged by both size and speed';

  var app = document.getElementById('popup');

  var popup = createEl('div', 'finalPopUp__container', 'finalPopUp');
  var popupText = createEl('p', 'finalPopUp__text', null, popupText);
  var close = createEl('span', 'finalPopUp__close', `closepopup`, 'END', function(){console.log('popupclosed');});

  app.appendChild(popup);
  popup.appendChild(popupText);
  popup.appendChild(close);
}
