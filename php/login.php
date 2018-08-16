<?php
  if(empty($_GET["pag"])){
    header("location: ../index.php?pag=inicio");
  }
?>

<div id="div_form">
  <h1>Entrar na conta</h1>
  <form method="post" name="formLogin" id="form_login" onsubmit="return false">

		<input type="email"     name="login_email"
	     class="form_input form_inputText" placeholder="E-mail" required>

		<div id="div_confirmPassword">
	    <input type="password"  name="login_password"
	      class="form_input form_inputText" placeholder="Senha" required>
		</div>

    <input type="submit"  id="form_inputButton" class="form_input" value="Entrar na conta" onclick="submitLogin()">
  </form>
</div>
