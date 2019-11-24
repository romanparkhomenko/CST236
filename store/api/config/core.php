<?php
// Error Reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

$home_url = "http://localhost/store/";

// Page parameter for pagination
$page = isset($_GET['page']) ? $_GET['page'] : 1;

// Records per page default
$records_per_page = 10;

// LIMIT parameter for pagination query.
$from_record_num = ($records_per_page * $page) - $records_per_page;
?>
