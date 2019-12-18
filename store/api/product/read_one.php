<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/product.php';

// Create new product object and DB connection
$database = new Database();
$db = $database->getConnection();

$product = new Product($db);

// Get the ID Number of the requested product from the request,
// if it's missing, kill the connection.
$product->id = isset($_GET['id']) ? $_GET['id'] : die();

// Read the product details
$product->readOne($_GET['id']);

if ($product->name != null) {
    // create array
    $product_arr = array(
        "id" =>  $product->id,
        "name" => $product->name,
        "description" => $product->description,
        "price" => $product->price,
        "category_id" => $product->category_id,
        "category_name" => $product->category_name,
        "image_name" => $product->imageName,

    );

    // Set OK response and return JSON
    http_response_code(200);
    echo json_encode($product_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Product does not exist."));
}

?>
