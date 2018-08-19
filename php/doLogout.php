<?php
  $_SESSION["user_id"] = "";
  $_SESSION["user_name"] = "";
  session_destroy();

  header("location: index.php");
?>
