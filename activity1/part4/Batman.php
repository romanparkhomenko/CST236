<?php
require_once 'SuperHero.php';

class Batman extends SuperHero {

    function __construct() {
        $health = rand(1, 1000);
        parent::__construct("Batman", $health);
    }
}

