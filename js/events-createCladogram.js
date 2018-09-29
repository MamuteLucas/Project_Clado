var smallAdd = true,
    cladoExist = true;

$(function(){
  $("#submitCladogram").on("click", function(){
    var clado_name = $("input[name = 'newClado_name']").val();

    if(clado_name != ""){
      $.post("php/createNewCladogram.php", {"clado_name": clado_name}, function(returned){
        if(returned != "CHAVE DUPLICADA"){
          window.location = "?pag=inicio";

        } else if(cladoExist){
          $("#form_newCladogram").append("<p class='smallp' id='small_newCladogram'>Cladograma já existente!</p>");
          cladoExist = false;
        }
      });

    }
  });
});
