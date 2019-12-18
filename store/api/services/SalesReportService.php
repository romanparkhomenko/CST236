<?php

// include database and object files
include_once '../config/database.php';
include_once '../objects/order.php';
include_once '../objects/product.php';

class SalesReportService {

    function getFullfilledOrders($date1, $date2) {
        $database = new Database();
        $db = $database->getConnection();

        $order = new Order($db);
        $fulfilledOrders = $order->readAllSoldProducts($date1, $date2);

        $orders_arr = array();
        if ($fulfilledOrders->num_rows > 0) {
            while($row = $fulfilledOrders->fetch_assoc()) {
                $order_item = array(
                    "id" => $row['products_id'],
                    "name" => $row['name'],
                    "total_quantity" => $row['total_quantity'],
                    "total_price" => $row['total_price'],
                    "stars" => $row['stars'],
                );
                array_push($orders_arr, $order_item);
            }
        } else {
            return null;
        }

        $db->close();
        return $orders_arr;
    }
}
