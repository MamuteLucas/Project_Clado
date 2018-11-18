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
                $datetime = addslashes($value[4]);

                $con->saveActions_add($old_name, $old_category, $new_name, $new_category, $user_logged, $clado_id,
                    $datetime);
            }

        }
        
        if(!empty($actions[1])){
            foreach($actions[1] as $value){
                $old_name = addslashes($value[0]);
                $old_category = addslashes($value[1]);
                $new_name = addslashes($value[2]);
                $new_category = addslashes($value[3]);
                $creator = addslashes($value[4]);
                $datetime = addslashes($value[5]);

                $con->saveActions_edit($old_name, $old_category, $new_name, $new_category, $creator,
                        $user_logged, $clado_id, $datetime);

            }

        }
        
        if(!empty($actions[2])){
            foreach($actions[2] as $value){
                $old_name = addslashes($value[0]);
                $old_category = addslashes($value[1]);
                $creator = addslashes($value[2]);
                $datetime = addslashes($value[3]);

                $con->saveAtions_del($old_name, $old_category, $creator, $user_logged, $clado_id, $datetime);
            }

        }

        if(!empty($actions[3])){
            foreach($actions[3] as $value){
                $name = addslashes($value[0]);
                $category = addslashes($value[1]);
                $old_pname = addslashes($value[2]);
                $old_pcategory = addslashes($value[3]);
                $new_pname = addslashes($value[4]);
                $new_pcategory = addslashes($value[5]);
                $creator = addslashes($value[6]);
                $datetime = addslashes($value[7]);

                $con->saveActions_drag($name, $category, $old_pname, $old_pcategory, $new_pname, $new_pcategory,
                                            $creator, $user_logged, $clado_id, $datetime);
            }

        }
    }
?>