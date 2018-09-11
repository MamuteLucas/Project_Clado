<div id="div_cladograms">
  <button type="button" class="button_cladograms" id="button_addCladogram">
    <p class="p_cladograms" id="p_addCladogram">.</p>
  </button>

  <?php for($i = 0; $i < sizeof($_SESSION["cladograms"]); $i++):?>
    <button type="button" class="button_cladograms"
      value='<?= $_SESSION["cladograms"][$i]["clado_id"]?>'>
        <p class="p_cladograms"><?= $_SESSION["cladograms"][$i]["clado_name"]; ?></p>

        
    </button>
  <?php endfor; ?>
</div>
