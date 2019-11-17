<?php

/** Class to connect to database */
class Database {

    private $host = "localhost";
    private $username = "root";
    private $password = "root";
    private $db_name = "store";
    public $conn;

    // Function to get DB connection
    public function getConnection() {
        $this->conn = null;

        // Connect To Store DB
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);

        // Validate Connection
        if (mysqli_connect_error()) {
            die('Connection Error ('.mysqli_connect_errno().') '.mysqli_connect_error());
        }

        return $this->conn;
    }
}
?>
