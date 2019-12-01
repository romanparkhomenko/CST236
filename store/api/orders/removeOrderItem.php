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

$database = new Database();
$db = $database->getConnection();

$order = new Order($db);

// Get Posted Data and validate it's not empty.
$data = json_decode(file_get_contents("php://input"));

$order->orders_id = $data->orders_id;
$order->products_id = $data->products_id;

// create the product
if ($order->removeOrderItem()) {
    http_response_code(200);
    echo json_encode(array("message" => "Product was deleted."));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to delete product."));
}

?>
