window.initializeMail = function () {

    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const sendbtn = document.getElementById("sendbtn");



    // Reattach event listeners
    email.addEventListener("keyup", validateForm);
    subject.addEventListener("keyup", validateForm);
    message.addEventListener("keyup", validateForm);

    function validateForm() {
        const emailOK = validateMail(email);
        const subjectOK = validateRequired(subject);
        const messageOK = validateRequired(message);

        if (emailOK && subjectOK && messageOK) {
            sendbtn.disabled = false;
        } else {
            sendbtn.disabled = true;
        }
    }

    function validateMail(input) {
        const emailRegex = /^[a-zA-Z0-9.-]+@[^\s@]+\.[^\s@]+$/;
        const mailUser = input.value;
        if (mailUser.match(emailRegex)) {
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            return true;
        } else {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            return false;
        }
    }

    function validateRequired(input) {
        if (input.value !== '') {
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            return true;
        } else {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            return false;
        }
    }

    const $form = $('#contactForm');
    $form.off('submit').on('submit', function (e) {
        e.preventDefault();
        const $messages = $('#form-messages');
        const $submitBtn = $('#sendbtn');

        $submitBtn.prop('disabled', true).text('Envoi en cours...');

        function escapeHtml(text) {
            return text.replace(/[&<>"']/g, function (m) {
                return {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                }[m];
            });
        }

        $.ajax({
            url: $form.attr('action'),
            method: $form.attr('method'),
            data: $form.serialize(),
            dataType: 'json',
            success: function (response) {
                $messages.empty();
                if (response && response.status === 'success') {
                    $messages.html('<div class="alert alert-success" role="alert">' + (response.message || 'E-mail envoyé avec succès !') + '</div>');
                    $form[0].reset();
                    setTimeout(() => {
                        $('#contactModal').modal('hide');
                        window.location.href = '/cv';
                    }, 2000);
                } else if (response && response.status === 'error') {
                    $messages.html('<div class="alert alert-danger" role="alert">' + (response.message || 'Erreur inconnue.') + '</div>');
                } else {
                    $messages.html('<div class="alert alert-danger" role="alert">Réponse invalide du serveur.</div>');
                }
            },



            error: function (xhr, status, error) {
                console.error('AJAX Error:', {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    responseText: xhr.responseText,
                    error: error
                });
                let errorMessage = 'Erreur lors de l\'envoi. Veuillez réessayer.';
                if (xhr.status === 404) {
                    errorMessage = 'Page non trouvée. Vérifiez l\'URL du serveur.';
                } else if (xhr.status === 500) {
                    errorMessage = 'Erreur interne du serveur. Contactez l\'administrateur.';
                } else if (xhr.responseText) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        errorMessage = response.message || errorMessage;
                    } catch (e) {
                        errorMessage += ' (Erreur parsing JSON: ' + e.message + ') ';
                        errorMessage += 'Détails : ' + escapeHtml(xhr.responseText.substring(0, 100));
                    }
                }
                $messages.html('<div class="alert alert-danger" role="alert">' + errorMessage + '</div>');
            },
            complete: function () {
                $submitBtn.prop('disabled', false).text('Envoyer');
            }
        });
    });
};