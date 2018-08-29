<?php
  $solicitation = $con->searchSolicitation($_SESSION["user_id"]);
?>

<div id="soli_received" class="class_soli">
  <h1>Solicitações Recebidas</h1>
  <?php for($i = 0; $i < sizeof($solicitation); $i++):?>
    <div class="alert alert-primary" role="alert" id="div_<?= $i;?>">
      <?= $solicitation[$i]["user_name"];?><span id="user_id" style="display: none"><?= $solicitation[$i]["user_id"];?></span>
      quer participar do projeto:
      <?= $solicitation[$i]["clado_name"];?><span id="clado_id" style="display: none"><?= $solicitation[$i]["clado_id"];?></span>
      <button type="button" class="btn btn-success">Aprovar</button>
      <button type="button" class="btn btn-danger">Recusar</button>
    </div>
  <?php endfor; ?>
  <?php if(sizeof($solicitation) == 0):?>
    <div class="alert alert-primary" role="alert">
      Nenhuma solicitação.
    </div>
  <?php endif;?>
</div>

<div id="soli_sended" class="class_soli">
  <h1>Solicitações Enviadas</h1>
</div>
