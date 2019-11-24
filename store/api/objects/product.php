<?php
class Product {

    // DB connection
    private $conn;

    // Object Props
    public $id;
    public $name;
    public $description;
    public $price;
    public $category_id;
    public $category_name;
    public $created;

    // Constructor with DB connection
    public function __construct($db){
        $this->conn = $db;
    }

    public function read(){
        $query = "SELECT
                c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
            FROM
                products p
                LEFT JOIN
                    categories c
                        ON p.category_id = c.id
            ORDER BY
                p.id ASC";

        return $result = $this->conn->query($query);
    }

    public function readOne($id){
        $query = "SELECT
                c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
            FROM
                products p
                LEFT JOIN
                    categories c
                        ON p.category_id = c.id
            WHERE
                p.id = '$id'
            LIMIT
                0,1";

        $result = $this->conn->query($query);

        $row = $result->fetch_assoc();


        // set values to object properties
        $this->name = $row['name'];
        $this->price = $row['price'];
        $this->description = $row['description'];
        $this->category_id = $row['category_id'];
        $this->category_name = $row['category_name'];
    }

    public function search($keyword){
        // Sanitize keywords
        $keyword = htmlspecialchars(strip_tags($keyword));
        $keyword = "%" . $keyword . "%";
        $query = "SELECT c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
            FROM products p
                LEFT JOIN
                    categories c
                        ON p.category_id = c.id
            WHERE
                p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ?
            ORDER BY
                p.id ASC";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param('sss', $keyword, $keyword, $keyword);
        $stmt->execute();
        return $stmt->get_result();
    }

    public function readPaging($from_record_num, $records_per_page){
        $query = "SELECT
                c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
            FROM
                products p
                LEFT JOIN
                    categories c
                        ON p.category_id = c.id
            ORDER BY p.created DESC
            LIMIT ?, ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param('ii', $from_record_num, $records_per_page);
        $stmt->execute();

        return $stmt->get_result();
    }

    public function count(){
        $query = "SELECT COUNT(*) as total_rows FROM products";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        return $row['total_rows'];
    }

    function create() {
        // Sanitize values
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->category_id = htmlspecialchars(strip_tags($this->category_id));

        $query = "INSERT INTO products (`name`, `price`, `description`, `category_id`, `created`) VALUES ('$this->name', '$this->price', '$this->description', '$this->category_id', now())";

        if (mysqli_query($this->conn, $query)) {
            return true;
        }

        return false;
    }

    function update() {
        // Sanitize values
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->category_id = htmlspecialchars(strip_tags($this->category_id));

        $query = "UPDATE products SET name='$this->name', price='$this->price', description='$this->description', category_id='$this->category_id', modified=now() WHERE id='$this->id'";

        if (mysqli_query($this->conn, $query)) {
            return true;
        }

        return false;
    }

    function delete() {
        // Sanitize values
        $this->id = htmlspecialchars(strip_tags($this->id));

        $query = "DELETE FROM `products` WHERE `products`.`id`='$this->id'";

        if (mysqli_query($this->conn, $query)) {
            return true;
        }

        return false;
    }

}
?>
