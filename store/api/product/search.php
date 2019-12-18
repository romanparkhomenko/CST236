<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/core.php';
include_once '../config/database.php';
include_once '../objects/product.php';

// Create new product object and DB connection
$database = new Database();
$db = $database->getConnection();

$product = new Product($db);
$products_arr = array();
$products_arr["records"] = array();

// Get Search keywords from request and perform search method
$keyword = isset($_GET["s"]) ? $_GET["s"] : die();

$result = $product->search($keyword);

// Add results to products array.
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $product_item = array(
            "id" => $row['id'],
            "name" => $row['name'],
            "description" => html_entity_decode($row['description']),
            "price" => $row['price'],
            "category_id" => $row['category_id'],
            "category_name" => $row['category_name'],
            "image_name" => $row['image_name']
        );

        array_push($products_arr['records'], $product_item);
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
