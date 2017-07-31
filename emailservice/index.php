<?php
require_once('../vendor/autoload.php');

if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message'])) {
  die('invalid request');
}

$settings = parse_ini_file('../config.ini', true);
$redirect = $settings['redirect'];
$smtp_setting = $settings['smtp_setting'];

// Create the Transport
$transport = (new Swift_SmtpTransport($smtp_setting['smtp_server'], $smtp_setting['smtp_port'], $smtp_setting['smtp_encryption']))
  ->setUsername($smtp_setting['smtp_username'])
  ->setPassword($smtp_setting['smtp_password'])
;

// Create the Mailer using your created Transport
$mailer = new Swift_Mailer($transport);

// Create a message
$message = (new Swift_Message('New Message from ' . $_POST['name']))
  ->setFrom([$smtp_setting['smtp_username'] => 'Tan He'])
  ->setTo([$smtp_setting['smtp_username'] => 'Tan He'])
  ->setBody(htmlspecialchars('Email address: ' . $_POST['email'])
    . "\n" . htmlspecialchars('Content: ' . $_POST['message']))
  ;

// Send the message
$result = $mailer->send($message);

if($result) {
  header("Location:" . $redirect['success']);
} else {
  header("Location:" . $redirect['error']);
}
exit;
