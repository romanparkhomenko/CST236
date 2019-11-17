<?php
class SecurityService {
    private $username;
    private $password;
    function __construct($u, $p){
        $this->username = $u;
        $this->password = $p;
    }
    public function AuthenticateUser() {
        require_once 'Database.php';
        $db = new Database();
        $conn = $db->getConnection();
        $stmt = "SELECT * FROM users WHERE username = 'roman' AND password = 12345 ";
        $result = mysqli_query($conn, $stmt);
        if ($this->username === "" && $this->password === "") {
            return false;
        }
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            return true;
        } else {
            return false;
        }
    }
}
?>
