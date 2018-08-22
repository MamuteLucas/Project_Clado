<div id="div_form">
  <h1>Configurações da Conta</h1>
  <form method="post" name="configAccount" id="form_configAccount" onsubmit="return false">
    <div id="input_name">
      <input type="text" name="config_name" class="form_input" placeholder="Nome" value="<?= $_SESSION['user_name'] ?>" required>
    </div>

    <div id="input_email">
      <input type="email" name="config_email" class="form_input" placeholder="E-mail" value="<?= $_SESSION['user_email'] ?>" required>
    </div>

    <div id="input_oldPassword">
      <input type="password" name="config_oldPassword" class="form_input" placeholder="Senha antiga">
    </div>

    <div id="div_password">
      <div id="input_newPassword">
        <input type="password" name="config_newPassword" class="form_input" placeholder="Nova senha">
      </div>

      <div id="input_confirmNewPassword">
        <input type="password" name="config_confirmNewPassword" class="form_input" placeholder="Confirme a nova senha">
      </div>
    </div>

    <div id="input_button">
      <input type="submit" id="form_inputButton" class="form_input" value="Salvar" onclick="submitConfig()">
    </div>
  </form>
</div>
