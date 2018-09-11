function dotNode_onmouseup(buttonPressed, varThis){
  if(buttonPressed.which == 3){
    $("#div_tabOptions").css({display: "inline", left: buttonPressed.clientX, top: buttonPressed.clientY});

    if(buttonPressed.target.__data__.name == "Vida"){
      $("#li_removeFilo").css("display", "none");
      $("#li_editFilo").css("display", "none");
    } else{
      $("#li_removeFilo").removeAttr("style");
      $("#li_editFilo").removeAttr("style");
    }

    $("#title_tabOptions").text(varThis[0].textContent);
  }

  inputText_onfocusout($("#input_text").val());

}

function dotNode_onmousedown(buttonPressed){
  if (buttonPressed.which == 1) { //a condicao (A2) entra se o botao pressionado foi o esquerdo
      return true; //permitira arrastar um node
  } else {
      return false; //nao permitira um node
  }
}
