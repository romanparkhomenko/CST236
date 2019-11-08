<?php

// REGISTER USER
if (isset($_POST['register_user'])) {
    // Receive all input values from the registration form
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $email = mysqli_real_escape_string($db, $_POST['email']);
    $password_1 = mysqli_real_escape_string($db, $_POST['password_1']);
    $password_2 = mysqli_real_escape_string($db, $_POST['password_2']);
    $firstname = mysqli_real_escape_string($db, $_POST['firstname']);
    $lastname = mysqli_real_escape_string($db, $_POST['lastname']);
    $middlename = mysqli_real_escape_string($db, $_POST['middlename']);
    $nickname = mysqli_real_escape_string($db, $_POST['nickname']);
    $address1 = mysqli_real_escape_string($db, $_POST['address1']);
    $address2 = mysqli_real_escape_string($db, $_POST['address2']);
    $city = mysqli_real_escape_string($db, $_POST['city']);
    $state = mysqli_real_escape_string($db, $_POST['state']);
    $zipcode = mysqli_real_escape_string($db, $_POST['zipcode']);


    //Validate form input.
    if (empty($username)) { array_push($errors, "Username is required"); }
    if (empty($email)) { array_push($errors, "Email is required"); }
    if (empty($password_1)) { array_push($errors, "Password is required"); }
    if (empty($firstname)) { array_push($errors, "First Name is required"); }
    if (empty($lastname)) { array_push($errors, "Last Name is required"); }
    if ($password_1 != $password_2) {
        array_push($errors, "The two passwords do not match");
    }

    // Make sure username or email does not already exist in DB.
    $user_check_query = "SELECT * FROM users WHERE username='$username' OR email='$email' LIMIT 1";
    $result = mysqli_query($db, $user_check_query);
    $user = mysqli_fetch_assoc($result);

    // if user does exists, print error message.
    if ($user) {
        if ($user['username'] === $username) {
            array_push($errors, "Username already exists");
        }

        if ($user['email'] === $email) {
            array_push($errors, "Email already exists");
        }
    }

    // If there are no errors, register user.
    if (count($errors) == 0) {
        //encrypt the password before saving in the database
        $password = md5($password_1);

        $query = "INSERT INTO `users` (`username`, `email`, `password`, `firstname`, `lastname`, `middlename`, `nickname`, `address1`, `address2`, `city`, `state`, `zipcode`) 
  			  VALUES('$username', '$email', '$password', '$firstname', '$lastname', '$middlename', '$nickname', '$address1', '$address2', '$city', '$state', '$zipcode')";
        mysqli_query($db, $query);
        $_SESSION['username'] = $username;
        $_SESSION['success'] = "You are now logged in";
        header('location: index.php');
    }
}
