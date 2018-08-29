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
          $("#form_newCladogram").append("<small id='small_newCladogram'>Cladograma já existente!</small>");
          cladoExist = false;
        }
      });

    }
  });

  $("#addCladogram").on("click", function(){
    var clado_name = $("input[name = 'addClado_name']").val()
        email_userAdmin = $("input[name = 'addClado_emailUserAdmin']").val();

    if(clado_name != "" && email_userAdmin != ""){
      $.post("php/addCladogram.php", {"clado_name": clado_name, "email_userAdmin": email_userAdmin}, function(returned){
        if(returned == "SOLICITACAO ENVIADA"){
          window.location = "?pag=inicio";
        } else if(smallAdd){
            $("#form_addCladogram").append("<small id='small_addCladogram'></small>");
            smallAdd = false;
        }

        if(returned == "CLADOGRAMA INEXISTENTE"){
          $("#small_addCladogram").text("Cladograma inexistente!");

        } else if(returned == "USUARIO NAO EXISTE"){
          $("#small_addCladogram").text("Usuario inexistente!");

        } else if(returned == "CLADOGRAMA JA ADICIONADO"){
          $("#small_addCladogram").text("Cladograma já adicionado!");

        } else if(returned == "SOLICITACAO JA ENVIADA"){
          $("#small_addCladogram").text("Você já enviou uma solicitação!");

        }

      });

    }
  });
});
