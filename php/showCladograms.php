<div id="div_cladograms">
  <button type="button" class="button_cladograms ajuste_tec" id="button_addCladogram">
    <p class="p_cladograms">Criar novo cladograma</p>
  </button>

  <button type="button" class="button_cladograms ajuste_tec_aux" id="button_addCladogram">
    
  </button>

  <?php for($i = 0; $i < sizeof($_SESSION["cladograms"]); $i++):?>
    <?php $_userAdmin = $con->searchUser($_SESSION["cladograms"][$i]["clado_userAdmin"]); ?>
    <span class="span_share_delete" id="span_sd_<?= $_SESSION["cladograms"][$i]["clado_id"] ?>">

    <button type="button" class="button_cladograms"
      value='<?= $_SESSION["cladograms"][$i]["clado_id"]?>'>
        <p class="p_cladograms">
          <?= $_SESSION["cladograms"][$i]["clado_name"]."</br> Criado por: ".$_userAdmin["user_name"]?>
        </p>
        
    </button>

    <input type="button" id="share_<?= $_SESSION["cladograms"][$i]["clado_id"]?>" 
        class="button-action_ShareDelete button_share">        

    <input type="button" id="delete_<?= $_SESSION["cladograms"][$i]["clado_id"]?>"
        class="button-action_ShareDelete button_delete">

    <?php
      if($_userAdmin["user_name"] != $_SESSION['user_name']){
        $_class = "display_none";
      } else{
        $_class = "";
      }
    ?>

    <input type="button" id="report_<?= $_SESSION["cladograms"][$i]["clado_id"]?>" 
        class="button_report <?= $_class?>" value="Relatório de Atividade">

    </span>
  <?php endfor; ?>
</div>
