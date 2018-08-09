function dotNode_onmouseup(buttonPressed){
  if(buttonPressed.which == 3){ //a condicao (A1) entra se o botao do mouse pressionado foi o direito
    //a div#div_tabOptions fica visivel e posicionado onde foi clicado
    $("#div_tabOptions").css({display: "inline", left: buttonPressed.clientX, top: buttonPressed.clientY});
  }
}

function dotNode_onmousedown(buttonPressed){
  if (buttonPressed.which == 1) { //a condicao (A2) entra se o botao pressionado foi o esquerdo
      return true; //permitira arrastar um node
  } else {
      return false; //nao permitira um node
  }
}

function hashtagTreeContainer(){
  $('input[name="filo"]').css("border-radius", "0.3rem");
  $('#search-autoComplete').css({opacity: 0, top: "-20rem", right: "-20rem"});
}
