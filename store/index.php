<?php
session_start();

if (!isset($_SESSION['username'])) {
    $_SESSION['msg'] = "You must log in first";
    header('location: /store/login.php');
} else {
    header('location: /store/home.php');
}
if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['username']);
    header("location: /store/login.php");
}

// SHARED HEADER
include ("./handlers/dbConnection.php");
include_once ('./api/config/database.php');
require_once ("./assets/includes/sharedHeader.php");

// GET USER DATA
include "./handlers/getUserData.php";
$username = $_SESSION['username'];
?>

<body>

</body>
</html>
