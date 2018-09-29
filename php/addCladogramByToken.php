<?php
    $user_id = $_SESSION["user_id"];
    $token = $_GET["token"];
    $token = addslashes($token);

    $_SESSION["result"] = $con->addCladogram($user_id, $token);

    header("Location: home.php?pag=inicio");
?>