<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // ✅ Brevo SMTP settings
        $mail->isSMTP();
        $mail->Host       = 'smtp-relay.brevo.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@nilkanthholidays.in';   // ✅ Domain email
        $mail->Password   = 'RVUGsW02rDq3gHtX';           // ✅ Brevo API Key
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Sender & Receiver
        $mail->setFrom('info@nilkanthholidays.in', 'Nilkanth Holidays Website');
        $mail->addAddress('nilkanth22@gmail.com'); // ✅ Aapka Gmail jaha mail aayega

        // Email Content
        $mail->isHTML(true);
        $mail->Subject = '📩 New Contact Form Message';
        $mail->Body    = "
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Message:</strong><br>{$message}</p>
        ";
        $mail->AltBody = "Name: {$name}\nEmail: {$email}\nMessage:\n{$message}";

        $mail->send();
        header("Location: about.html?status=success");
        exit;
    } catch (Exception $e) {
        // Debug ke liye ↓
        // echo "Mailer Error: {$mail->ErrorInfo}";
        header("Location: about.html?status=error");
        exit;
    }
} else {
    echo "⚠️ Invalid request.";
}
?>
