<?php
  $soli_received = $con->searchSolicitationReceived($_SESSION["user_id"]);
  $soli_sended = $con->searchSolicitationSended($_SESSION["user_id"]);
?>

<div id="soli_received" class="class_soli">
  <h1>Solicitações Recebidas</h1>
  <?php for($i = 0; $i < sizeof($soli_received); $i++):?>
    <div class="alert alert-primary" role="alert" id="divReceived_<?= $i;?>">
      <?= $soli_received[$i]["user_name"];?><span id="user_id" style="display: none"><?= $soli_received[$i]["user_id"];?></span>
      quer participar do projeto:
      <?= $soli_received[$i]["clado_name"];?><span id="clado_id" style="display: none"><?= $soli_received[$i]["clado_id"];?></span>

      <button type="button" class="btn btn-success">Aprovar</button>
      <button type="button" class="btn btn-danger">Recusar</button>
    </div>
  <?php endfor; ?>
  <?php if(sizeof($soli_received) == 0):?>
    <div class="alert alert-primary" role="alert">
      Nenhuma solicitação.
    </div>
  <?php endif;?>
</div>

<div id="soli_sended" class="class_soli">
  <h1>Solicitações Enviadas</h1>
  <?php for($i = 0; $i < sizeof($soli_sended); $i++):?>
    <div class="alert alert-primary" role="alert" id="divSended_<?= $i;?>">
      Você pediu para participar do projeto:
      <?= $soli_sended[$i]["clado_name"];?><span id="user_id" style="display: none"><?= $soli_sended[$i]["user_id"];?></span>
      de
      <?= $soli_sended[$i]["user_name"];?><span id="clado_id" style="display: none"><?= $soli_sended[$i]["clado_id"];?></span>

      <button type="button" class="btn btn-danger">Calcelar</button>
    </div>
  <?php endfor; ?>
  <?php if(sizeof($soli_sended) == 0):?>
    <div class="alert alert-primary" role="alert">
      Nenhuma solicitação.
    </div>
  <?php endif;?>
</div>
