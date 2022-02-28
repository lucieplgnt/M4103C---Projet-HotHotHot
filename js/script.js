// activation du menu début
let btn = document.querySelector(".bx-menu");
let menu = document.querySelector(".menu");

btn.onclick = function() {
    menu.classList.toggle("large");
}

btn.addEventListener("click" , () =>{
    if(menu.classList.contains('large')){
        btn.classList.remove("bx-menu");
        btn.classList.add("bx-x");
    } else{
        btn.classList.add("bx-menu");
        btn.classList.remove("bx-x");
    }
});
// activation du menu fin

// changement de thème début
let section = document.querySelector("body");
let sun = document.querySelector(".bx-sun");

sun.addEventListener("click" , () =>{
    if(section.classList.contains('dark')){
        section.classList.add("light");
        section.classList.remove("dark");
        sun.classList.remove("bx-sun");
        sun.classList.add("bx-moon");
    } else if(section.classList.contains('light')){
        section.classList.add("dark");
        section.classList.remove("light");
        sun.classList.add("bx-sun");
        sun.classList.remove("bx-moon");
    }
});
// thème fin

// systhème d'anglets début
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
// anglets fin