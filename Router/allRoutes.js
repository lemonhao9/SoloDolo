import Route from "./Route.js";

//Définir ici les routes
export const allRoutes = [
    new Route("/", "Accueil", "./pages/home.html"),
    new Route("/about", "À propos", "./pages/about.html"),
    new Route("/cv", "CV", "./pages/cv.html","./js/mail.js","./send_mail.php"),
    new Route("/contact", "Contact", "./pages/contact.html")
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "HamonLéo Portfolio";