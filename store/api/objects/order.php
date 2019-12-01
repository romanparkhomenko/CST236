<?php
class Order {

    // DB connection
    private $conn;

    // Object Props
    public $id;
    public $created;
    public $users_id;
    public $fulfilled;
    public $orders_id;
    public $products_id;
    public $quantity;
    public $price;
    public $description;

    // Constructor with DB connection
    public function __construct($db) {
        $this->conn = $db;
    }

    // Read the users orders.
    public function readUserOrders($users_id) {
        $query = "SELECT * FROM orders WHERE users_id = '$users_id'";

        return $result = $this->conn->query($query);
    }

    function createNewOrder($users_id) {
        $query = "INSERT INTO orders (`created`, `users_id`, `fulfilled`) VALUES (now(), '$users_id', 0)";

        if (mysqli_query($this->conn, $query)) {
            return true;
        }

        return false;
    }

    function createOrderItem() {
        $query = "INSERT INTO orderdetails (`orders_id`, `products_id`, `quantity`, `price`, `description`) VALUES ('$this->orders_id', '$this->products_id', '$this->quantity', '$this->price', '$this->description')";

        if (mysqli_query($this->conn, $query)) {
            return true;
        }

        return false;
    }

    // Read the users orders.
    public function readUserOrderItems($orders_id) {
        $query = "SELECT * FROM orderdetails WHERE orders_id = '$orders_id'";

        return $result = $this->conn->query($query);
    }

    function checkout() {
        $query = "UPDATE orders SET fulfilled=1 WHERE id='$this->orders_id'";

        if (mysqli_query($this->conn, $query)) {
            $this->createNewOrder($this->users_id);
            return true;
        }

        return false;
    }

    function removeOrderItem() {

        $query = "DELETE FROM orderdetails WHERE orders_id ='$this->orders_id' AND products_id = '$this->products_id'";

        if (mysqli_query($this->conn, $query)) {
            return true;
        }

        return false;
    }


}
?>
