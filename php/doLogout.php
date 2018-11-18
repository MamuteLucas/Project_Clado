<?php
  $_SESSION = "";
  session_destroy();

  echo "<script> location.replace('index.php'); </script>";
?>
