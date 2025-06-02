<?php
use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    $subject = htmlspecialchars(strip_tags($_POST['subject']));
    $message = htmlspecialchars(strip_tags($_POST['message']));

    if (!empty($email) && !empty($subject) && !empty($message)) {
        $mail = new PHPMailer(true);
        try {
            // Configuration du serveur SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // Par exemple, pour Gmail
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['SMTP_USERNAME'];//variable stockée dans le .env pour + sécurité
            $mail->Password = $_ENV['SMTP_PASSWORD']; //variable stockée dans le .env pour + sécurité
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Destinataire
            $mail->setFrom($email);
            $mail->addAddress('leohamon9@gmail.com');
            $mail->addReplyTo($email);

            // Contenu de l'e-mail
            $mail->isHTML(false);
            $mail->Subject = $subject;
            $mail->Body = "Nouveau message de : $email\n\nSujet : $subject\n\nMessage :\n$message";

            // Envoyer
            $mail->send();
            echo json_encode(["status" => "success", "message" => "E-mail envoyé avec succès !"]);
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => "Erreur : {$mail->ErrorInfo}"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Tous les champs sont obligatoires."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée."]);
}
header ("Location: /cv");
exit;