document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formMessages = document.getElementById('form-messages');

    fetch(form.action, {
        method: form.method,
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            formMessages.innerHTML = `<div class="alert alert-success">${data}</div>`;
            form.reset();
        })
        .catch(error => {
            formMessages.innerHTML = `<div class="alert alert-danger">Erreur : ${error.message}</div>`;
        });
});