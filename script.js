// const html = document.getElementById("htmlPage");
// const checkbox = document.getElementById("checkbox");

// // Fonction pour appliquer le thème
// function applyTheme(theme) {
//     if (theme === "dark") {
//         html.setAttribute("data-bs-theme", "dark");
//         html.classList.add("theme-dark");
//         checkbox.checked = true;
//     } else {
//         html.setAttribute("data-bs-theme", "light");
//         html.classList.remove("theme-dark");
//         checkbox.checked = false;
//     }
// }

// // Vérifier le thème stocké au chargement de la page, avec "light" par défaut
// document.addEventListener("DOMContentLoaded", () => {
//     const savedTheme = localStorage.getItem("theme") || "light"; // Thème clair par défaut
//     applyTheme(savedTheme);
// });

// // Gérer le changement de thème via la case à cocher
// checkbox.addEventListener("change", () => {
//     const newTheme = checkbox.checked ? "dark" : "light";
//     applyTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
// });