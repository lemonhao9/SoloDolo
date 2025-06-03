<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

// Enable error logging instead of displaying errors
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');

// Require dependencies
require_once 'vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Set the correct Content-Type header for JSON
header('Content-Type: application/json; charset=UTF-8');

// Initialize response array
$response = ["status" => "error", "message" => "Une erreur est survenue."];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize and validate input
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    if ($email && $subject && $message) {
        try {
            $mail = new PHPMailer(true);
            // SMTP Configuration
            $mail->isSMTP();
            $mail->Host = $_ENV['SMTP_HOST'];
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['SMTP_USERNAME'];
            $mail->Password = $_ENV['SMTP_PASSWORD'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = (int)$_ENV['SMTP_PORT'];

            // Email details
            $mail->setFrom($email);
            $mail->addAddress($_ENV['SMTP_USERNAME']);
            $mail->addReplyTo($email);

            // Content
            $mail->isHTML(false);
            $mail->Subject = $subject;
            $mail->Body = "Nouveau message de : $email\n\nSujet : $subject\n\nMessage :\n$message";

            // Envoie de l'email
            $mail->send();
            $response = ["status" => "success", "message" => "E-mail envoyé avec succès !"];
        } catch (Exception $e) {
            $response = ["status" => "error", "message" => "Erreur : {$mail->ErrorInfo}"];
        }
    } else {
        $response = ["status" => "error", "message" => "Tous les champs sont obligatoires."];
    }
} else {
    $response = ["status" => "error", "message" => "Méthode non autorisée."];
}

// Output the JSON response and exit immediately
echo json_encode($response, JSON_UNESCAPED_UNICODE);
exit;