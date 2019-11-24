<?php

/** Class to connect to database */
class Database {

//    private $host = "localhost";
//    private $username = "root";
//    private $password = "root";
//    private $db_name = "store";

    private $host = "umabrisfx8afs3ja.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
    private $username = "oypfg1lac0ptb6a3";
    private $password = "spk5blfn1jaukmws";
    private $db_name = "ul7q3uvh6zhlma6g";
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
