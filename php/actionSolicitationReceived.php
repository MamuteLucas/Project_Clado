<?php
  $user_id = $_POST["user_id"];
  $clado_id = $_POST["clado_id"];
  $button_type = $_POST["button_type"];

  include("connect.php");

  $con = new connect();
  $con->actionSolicitationReceived($user_id, $clado_id, $button_type);
?>
