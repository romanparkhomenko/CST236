<?php
session_start();

// Constants for DB Connection
//DEFINE('DB_USERNAME', 'root');
//DEFINE('DB_PASSWORD', 'root');
//DEFINE('DB_HOST', 'localhost');
//DEFINE('DB_DATABASE', 'store');

DEFINE('DB_USERNAME', 'oypfg1lac0ptb6a3');
DEFINE('DB_PASSWORD', 'spk5blfn1jaukmws');
DEFINE('DB_HOST', 'umabrisfx8afs3ja.cbetxkdyhwsb.us-east-1.rds.amazonaws.com');
DEFINE('DB_DATABASE', 'ul7q3uvh6zhlma6g');

// Initialize Variables
$errors = array();

// Connect To Store DB
$db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

// Validate Connection
if (mysqli_connect_error()) {
    die('Connect Error ('.mysqli_connect_errno().') '.mysqli_connect_error());
}

include "registrationHandler.php";
include 'loginHandler.php';

// Close Connection
$db -> close();
?>
