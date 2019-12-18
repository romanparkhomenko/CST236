<?php
class Review {

    // DB connection
    private $conn;

    // Object Props
    public $id;
    public $products_id;
    public $users_id;
    public $review;
    public $stars;
    public $created;

    // Constructor with DB connection
    public function __construct($db){
        $this->conn = $db;
    }

    function create($conn) {
        // Sanitize values
        $this->products_id = htmlspecialchars(strip_tags($this->products_id));
        $this->users_id = htmlspecialchars(strip_tags($this->users_id));
        $this->review = htmlspecialchars(strip_tags($this->review));
        $this->stars = htmlspecialchars(strip_tags($this->stars));

        $query = "INSERT INTO reviews (`products_id`, `users_id`, `review`, `stars`, `created`) VALUES ('$this->products_id', '$this->users_id', '$this->review', '$this->stars', now())";

        if (mysqli_query($conn, $query)) {
            return true;
        }

        return false;
    }

    function updateReviewedProduct($users_id, $products_id) {
        $query = "UPDATE orderdetails 
                  INNER JOIN orders ON orderdetails.orders_id = orders.id
                  SET review_left=1 
                  WHERE orderdetails.products_id='$products_id' AND orders.users_id='$users_id'";

        if (mysqli_query($this->conn, $query)) {
            return true;
        }

        return false;
    }

    public function readProductReviews($products_id) {
//        $query = "SELECT * FROM reviews WHERE products_id = '$products_id'";
        $query = "SELECT reviews.id AS id, reviews.stars AS stars, reviews.review AS review, users.username AS username, reviews.created AS review_date
                  FROM ( ( reviews
                  INNER JOIN users ON users.id = reviews.users_id )
                  INNER JOIN products ON reviews.products_id = products.id ) 
                  WHERE products.id = '$products_id'";

        return $result = $this->conn->query($query);
    }

}
?>
