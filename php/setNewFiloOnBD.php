<?php
    $filo_name = $_POST["filo_name"];
    $user_id =  $_POST["user_id"];
    $clado_id = $_POST["clado_id"];

    include("connect.php");

    $con = new connect();
    echo $con->setNewFiloOnBD($filo_name, $user_id, $clado_id);
?>