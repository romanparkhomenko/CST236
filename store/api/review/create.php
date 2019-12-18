<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
//include_once '../objects/review.php';
include_once '../services/ReviewBusinessService.php';

$review = new ReviewBusinessService($db);

// Get Posted Data and validate it's not empty.
$data = json_decode(file_get_contents("php://input"));
$isDataValid = !empty($data->products_id) && !empty($data->users_id) && !empty($data->review) && !empty($data->stars);

// If valid, create product.
if ($isDataValid) {

    // create the product
    if ($review->reviewAndUpdate($data->products_id, $data->users_id, $data->review, $data->stars)) {
        http_response_code(200);
        echo json_encode(array("message" => "Review was created. Thank you!"));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create review."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create review. Data is incomplete."));
}

?>
