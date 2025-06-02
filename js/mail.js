// $(document).ready(function() {
//     console.log('Script loaded and ready');
//     console.log('jQuery version:', $.fn.jquery);

//     if ($('#contactForm').length && $('#sendbtn').length) {
//         console.log('Form and button found in DOM');

//         $('#contactForm').on('submit', function(e) {
//             e.preventDefault();
//             console.log('Form submit event intercepted');

//             let formData = $(this).serialize();

//             $.ajax({
//                 url: './send_mail.php',
//                 type: 'POST',
//                 data: formData,
//                 dataType: 'json',
//                 success: function(response) {
//                     console.log('AJAX Success:', response);
//                     if (response && typeof response === 'object' && response.status) {
//                         $('#form-messages').html(
//                             `<div class="alert alert-${response.status === 'success' ? 'success' : 'danger'} alert-dismissible fade show" role="alert">
//                                 ${response.message}
//                                 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//                             </div>`
//                         );
//                         if (response.status === 'success') {
//                             $('#contactForm')[0].reset();
//                             setTimeout(function() {
//                                 $('#contactModal').modal('hide');
//                                 $('#form-messages').empty();
//                             }, 2000);
//                         }
//                     } else {
//                         $('#form-messages').html(
//                             '<div class="alert alert-danger alert-dismissible fade show" role="alert">Réponse inattendue du serveur.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
//                         );
//                     }
//                 },
//                 error: function(xhr, status, error) {
//                     console.log('AJAX Error:', status, error);
//                     $('#form-messages').html(
//                         '<div class="alert alert-danger alert-dismissible fade show" role="alert">Une erreur est survenue. Veuillez réessayer.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
//                     );
//                 }
//             });
//         });

//         $('#sendbtn').on('click', function() {
//             console.log('Send button clicked');
//             $('#contactForm').trigger('submit');
//         });
//     } else {
//         console.log('Form or button not found in DOM');
//     }
// });

$(document).ready(function() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        const $form = $(this);
        const $messages = $('#form-messages');
        const $submitBtn = $('#sendbtn');

        // Disable button to prevent multiple submissions
        $submitBtn.prop('disabled', true).text('Envoi en cours...');

        $.ajax({
            url: $form.attr('action'),
            method: $form.attr('method'),
            data: $form.serialize(),
            dataType: 'json',
            success: function(response) {
                // Clear previous messages
                $messages.empty();
                
                if (response.status === 'success') {
                    $messages.html('<div class="alert alert-success" role="alert">' + response.message + '</div>');
                    $form[0].reset(); // Reset form
                } else {
                    $messages.html('<div class="alert alert-danger" role="alert">' + response.message + '</div>');
                }
            },
            error: function() {
                $messages.html('<div class="alert alert-danger" role="alert">Erreur lors de l\'envoi. Veuillez réessayer.</div>');
            },
            complete: function() {
                // Re-enable button
                $submitBtn.prop('disabled', false).text('Envoyer');
            }
        });
    });
});