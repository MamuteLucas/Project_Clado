<?php
  if(empty($_POST["email"])){
    header("location: ../index.php?pag=inicio");
  } else{
    require("connect.php");

    $email = $_POST["email"];

    $sql = "SELECT * FROM user WHERE User_email = '$email'";
    $result = mysqli_query($con, $sql);
    $result = mysqli_num_rows($result);

    if($result != 0){
      echo "Email já cadastrado";
    }
  }
?>
