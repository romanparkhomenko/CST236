<?php
require_once 'SuperHero.php';

class Superman extends SuperHero {

    function __construct() {
        $health = rand(1, 1000);
        parent::__construct("Superman", $health);
    }
}

