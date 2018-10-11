<?php
    session_start();
    $user_id = $_SESSION["user_id"];

    $clado_id = $_POST["clado_id"];
    $clado_id = addslashes($clado_id);

    include("connect.php");
    $con = new connect();

    $con->deleteCladogram($user_id, $clado_id);

    clearstatcache();
?>