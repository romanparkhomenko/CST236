<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/core.php';
include_once '../shared/utilities.php';
include_once '../config/database.php';
include_once '../objects/product.php';

// utilities
$utilities = new Utilities();

// Create new product object and DB connection
$database = new Database();
$db = $database->getConnection();

$product = new Product($db);
$result = $product->readPaging($from_record_num, $records_per_page);


if ($result->num_rows > 0){
    $products_arr = array();
    $products_arr["records"] = array();
    $products_arr["paging"] = array();

    while($row = $result->fetch_assoc()) {
        $product_item = array(
            "id" => $row['id'],
            "name" => $row['name'],
            "description" => html_entity_decode($row['description']),
            "price" => $row['price'],
            "category_id" => $row['category_id'],
            "category_name" => $row['category_name']
        );

        array_push($products_arr["records"], $product_item);
    }


    $total_rows = $product->count();
    $page_url = "{$home_url}product/read_paging.php?";
    $paging = $utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
    $products_arr["paging"] = $paging;

    http_response_code(200);
    echo json_encode($products_arr);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No products found.")
    );
}
?>
