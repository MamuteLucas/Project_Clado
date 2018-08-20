<?php
  $_SESSION["user_id"] = "";
  $_SESSION["user_name"] = "";
  $_SESSION["user_email"] = "";
  session_destroy();

  header("location: index.php");
?>
