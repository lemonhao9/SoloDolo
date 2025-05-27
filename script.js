// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Vérifier que themeToggle existe
  if (!themeToggle) {
    console.error("L'élément avec l'ID 'themeToggle' n'a pas été trouvé.");
    return;
  }

  // Charger le thème sauvegardé depuis localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Appliquer le thème initial
  if (savedTheme === 'dark') {
    body.classList.add('theme-dark');
    themeToggle.checked = true; // Mettre à jour l'état de la case à cocher
  } else {
    body.classList.remove('theme-dark');
    themeToggle.checked = false;
  }

  // Gérer le basculement du thème
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      body.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('theme-dark');
      localStorage.setItem('theme', 'light');
    }
  });
});