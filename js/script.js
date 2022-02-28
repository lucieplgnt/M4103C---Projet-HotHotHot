const onglets = Array.from(document.querySelectorAll(".onglets"));
const contenu = Array.from(document.querySelectorAll(".contenu"));

let index = 0;

onglets.forEach(onglet => {
  onglet.addEventListener('click', () => {

    if (onglet.classList.contains('active')){
      return;
    } else {
      onglet.classList.add('active');
    }

    index = onglet.getAttribute('data-block');
    for (i = 0; i < onglets.length; i++) {

      if (onglets[i].getAttribute('data-block') != index) {
        onglets[i].classList.remove('active');
      }
    }

    for (j = 0; j < contenu.length; j++){
      if (contenu[j].getAttribute('data-block') == index) {
        contenu[j].classList.add('activeContenu');
      } else {
        contenu[j].classList.remove('activeContenu');
      }

    }
  })
})