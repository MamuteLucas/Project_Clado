<?php
    if(!empty($_POST['actions'])){
        require("connect.php");
        
        $con = new connect();
        
        $actions = $_POST['actions'];
        $user_logged = $_POST['user_logged'];
        $clado_id = $_POST['clado_id'];

        if(!empty($actions[0])){
            foreach($actions[0] as $value){
                $old_name = addslashes($value[0]);
                $old_category = addslashes($value[1]);
                $new_name = addslashes($value[2]);
                $new_category = addslashes($value[3]);

                $con->saveActions_add($old_name, $old_category, $new_name, $new_category, $user_logged, $clado_id);
            }

        }
        
        if(!empty($actions[1])){
            foreach($actions[1] as $value){
                $old_name = addslashes($value[0]);
                $old_category = addslashes($value[1]);
                $new_name = addslashes($value[2]);
                $new_category = addslashes($value[3]);
                $creator = addslashes($value[4]);

                $con->saveActions_edit($old_name, $old_category, $new_name, $new_category, $creator,
                        $user_logged, $clado_id);

            }

        }
        
        if(!empty($actions[2])){
            foreach($actions[2] as $value){
                $old_name = addslashes($value[0]);
                $old_category = addslashes($value[1]);
                $creator = addslashes($value[2]);

                $con->saveAtions_del($old_name, $old_category, $creator, $user_logged, $clado_id);
            }

        }
    }
?>