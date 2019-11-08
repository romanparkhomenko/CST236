<?php

class Car {
    private $tires;
    private $engine;
    private $speed;

    public function __construct() {
        echo "Car created. Add an engine and tires.<br>";
    }

    public function addEngine() {
        $this->engine = new Engine();
    }

    public function addTires() {
        $this->tires = new Tires();
    }

    public function startCar() {
        $engineState = $this->engine->getEngineState();
        $tirePressure = $this->tires->getTirePressure();
        if ($tirePressure >= 32) {
            if ($engineState == false) {
                $this->engine->start();
            } else {
                echo "Car already started.<br>";
            }
        } else {
            echo "Your tires are at: " . $tirePressure . " PSI. Please inflate them before starting the car.<br>";
        }
    }

    public function stopCar() {
        $engineState = $this->engine->getEngineState();
        if ($engineState) {
            $this->engine->stop();
        } else {
            echo "Car already stopped.<br>";
        }
    }

    public function inflateTires() {
        $tirePressure = $this->tires->getTirePressure();
        if ($tirePressure < 32) {
            $this->tires->inflateTires();
        } else {
            echo "Tire pressure already at 32 PSI.<br>";
        }
    }

    public function driveCar() {
        $this->speed = rand(1, 60);
        echo "The car is now driving at " . $this->speed . " MPH.<br>";
    }

}

class Engine {
    private $started = false;

    public function __construct() {
        echo "Engine added to car. It's currently turned off. <br>";
    }

    public function start() {
        $this->started = true;
        echo "Engine has been started.<br>";
    }

    public function stop() {
        $this->started = false;
        echo "Engine has been stopped.<br>";
    }

    public function getEngineState() {
        return $this->started;
    }
}

class Tires {
    private $psi = 30;

    public function __construct() {
        echo "4 tires with 30 PSI have been added to car. <br>";
    }

    public function inflateTires() {
        $this->psi = 32;
        echo "Tires have been inflated to 32 PSI.<br>";
    }

    public function getTirePressure() {
        return $this->psi;
    }
}
