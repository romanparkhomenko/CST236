<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/product.php';

// Create new product object and DB connection
$database = new Database();
$db = $database->getConnection();

$product = new Product($db);
$products_arr = array();

// Make query with product read function.
$result = $product->read();

// Add results to products array.
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $product_item = array(
            "id" => $row['id'],
            "name" => $row['name'],
            "description" => html_entity_decode($row['description']),
            "price" => $row['price'],
            "category_id" => $row['category_id'],
            "category_name" => $row['category_name']
        );

        array_push($products_arr, $product_item);
    }

    // Set 200 response and echo array
    http_response_code(200);
    echo json_encode($products_arr);

    // Close connection
    $db->close();
} else {
    // Set 404 response and echo error if no products found
    http_response_code(404);
    echo json_encode(
        array("message" => "No products found.")
    );
}

?>
