<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';

// Create new user object and DB connection
$database = new Database();
$db = $database->getConnection();

$user = new User($db);
$users_arr = array();

// Make query with user read function.
$result = $user->read();

// Add results to users array.
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $user_item = array(
            "id" => $row['id'],
            "admin" => $row['admin'],
            "username" => $row['username'],
            "email" => $row['email'],
            "firstname" => $row['firstname'],
            "lastname" => $row['lastname'],
            "middlename" => $row['middlename'],
            "nickname" => $row['nickname'],
            "address1" => $row['address1'],
            "address2" => $row['address2'],
            "city" => $row['city'],
            "state" => $row['state'],
            "zipcode" => $row['zipcode'],
        );

        array_push($users_arr, $user_item);
    }

    // Set 200 response and echo array
    http_response_code(200);
    echo json_encode($users_arr);

    // Close connection
    $db->close();
} else {
    // Set 404 response and echo error if no user found
    http_response_code(404);
    echo json_encode(
        array("message" => "No users found.")
    );
}

?>
