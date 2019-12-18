<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/review.php';

// Create new product object and DB connection
$database = new Database();
$db = $database->getConnection();

$review = new Review($db);
$reviews_arr = array();

// Get the ID Number of the requested product from the request,
// if it's missing, kill the connection.
$review->id = isset($_GET['id']) ? $_GET['id'] : die();

// Read the product details
$result = $review->readProductReviews($_GET['id']);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $reviews_item = array(
            "id" => $row['id'],
            "stars" => $row['stars'],
            "review" => html_entity_decode($row['review']),
            "username" => $row['username'],
            "review_date" => $row['review_date']
        );

        array_push($reviews_arr, $reviews_item);
    }

    // Set OK response and return JSON
    http_response_code(200);
    echo json_encode($reviews_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Product has no reviews"));
}

?>
