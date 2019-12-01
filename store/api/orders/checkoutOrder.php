<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/order.php';

// Create new product object and DB connection
$database = new Database();
$db = $database->getConnection();

$order = new Order($db);
$orders_arr = array();

// Get Posted Data and validate it's not empty.
$data = json_decode(file_get_contents("php://input"));

// Get the ID Number of the requested user order from the request,
// if it's missing, kill the connection.
$order->orders_id = $data->orders_id;
$order->users_id = $data->users_id;

// create the product
if ($order->checkout()) {
    http_response_code(200);
    echo json_encode(array("message" => "Success"));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to fulfill order."));
}

?>
