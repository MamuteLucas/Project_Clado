<?php
    session_start();
    $user_id = $_SESSION["user_id"];
    $clado_id = $_POST["clado_id"];

    include("connect.php");

    $con = new connect();
    $con->actionSolicitationSended($user_id, $clado_id);
?>