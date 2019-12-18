<?php
class User {

    // DB connection
    private $conn;

    // Object Props
    public $id;
    public $admin;
    public $username;
    public $email;
    public $password;
    public $firstname;
    public $lastname;
    public $middlename;
    public $nickname;
    public $address1;
    public $address2;
    public $city;
    public $state;
    public $zipcode;

    // Constructor with DB connection
    public function __construct($db){
        $this->conn = $db;
    }

    public function read(){
        $query = "SELECT * FROM users";

        return $result = $this->conn->query($query);
    }

    function update() {
        // Sanitize values
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->admin = htmlspecialchars(strip_tags($this->admin));
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = md5($this->password);
        $this->firstname = htmlspecialchars(strip_tags($this->firstname));
        $this->lastname = htmlspecialchars(strip_tags($this->lastname));

        $query = "UPDATE users SET admin='$this->admin', username='$this->username', email='$this->email', password='$this->password', firstname='$this->firstname', lastname='$this->lastname' WHERE id='$this->id'";

        if (mysqli_query($this->conn, $query)) {
            return true;
        }

        return false;
    }

    function create() {
        // Sanitize values
        $this->admin = htmlspecialchars(strip_tags($this->admin));
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = md5($this->password);
        $this->firstname = htmlspecialchars(strip_tags($this->firstname));
        $this->lastname = htmlspecialchars(strip_tags($this->lastname));

        $query = "INSERT INTO users (`admin`, `username`, `email`, `password`, `firstname`, `lastname`) VALUES ('$this->admin', '$this->username', '$this->email', '$this->password', '$this->firstname', '$this->lastname')";

        if (mysqli_query($this->conn, $query)) {
            return true;
        }

        return false;
    }

    function delete() {
        // Sanitize values
        $this->id = htmlspecialchars(strip_tags($this->id));

        $query = "DELETE FROM `users` WHERE `users`.`id`='$this->id'";

        if (mysqli_query($this->conn, $query)) {
            return true;
        }

        return false;
    }

}
?>
