<?php
  if(!empty($_POST["email"])){
    $email = $_POST["email"];
    $email = addslashes($email);

    session_start();
    if(!empty($_SESSION["user_email"])){
      if($email != $_SESSION["user_email"]){
        require("connect.php");

        $con = new connect();
        $nLinhas = $con->checkEmail($email);

        if($nLinhas != 0){
          echo "Email já cadastrado";
        }
      }
    }
  }
?>
