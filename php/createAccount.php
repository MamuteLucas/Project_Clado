<?php
  if(!empty($_POST["reg_name"])){
    $name = $_POST["reg_name"];
    $name = addslashes($name);
    $email = $_POST["reg_email"];
    $email = addslashes($email);
    $password = $_POST["reg_password"];
    $password = hash("sha512", $password);

    require("connect.php");

    $con = new connect();
    $con->createAccount($name, $email, $password);

    header("location: ../index.php?pag=inicio");
  }
?>
