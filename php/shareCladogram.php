<?php
    session_start();
    $user_id = $_SESSION["user_id"];
    $clado_id = $_POST["clado_id"];
    $clado_id = addslashes($clado_id);

    require("connect.php");

    $con = new connect();
    echo $con->shareCladogram($clado_id, $user_id);
?>