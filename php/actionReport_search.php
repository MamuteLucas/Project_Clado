<?php
    $user_id = $_POST['user_id'];
    $user_id = addslashes($user_id);

    $type_actions = $_POST['type_actions'];
    $type_actions = addslashes($type_actions);

    $dt_initial = $_POST['dt_initial'];
    $dt_initial = addslashes($dt_initial);

    $dt_final = $_POST['dt_final'];
    $dt_final = addslashes($dt_final);

    require("connect.php");

    $con = new Connect();

    $actions = $con->searchActions($user_id, $type_actions, $dt_initial, $dt_final);

?>

    <thead>
        <tr>
            <th scope="col">Usuário</th>
            <th scope="col">Ação</th>
            <th scope="col">Descrição</th>
            <th scope="col">Horário</th>
            <th scope="col">Data</th>
        </tr>
    </thead>

<?php

    if(!empty($actions)){
        echo "<tbody id='tbody'>";
        foreach($actions as $value){
            echo "<tr>";
                echo "<td>".$value['user_name']."</td>";
                echo "<td>".$value['actions_type']."</td>";

                if($value['actions_type'] == 'adicionou'){
                    $filo_ancestral = $value['actions_oldname'];
                    $categoria_filoAncestral = $value['actions_oldcategory'];
    
                    if($categoria_filoAncestral == ""){
                        $categoria_filoAncestral= "ramo inicial";
                    }
    
                    $filo_adicionado = $value['actions_newname'];
                    $categoria_filoAdd = $value['actions_newcategory'];
    
                    $descricao = "ao(à) $categoria_filoAncestral $filo_ancestral o(a) $categoria_filoAdd $filo_adicionado";
    
                } else if($value['actions_type'] == 'editou'){
                    $oldname = $value['actions_oldname'];
                    $oldcategory = $value['actions_oldcategory'];
    
                    $newname = $value['actions_newname'];
                    $newcategory = $value['actions_newcategory'];
    
                    $descricao = "o(a) $oldcategory $oldname para $newcategory $newname";
    
                } else if($value['actions_type'] == 'excluiu'){
                    $name = $value['actions_oldname'];
                    $category = $value['actions_oldcategory'];
    
                    $descricao = "o(a) $category $name";
    
                } else if($value['actions_type'] == 'arrastou'){
                    $name = $value['actions_auxname'];
                    $category = $value['actions_auxcategory'];
    
                    $old_pname = $value['actions_oldname'];
                    $old_pcategory = $value['actions_oldcategory'];
    
                    $new_pname = $value['actions_newname'];
                    $new_pcategory = $value['actions_newcategory'];
    
                    if($old_pcategory == ""){
                        $old_pname = "ramo inicial ".$old_pname;
                    }
    
                    if($new_pcategory == ""){
                        $new_pcategory = "ramo inicial";
                    }
    
                    $descricao = "o(a) $category $name do(a) $old_pcategory $old_pname para o(a) $new_pcategory $new_pname";
    
                }

                echo "<td>$descricao</td>";

                $datetime = $value['actions_datetime'];
                $date = substr($datetime, 0, 10);
                $date = date('d/m/Y', strtotime($date));
                $time = substr($datetime, 10);
                $time = date('H:i:s', strtotime($time));

                echo "<td>$time</td>";
                echo "<td>$date</td>";
            echo "</tr>";

        }
        echo "</tbody>";
    }

?>