<?php
  if(!empty($_POST["email"])){
    $email = $_POST["email"];
    $email = addslashes($email);
    $password = $_POST["password"];
    $password = hash("sha512", $password);

    require("connect.php");

    $con = new connect();
    $result = $con->doLogin($email, $password);
    $nLinhas = $result[0];

    if($nLinhas == 1){
      $user = $result[1];

      session_start();
      $_SESSION = "";
      $_SESSION["user_id"] = $user["user_id"];
      $_SESSION["user_name"] = $user["user_name"];
      $_SESSION["user_email"] = $user["user_email"];

    }

    echo $nLinhas;
  }
?>
