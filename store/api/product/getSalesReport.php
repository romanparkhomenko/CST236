<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../services/SalesReportService.php';

$service = new SalesReportService();

// Ensure date parameters are present.
$date1 = isset($_GET['date1']) ? $_GET['date1'] : die();
$date2 = isset($_GET['date2']) ? $_GET['date2'] : die();

// Read the product details
$report = $service->getFullfilledOrders($date1, $date2);

if ($report != null) {
    // Set OK response and return JSON
    http_response_code(200);
    echo json_encode($report, JSON_PRETTY_PRINT);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Report cannot be generated."));
}

?>
