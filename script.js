let section = document.querySelector("body");
let sun = document.querySelector(".bx-sun");
/* let moon = document.querySelector(".bx-sun"); */

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