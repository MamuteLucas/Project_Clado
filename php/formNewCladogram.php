<div id="div_form">
  <h1>Criar cladograma</h1>
  <form method="post" name="formNewCladogram" id="form_newCladogram" onsubmit="return false">

		<input type="text"     name="newClado_name"
	      class="form_input form_inputText" placeholder="Nome do cladograma" required>

    <input type="submit"  id="form_inputButton" class="form_input" value="Criar cladograma"
        onclick="submitCladogram()">
  </form>

  <h1>Adicionar cladograma</h1>
  <form method="post" name="formAddCladogram" id="form_addCladogram" onsubmit="return false">

		<input type="text"     name="addClado_name"
	      class="form_input form_inputText" placeholder="Nome do cladograma" required>

    <input type="email"     name="addClado_emailUserAdmin"
    	  class="form_input form_inputText" placeholder="Criador do cladograma (email)" required>

    <input type="submit"  id="form_inputButton" class="form_input" value="Adicionar cladograma"
        onclick="addCladogram()">
  </form>
</div>
