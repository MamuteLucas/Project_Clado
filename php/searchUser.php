<?php
    if(!empty($_POST['creator'])){
        require("connect.php");

        $con = new Connect();
        $result = $con->searchUser($_POST['creator']);
        echo $result['user_name'];

        echo ";";

        $result = $con->searchUser($_POST['editor']);
        echo $result['user_name'];
    }
?>