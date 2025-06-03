import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html");

// Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
  let currentRoute = allRoutes.find((element) => element.url === url);
  return currentRoute || route404; // Retourne la route 404 si aucune correspondance
};

// Fonction pour charger le contenu de la page
const LoadContentPage = async () => {
  const path = window.location.pathname;
  const actualRoute = getRouteByUrl(path);

  try {
    // Récupération du contenu HTML de la route
    const response = await fetch(actualRoute.pathHtml);
    if (!response.ok) throw new Error("Erreur de chargement de la page");
    const html = await response.text();
    document.getElementById("mainpage").innerHTML = html;
  } catch (error) {
    console.error("Erreur lors du chargement du contenu:", error);
    document.getElementById("mainpage").innerHTML = "<h1>Erreur de chargement</h1>";
  }

  // Gestion du script JS (éviter l'accumulation)
  const existingScript = document.querySelector(`script[src="${actualRoute.pathJS}"]`);
  if (actualRoute.pathJS && !existingScript) {
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", actualRoute.pathJS);
    scriptTag.onload = () => {
      if (typeof window.initializeMail === "function") {
        window.initializeMail(); // Call initialization after script loads
      }
    };
    document.querySelector("body").appendChild(scriptTag);
  } else if (typeof window.initializeMail === "function") {
    window.initializeMail(); // Call if script is already loaded
  }

  // Changement du titre de la page
  document.title = actualRoute.title + " - " + websiteName;

  // Afficher et masquer éléments en fonction du rôle (à implémenter)
  if (typeof showAndHideElementsForRoles === "function") {
    showAndHideElementsForRoles();
  }
};

// Fonction pour gérer les événements de routage (clic sur les liens)
const routeEvent = (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) return;
  event.preventDefault();

  // Mise à jour de l'URL dans l'historique du navigateur
  window.history.pushState({}, "", event.target.href);

  // Chargement du contenu de la nouvelle page
  LoadContentPage();
};

// Gestion de l'événement de retour en arrière dans l'historique du navigateur
window.onpopstate = LoadContentPage;

// Assignation de la fonction routeEvent à la propriété route de la fenêtre
window.route = routeEvent;

// Chargement du contenu de la page au chargement initial
LoadContentPage();