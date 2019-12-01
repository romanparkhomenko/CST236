<?php
session_start();

if (!isset($_SESSION['username'])) {
    $_SESSION['msg'] = "You must log in first";
    header('location: login.php');
} else {
    header('location: home.php');
}

if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['username']);
    header("location: login.php");
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
<div class="app-wrapper">
    <link rel="stylesheet" href="/store/app/assets/css/app.css">
    <script type="text/javascript">
        const userData = JSON.parse('<?= getUserData($username); ?>');
        const myApp = userData[0];
    </script>
    <!--REACT APP-->
    <div id="app"></div>

    <script type="text/javascript" src="/store/app/assets/bundle/main.bundle.js"></script>
</div>

</body>
</html>
