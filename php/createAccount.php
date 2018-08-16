<?php
  if(empty($_POST["reg_name"])){
    header("location: ../index.php?pag=inicio");
  } else{
    require("connect.php");

    $name = $_POST["reg_name"];
    $email = $_POST["reg_email"];
    $password = $_POST["reg_password"];

    $sql = "INSERT INTO user(User_nome, User_email, User_senha) VALUES('$name', '$email', '$password')";

    mysqli_query($con, $sql) or die("Falha ao inserir novo usuario");

    header("location: ../index.php?pag=inicio");
  }
?>
