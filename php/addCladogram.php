<?php
  session_start();
  $user_id = $_SESSION["user_id"];
  $email_userAdmin = $_POST["email_userAdmin"];
  $clado_name = $_POST["clado_name"];

  include("connect.php");

  $con = new connect();
  $result = $con->addCladogram($user_id, $email_userAdmin, $clado_name);

  echo $result;
?>
