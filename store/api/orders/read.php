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
$order->users_id = isset($_GET['user']) ? $_GET['user'] : die();

// Read user orders
$result = $order->readUserOrders($_GET['user']);

// Add results to products array.
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $order_item = array(
            "id" => $row['id'],
            "created" => $row['created'],
            "users_id" => $row['users_id'],
            "fulfilled" => $row['fulfilled']
        );

        array_push($orders_arr, $order_item);
    }

    // Set 200 response and echo array
    http_response_code(200);
    echo json_encode($orders_arr);

    // Close connection
    $db->close();

} else {
    // If no orders found, create a new order/"cart" for user.
    if ($order->createNewOrder($_GET['user'])) {
        // Read updated order
        $newResult = $order->readUserOrders($_GET['user']);
        while($newRow = $newResult->fetch_assoc()) {
            $order_item = array(
                "id" => $newRow['id'],
                "created" => $newRow['created'],
                "users_id" => $newRow['users_id'],
                "fulfilled" => $newRow['fulfilled']
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
        echo json_encode(array("message" => "Unable to create order."));
    }
}

?>
