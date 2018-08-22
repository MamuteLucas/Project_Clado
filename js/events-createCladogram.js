function submitCladogram(user_id){
  var clado_name = $("input[name = 'clado_name']").val();

  if(clado_name != ""){
    $.post("php/createNewCladogram.php", {"user_id": user_id, "clado_name": clado_name}, function(returned){
      if(returned != "CHAVE DUPLICADA"){
        window.location = "?pag=inicio";
      } else {
        console.log("ERROR");
      }
    });

  } else {
    console.log("ERROR");
  }
}
