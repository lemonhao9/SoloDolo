//Fonctionnalité : Loader

const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
    // Toujours jouer l'animation de fondu
    loader.classList.add('fondu-out');
    // Attendre la fin de l'animation pour masquer complètement la div
    loader.addEventListener('transitionend', () => {
        loader.style.display = 'none';
    }, { once: true });
});

//Fontionnalité : navbar dynamique

const navbar = document.getElementById("navbar");
let lastScrollValue = 0;
window.addEventListener("scroll", () =>{
    if(window.scrollY > lastScrollValue) {
        navbar.style.top = "-60px";
    } else {
        navbar.style.top = 0;
    }
    lastScrollValue = window.scrollY
});// elle s'enlève en défillant vers le bas et re-apparait en remontant