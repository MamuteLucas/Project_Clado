<?php
  if(empty($_POST["email"])){
    header("location: ../index.php?pag=inicio");
  } else{
    require("connect.php");

    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM user WHERE User_email = '$email' and User_senha = '$password'";
    $result = mysqli_query($con, $sql);
    $result = mysqli_num_rows($result);

    echo $result;
  }
?>
