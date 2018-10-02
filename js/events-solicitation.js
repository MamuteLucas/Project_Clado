$(function(){
  $(".btn").on("click", function(button){
    var div = button.target.parentElement,
        user_id = div.children[0].innerText,
        clado_id = div.children[1].innerText,
        button_type = button.target.className;

    $("#"+div.id).animate({
      height: "toggle",
      padding: "0.75rem 1.25rem 0 1.25rem",
      opacity: 0

    }, 400, function(){
      $("#"+div.id).remove();

      if($("#soli_sended")[0].children.length == 1){
        $("#soli_sended").append("<div class='alert alert-primary' role='alert'>Nenhuma solicitação.</div>");
      }

      if($("#soli_received")[0].children.length == 1){
        $("#soli_received").append("<div class='alert alert-primary' role='alert'>Nenhuma solicitação.</div>");
      }

    });

    if(div.id[3] == "R"){
      $.post("php/actionSolicitationReceived.php", {"user_id": user_id, "clado_id": clado_id, "button_type": button_type});
    } else if(div.id[3] == "S"){
      $.post("php/actionSolicitationSended.php", {"clado_id": clado_id});
    }
    
  });

});
