<?php
require_once 'Batman.php';
require_once 'Superman.php';

$batman = new Batman();
$superman = new Superman();

echo "Batman's starting HP: " . $batman->determineHealth(0) . '<br>';
echo "Superman's starting HP: " . $superman->determineHealth(0) . '<br><br>';

while(!$batman->isDead() && !$superman->isDead()) {
    $batmanDamage = $batman->attack();
    $supermanDamage = $superman->attack();

    $batmanHealth = $batman->determineHealth($supermanDamage);
    $supermanHealth = $superman->determineHealth($batmanDamage);

    // Superman attacks first.
    echo "Superman hits Batman for " . $supermanDamage . "HP. (Batman Total HP: ". $batmanHealth .")<br>";

    // Batman attacks second.
    echo "Batman hits Superman for " . $batmanDamage . "HP. (Superman Total HP: ". $supermanHealth .")<br>";
}

if ($batman->isDead()) {
    echo "Batman is Dead";
} else {
    echo "Superman is Dead";
}

?>
