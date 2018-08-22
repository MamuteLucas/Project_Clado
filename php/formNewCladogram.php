<div id="div_form">
  <h1>Criar cladograma</h1>
  <form method="post" name="formNewCladogram" id="form_newCladogram" onsubmit="return false">

		<input type="text"     name="clado_name"
	      class="form_input form_inputText" placeholder="Nome do cladograma" required>

    <input type="submit"  id="form_inputButton" class="form_input" value="Criar cladograma"
        onclick="submitCladogram(<?= $_SESSION['user_id']?>)">
  </form>
</div>
