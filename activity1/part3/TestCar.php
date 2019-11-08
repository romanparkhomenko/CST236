<?php
require_once 'Car.php';

$car = new Car();

$car->addEngine();
$car->addTires();
$car->startCar();
$car->inflateTires();
$car->startCar();
$car->driveCar();
$car->driveCar();
$car->stopCar();

?>
