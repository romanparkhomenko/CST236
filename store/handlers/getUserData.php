<?php
// required headers
//header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");

// include database and object files

function getUserData($username) {
    // Create DB connection
    $database = new Database();
    $db = $database->getConnection();

    $users = array();
    $query = "SELECT * FROM users WHERE username='$username'";
    $result = $db->query($query);

    // Add results to products array.
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $userInfo = array(
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
            $_SESSION['user_id'] = $row["id"];
            $_SESSION['username'] = $row["username"];

            array_push($users, $userInfo);
        }

        // Set 200 response and echo array
        http_response_code(200);
        echo json_encode($users);

        // Close connection
        $db->close();
    } else {
        // Set 404 response and echo error if no products found
        http_response_code(404);
        echo json_encode(
            array("message" => "No products found.")
        );
    }
}
