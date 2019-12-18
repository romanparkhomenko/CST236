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

$target_dir = '../../images/' . $data->imageName;
$image = $data->image;
if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
    $image = substr($image, strpos($image, ',') + 1);
    $type = strtolower($type[1]); // jpg, png, gif

    if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
        throw new Exception('invalid image type');
    }

    $image = base64_decode($image);

    if ($data === false) {
        throw new Exception('base64_decode failed');
    }
} else {
    throw new Exception('did not match data URI with image data');
}

file_put_contents("{$target_dir}", $image);

$product->id = $data->id;
$product->name = $data->name;
$product->price = $data->price;
$product->description = $data->description;
$product->category_id = $data->category_id;
$product->imageName = $data->imageName;

// create the product
if ($product->update()) {
    http_response_code(200);
    echo json_encode(array("message" => "Product was updated."));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to update product."));
}

?>
