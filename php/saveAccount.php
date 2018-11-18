<?php
  if(!empty($_POST["config_name"])){
    $name = $_POST["config_name"];
    $name = addslashes($name);
    $email = $_POST["config_email"];
    $email = addslashes($email);

    session_start();

    require("connect.php");

    $con = new connect();
    $con->saveAccount_nameEmail($_SESSION["user_id"], $name, $email);

    $_SESSION["user_name"] = $name;
    $_SESSION["user_email"] = $email;

    if(!empty($_POST["config_newPassword"])){
      $newPassword = $_POST["config_newPassword"];
      $newPassword = hash("sha512", $newPassword);

      $con->saveAccount_password($_SESSION["user_id"], $newPassword);
    }

    $_SESSION["result"] = "Dados salvos com sucesso";
    $_SESSION["alert_class"] = "alert-success";

    echo "<script> location.replace('../home.php?pag=conta'); </script>";
  }
?>
