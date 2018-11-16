<?php
    if(empty($_GET["clado_id"])){
		header("location: home.php?pag=inicio");

    }
    
    $clado_id = $_GET['clado_id'];
    $clado_id = addslashes($clado_id);
    
    $acoes = $con->reportCladogram($clado_id);

    echo "<div class='report_div'>";

        foreach($acoes as $value){
            $user_name = $con->searchUser($value['user_id']);
            $user_name = $user_name['user_name'];

            $tipo_acao = $value['actions_type'];

            $datetime = $value['actions_datetime'];
            $date = substr($datetime, 0, 10);
            $time = substr($datetime, 10);
            $horario = date('H:i:s', strtotime($time))." do dia ".date('d/m/Y', strtotime($date));
            
            //var_dump( $value);

            if($tipo_acao == 'Adicionou'){
                $filo_ancestral = $value['actions_oldname'];
                $categoria_filoAncestral = $value['actions_oldcategory'];

                if($categoria_filoAncestral == ""){
                    $categoria_filoAncestral = "Filo Inicial";
                }

                $filo_adicionado = $value['actions_newname'];
                $categoria_filoAdd = $value['actions_newcategory'];

                echo "<p class='report_p'>$user_name $tipo_acao ao filo $filo_ancestral($categoria_filoAncestral) 
                        o filo $filo_adicionado($categoria_filoAdd) às $horario</p>";

            } else if($tipo_acao == 'Editou'){
                $oldname = $value['actions_oldname'];
                $oldcategory = $value['actions_oldcategory'];

                $newname = $value['actions_newname'];
                $newcategory = $value['actions_newcategory'];

                echo "<p class='report_p'>$user_name $tipo_acao o filo $oldname($oldcategory) para
                        $newname($newcategory) às $horario</p>";

            } else if($tipo_acao == 'Excluiu'){
                $name = $value['actions_oldname'];
                $category = $value['actions_oldcategory'];

                echo "<p class='report_p'>$user_name $tipo_acao o filo $name($category) às $horario</p>";

            }
        }

    echo "</div>";
?>
