<?php
session_start();

if (!isset($_SESSION['username'])) {
    $_SESSION['msg'] = "You must log in first";
    header('location: login.php');
}
if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['username']);
    header("location: login.php");
}

// SHARED HEADER
include ("./handlers/dbConnection.php");
require_once ("./assets/includes/sharedHeader.php");

// GET USER DATA
include "./handlers/getUserData.php";
$username = $_SESSION['username'];
?>

<body>

<div class="wrapper">
    <!-- SIDE BAR -->
    <div class="sidebar">
        <?php include_once("./assets/includes/sidebar.php"); ?>
    </div>

    <!-- MAIN CONTENT -->
    <div class="homepage fluid-container">
        <div class="row justify-content-center align-items-start header-row">
            <div class="welcome col-sm-9">
                <h1>Welcome <strong><?php echo $_SESSION['username']; ?></strong></h1>
            </div>
            <div class="user-info col-sm-3">
                <details>
                    <summary>Your Information</summary>
                    <?php getUserData($username); ?>
                </details>
            </div>
        </div>
        <div class="row justify-content-center align-items-start">
            <div class="intro-div col-sm-9">
                <h1>This is where we're going to buy stuff!</h1>
            </div>
        </div>
    </div>

</div>

</body>
</html>
