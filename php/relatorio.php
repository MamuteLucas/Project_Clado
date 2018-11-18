<?php
    if(empty($_GET["clado_id"])){
		header("location: home.php?pag=inicio");

    }
    
    $clado_id = $_GET['clado_id'];
    $clado_id = addslashes($clado_id);
    
    $acoes = $con->reportCladogram($clado_id, $_SESSION['user_id']);

    if(empty($acoes)){
        $_SESSION['result'] = "Acesso negado";
        $_SESSION['alert_class'] = "alert-danger";
        
        header('location: home.php?pag=inicio');
    }

    $_users = $con->searchUserFromCladogram($clado_id);
?>

<div class="report_div">
    <h2>Relatório de atividade</h2>
    <form>
        <div class="form-group">
            <label for="actions_user">Usuário</label>
            <select class="form-control" id="actions_user" name="actions_user">
                <option value="0">Selecione um usuário</option>
            <?php foreach($_users as $value):?>
                <option value="<?= $value['user_id'];?>"><?= $value['user_name'];?></option>
            <?php endforeach;?>
            </select>
        </div>
            
        <div class="form-group" style="float: right;">
            <label for="actions_type">Tipo de ação</label>
            <select class="form-control" id="actions_type" name="actions_type">
                <option value="0">Selecione o tipo de ação</option>
                <option value="1">Adicionou</option>
                <option value="2">Editou</option>
                <option value="3">Excluiu</option>
            </select>
        </div>

        <div class="form-group">
            <label for="initial_date">Data inicial</label>
            <input class="form-control" type="datetime-local" id="initial_date" name="initial_date">
        </div>

        <div class="form-group" style="float: right;">
            <label for="final_date">Data final</label>
            <input class="form-control" type="datetime-local" id="final_date" name="final_date">
        </div>

        <div class="form-group">
            <input class="btn btn-primary" type="button" id="btn_searchReport" value="Procurar">
        </div>

    </form>

    <table class='table table-hover'>
        <thead>
            <tr>
                <th scope='col'>Usuário</th>
                <th scope='col'>Ação</th>
                <th scope='col'>Descrição</th>
                <th scope='col'>Horário</th>
                <th scope='col'>Data</th>
            </tr>
        </thead>

        <tbody>

<?php
        foreach($acoes as $value):
            $user_name = $con->searchUser($value['user_id']);
            $user_name = $user_name['user_name'];

            $tipo_acao = $value['actions_type'];

            $datetime = $value['actions_datetime'];
            $date = substr($datetime, 0, 10);
            $date = date('d/m/Y', strtotime($date));
            $time = substr($datetime, 10);
            $time = date('H:i:s', strtotime($time));

            if($tipo_acao == 'adicionou'){
                $filo_ancestral = $value['actions_oldname'];
                $categoria_filoAncestral = $value['actions_oldcategory'];

                if($categoria_filoAncestral != ""){
                    $categoria_filoAncestral = "($categoria_filoAncestral)";
                    $aux = "filo";

                } else {
                    $aux = "ramo inicial";

                }

                $filo_adicionado = $value['actions_newname'];
                $categoria_filoAdd = "(".$value['actions_newcategory'].")";

                $descricao = "ao $aux $filo_ancestral$categoria_filoAncestral o filo $filo_adicionado$categoria_filoAdd";

            } else if($tipo_acao == 'editou'){
                $oldname = $value['actions_oldname'];
                $oldcategory = $value['actions_oldcategory'];

                $newname = $value['actions_newname'];
                $newcategory = $value['actions_newcategory'];

                $descricao = "o filo $oldname($oldcategory) para  $newname($newcategory)";

            } else if($tipo_acao == 'excluiu'){
                $name = $value['actions_oldname'];
                $category = $value['actions_oldcategory'];

                $descricao = "o filo $name($category)";

            }
?>
            <tr>
                <td><?= $user_name; ?></td>
                <td><?= $tipo_acao; ?></td>
                <td><?= $descricao; ?></td>
                <td><?= $time; ?></td>
                <td><?= $date; ?></td>
            </tr>

            <?php endforeach; ?>

        </tbody>
    </table>
</div>
