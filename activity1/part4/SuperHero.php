<?php

class SuperHero {
    private $name;
    private $health;
    private $isDead;

    function __construct($name, $health) {
        $this->name = $name;
        $this->health = $health;
        $this->isDead = false;
    }

    function attack() {
       $attack = rand(1,10);
       return $attack;
    }

    function determineHealth($getattack) {
        $this->health -= $getattack;
        return $this->health;
    }

    function isDead() {
        $this->isDead = $this->health <= 0 ? true : false;
        return $this->isDead;
    }
}

