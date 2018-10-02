<div id="div_cladograms">
  <button type="button" class="button_cladograms" id="button_addCladogram">
    <p class="p_cladograms">Criar novo cladograma</p>
  </button>

  <?php for($i = 0; $i < sizeof($_SESSION["cladograms"]); $i++):?>
    <span class="span_share_delete">

    <button type="button" class="button_cladograms"
      value='<?= $_SESSION["cladograms"][$i]["clado_id"]?>'>
        <p class="p_cladograms"><?= $_SESSION["cladograms"][$i]["clado_name"]; ?></p>
        
    </button>

    <?php if($_SESSION["cladograms"][$i]["clado_userAdmin"] == $_SESSION["user_id"]): ?>
        <input type="button" id="share_<?= $_SESSION["cladograms"][$i]["clado_id"]?>" 
            class="button-action_ShareDelete button_share">
                   
    <?php endif;?>

        <input type="button" id="delete_<?= $_SESSION["cladograms"][$i]["clado_id"]?>"
              class="button-action_ShareDelete button_delete">

    </span>
  <?php endfor; ?>
</div>
