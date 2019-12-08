<?php

// include database and object files
include_once '../config/database.php';
include_once '../objects/order.php';
include_once '../objects/product.php';

class OrdersBusinessService {

    function getOrderDetails($order_id) {
        $database = new Database();
        $db = $database->getConnection();

        $orderItemService = new Order($db);
        $orderDetails = $orderItemService->readUserOrderItems($order_id);

        $db->close();
        return $orderDetails;
    }

    function checkQuantities($orderDetails, $order_id, $cart) {
        $database = new Database();
        $db = $database->getConnection();

        $orderService = new Order($db);

        $quantitySuccess = '';

        $orders_arr = array();
        if ($orderDetails->num_rows > 0) {
            while($row = $orderDetails->fetch_assoc()) {
                $order_item = array(
                    "id" => $row['id'],
                    "orders_id" => $row['orders_id'],
                    "products_id" => $row['products_id'],
                    "quantity" => $row['quantity'],
                    "price" => $row['price'],
                    "description" => $row['description'],
                );
                array_push($orders_arr, $order_item);
            }
        } else {
            return false;
        }

        foreach ($orders_arr as $key=>$item) {
            $prevItem = intval($key);
            $newItem = $cart[$prevItem];

            if ($item['quantity'] != $newItem->quantity) {
                $quantitySuccess = $orderService->updateQuantity($order_id, $newItem->products_id, $newItem->quantity);
            } else {
                $quantitySuccess = true;
            }

            if ($quantitySuccess == false) {
                break;
            }
        }

        $db->close();
        return $quantitySuccess;
    }

    function checkoutAndUpdate($order_id, $user_id, $cart) {
        $db = new Database();
        $conn = $db->getConnection();

        $conn->autocommit(false);
        $conn->begin_transaction();

        $existingOrderDetails = $this->getOrderDetails($order_id);
        $quantitySuccess = $this->checkQuantities($existingOrderDetails, $order_id, $cart);

        $order = new Order($conn);
        $order->orders_id = $order_id;
        $order->users_id = $user_id;

        $orderSuccess = $order->checkout($conn, $order_id, $user_id);

        if ($orderSuccess && $quantitySuccess) {
            $conn->commit();
            $order->createNewOrder($user_id);
        } else {
            $conn->rollback();
        }

        $conn->close();

        return ($orderSuccess && $quantitySuccess);
    }

}
