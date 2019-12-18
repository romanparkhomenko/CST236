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

    // Read the users orders.
    public function readFulfilledOrders($date1, $date2) {
        $query = "SELECT * FROM orders WHERE fulfilled = 1 AND created BETWEEN '$date1' AND '$date2'";

        return $result = $this->conn->query($query);
    }

    public function readAllSoldProducts($date1, $date2) {
        $query = "SELECT orderdetails.products_id AS products_id, products.name, SUM(orderdetails.quantity) AS total_quantity, 
                    SUM(orderdetails.price) AS total_price, AVG(reviews.stars) AS stars
                  FROM ((( orderdetails 
                  INNER JOIN orders ON orders.id = orderdetails.orders_id ) 
                  INNER JOIN products ON orderdetails.products_id = products.id )
                  INNER JOIN reviews ON orderdetails.products_id = reviews.products_id ) 
                  WHERE orders.fulfilled = 1 
                  AND orders.created BETWEEN '$date1' AND '$date2' 
                  GROUP BY orderdetails.products_id 
                  ORDER BY total_quantity DESC";

        return $result = $this->conn->query($query);
    }

    public function readAllUserPurchases($users_id) {
        $query = "SELECT orderdetails.products_id AS products_id, products.name, SUM(orderdetails.quantity) AS total_quantity      
                  FROM ( ( orderdetails
                  INNER JOIN orders ON orders.id = orderdetails.orders_id )
                  INNER JOIN products ON orderdetails.products_id = products.id ) 
                  WHERE orders.fulfilled = 1 AND orderdetails.review_left = 0 AND orders.users_id = '$users_id'
                  GROUP BY orderdetails.products_id 
                  ORDER BY total_quantity DESC";

        return $result = $this->conn->query($query);
    }




    function createNewOrder($users_id) {
        $query = "INSERT INTO orders (`created`, `users_id`, `fulfilled`) VALUES (now(), '$users_id', 0)";

        if (mysqli_query($this->conn, $query)) {
            return true;
        }

        return false;
    }

    function createOrder($db, $users_id) {
        $query = "INSERT INTO orders (`created`, `users_id`, `fulfilled`) VALUES (now(), '$users_id', 0)";

        if (mysqli_query($db, $query)) {
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

    function checkout($db, $orders_id, $users_id) {
        $query = "UPDATE orders SET fulfilled=1 WHERE id='$orders_id'";

        if(mysqli_query($db, $query)) {
            $this->createOrder($db, $users_id);
            return true;
        }

        return false;
    }

    function updateQuantity($orders_id, $product_id, $quantity) {
        $query = "UPDATE orderdetails SET quantity='$quantity' WHERE orders_id='$orders_id' AND products_id='$product_id'";

        if (mysqli_query($this->conn, $query)) {
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
