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
// elle s'enlève en défillant vers le bas et re-apparait en remontant

const navbar = document.getElementById("navbar");
let lastScrollValue = 0;
window.addEventListener("scroll", () =>{
    if(window.scrollY > lastScrollValue) {
        navbar.style.top = "-60px";
    } else {
        navbar.style.top = 0;
    }
    lastScrollValue = window.scrollY
});


// Fonctionnalité : Caret animés
function setupCaretAnimation() {
    const collapseConfigs = [
        {
            elementId: 'collapseWidthExample',
            buttonSelector: '#collapseButton .bi'
        },
        {
            elementId: 'collapseWidthExample2',
            buttonSelector: '#collapseButton2 .bi'
        },
        {
            elementId: 'collapseWidthExample3',
            buttonSelector: '#collapseButton3 .bi'
        }
    ];

    collapseConfigs.forEach(config => {
        const collapseElement = document.getElementById(config.elementId);
        const caretIcon = document.querySelector(config.buttonSelector);

        if (collapseElement && caretIcon) {
            collapseElement.addEventListener('show.bs.collapse', () => {
                caretIcon.classList.remove('bi-caret-down-fill');
                caretIcon.classList.add('bi-caret-up-fill');
            });

            collapseElement.addEventListener('hide.bs.collapse', () => {
                caretIcon.classList.remove('bi-caret-up-fill');
                caretIcon.classList.add('bi-caret-down-fill');
            });
        }
    });
}

// Exécutez la fonction après le chargement initial du DOM
document.addEventListener('DOMContentLoaded', setupCaretAnimation);

// Observateur pour les changements dynamiques
const observer = new MutationObserver(() => {
    const collapseConfigs = [
        { elementId: 'collapseWidthExample', buttonSelector: '#collapseButton .bi' },
        { elementId: 'collapseWidthExample2', buttonSelector: '#collapseButton2 .bi' },
        { elementId: 'collapseWidthExample3', buttonSelector: '#collapseButton3 .bi' }
    ];

    collapseConfigs.forEach(config => {
        const collapseElement = document.getElementById(config.elementId);
        const caretIcon = document.querySelector(config.buttonSelector);
        if (collapseElement && caretIcon && !collapseElement.dataset.observerInitialized) {
            setupCaretAnimation();
            collapseElement.dataset.observerInitialized = true; // Évite les doublons
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });