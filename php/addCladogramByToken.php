<?php
    $user_id = $_SESSION["user_id"];
    $token = $_GET["token"];
    $token = addslashes($token);

    $_SESSION["result"] = $con->addCladogram($user_id, $token);

    echo "<script> location.replace('home.php?pag=inicio'); </script>";
?>