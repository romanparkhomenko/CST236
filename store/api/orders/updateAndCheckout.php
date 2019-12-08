<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../services/OrdersBusinessService.php';

// Create new product object and DB connection
$service = new OrdersBusinessService();

// Get Posted Data and validate it's not empty.
$data = json_decode(file_get_contents("php://input"));

$cart = $data->cart;

// create the product
if ($service->checkoutAndUpdate($data->orders_id, $data->users_id, $cart)) {
    http_response_code(200);
    echo json_encode(array("message" => "Success"));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to fulfill order."));
}

?>
