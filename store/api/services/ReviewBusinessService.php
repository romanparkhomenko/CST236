<?php

// include database and object files
include_once '../config/database.php';
include_once '../objects/review.php';

class ReviewBusinessService {

    function updateOrderDetails($users_id, $products_id) {
        $database = new Database();
        $db = $database->getConnection();

        $review = new Review($db);
        $reviewDetails = $review->updateReviewedProduct($users_id, $products_id);

        $db->close();
        return $reviewDetails;
    }

    function reviewAndUpdate($products_id, $users_id, $review_message, $stars) {
        $db = new Database();
        $conn = $db->getConnection();

        $conn->autocommit(false);
        $conn->begin_transaction();

        $updateReviewDetails = $this->updateOrderDetails($users_id, $products_id);

        $review = new Review($conn);
        $review->products_id = $products_id;
        $review->users_id = $users_id;
        $review->review = $review_message;
        $review->stars = $stars;

        $reviewSuccess = $review->create($conn);

        if ($updateReviewDetails && $reviewSuccess) {
            $conn->commit();
        } else {
            $conn->rollback();
        }

        $conn->close();

        return ($updateReviewDetails && $reviewSuccess);
    }

}
