<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/product.php';

$database = new Database();
$db = $database->getConnection();

$product = new Product($db);

// Get Posted Data and validate it's not empty.
$data = json_decode(file_get_contents("php://input"));
$isDataValid = !empty($data->name) && !empty($data->price) && !empty($data->description) && !empty($data->category_id);


// If valid, create product.
if ($isDataValid) {
    $product->name = $data->name;
    $product->price = $data->price;
    $product->description = $data->description;
    $product->category_id = $data->category_id;

    // create the product
    if ($product->create()) {
        http_response_code(200);
        echo json_encode(array("message" => "Product was created."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create product."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
}

?>
