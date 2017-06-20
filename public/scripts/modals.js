function modal(d){

  var modalText = createModalText(d);
  var app = document.getElementById('modal');

  var modal = createEl('div', 'modal__container', `modal${d.simplified_name}`)
  var modalContent = createEl('div', 'modal__content', d.simplified_name);
  var modalTextContainer = createEl('div', 'modal__textcontainer', null, modalText);
  var close = createEl('span', 'modal__close', `close${d.simplified_name}`, 'X', closeModal);

  app.appendChild(modal);
  modal.appendChild(modalTextContainer);
  modal.appendChild(close);
  modal.style.display = 'none';
}

function createModalText(data){
  var text = `This asteroid, named ${data.name}, has a maximum diameter of ${data.estimated_diameter.kilometers.estimated_diameter_max}km. It will next approach Earth on ${data.close_approach_data.close_approach_date}, at a speed of ${data.close_approach_data.relative_velocity.kilometers_per_second}, and will miss Earth by ${data.close_approach_data.miss_distance.kilometers}km.
  RADIUS = ${data.estimated_diameter.kilometers.estimated_diameter_max}`
  return text;
}

function closeModal(e){
  var modalId = `modal${e.target.id.slice(5)}`
  document.getElementById(modalId).style.display = 'none';
}

var isOpen = false;

function openModal(d){
  var modals = document.getElementsByClassName('modal__container');
  Object.keys(modals).forEach(function (prop) {
    modals[prop].style.display = 'none';
  })
  var modalId = `modal${d.simplified_name}`;
  var modal = document.getElementById(modalId);
  modal.style.display = 'block';
}

function createEl(element, className, id, text, func) {
  var el = document.createElement(element);
  el.className = className || '';
  el.id = id || '';
  el.textContent = text || '';
  if (func) {el.onclick = func };
  return el;
}
