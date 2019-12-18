<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/order.php';

// Create new product object and DB connection
$database = new Database();
$db = $database->getConnection();

$order = new Order($db);
$orders_arr = array();

// Get the ID Number of the requested user order from the request,
// if it's missing, kill the connection.
$users_id = isset($_GET['id']) ? $_GET['id'] : die();

// Read user orders
$result = $order->readAllUserPurchases($_GET['id']);

// Add results to products array.
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $order_item = array(
            "products_id" => $row['products_id'],
            "name" => $row['name'],
            "total_quantity" => $row['total_quantity'],
        );

        array_push($orders_arr, $order_item);
    }

    // Set 200 response and echo array
    http_response_code(200);
    echo json_encode($orders_arr);

    // Close connection
    $db->close();

} else {
    http_response_code(404);
    echo json_encode(array("message" => "No purchases found."));
}

?>
