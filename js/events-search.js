function inputText_onkeyup(keyPressed, digitated){
  try{
    if(65 <= keyPressed && keyPressed <= 90 || keyPressed == 8){
      if(digitated != ''){ //a condicao (A1) entra caso o campo de pesquisa tenha algo digitado nele
        //nesse caso eh mostrado as li (itens da lista)
        $("#input_text").css("border-radius", "0.3rem 0.3rem 0rem 0rem");
        $("#ul_autoComplete").css("display", "inline");

      } else{ //a condicao (A1) entra caso o campo de pesquisa nao tenha nada escrito nele
        //nesse caso eh escondida as li (itens da lista)
        $("#input_text").css("border-radius", "0.3rem");
        $("#ul_autoComplete").css("display", "none");

      }

      //as li (itens da lista) sao removidas
      $(".results_search").remove();
      
      firstLiSearch = liFinder(indexInitialNodes.length, digitated);

      if(digitated == ''){
        firstLiSearch = 0;
      }
      
    }
  } catch(e){
    $('#ul_autoComplete').append("<li class='results_search'>Sem resultados</li>");

  }
}

function liFinder(lengthInitialNodes, digitated){
  //var para contar quando results foram encontrados
  var countResults = 0,
      results_bySearch = [];

  for(var i = 0; i < lengthInitialNodes; i++){ //para cada Node
    if(indexInitialNodes[i].match(digitated) && countResults < 15){
      results_bySearch[countResults] = indexInitialNodes[i];

      countResults++;

    }
  }

  for(var i = 0; i < countResults; i++){
    $('#ul_autoComplete').append("<li class='results_search'>"+results_bySearch[i]+"</li>");
  }

  if(countResults == 0){
    $('#ul_autoComplete').append("<li class='results_search'>Sem resultados</li>");

    return 0;
  } else{
    return results_bySearch[0];
  }
}

function inputText_onfocusin(digitated){ //chamada quando for dado foco no campo de pesquisa
  if(digitated == ""){ //a condicao (A4) entra caso o campo de pesquisa nao tiver nada escrito nele
    //nesse caso eh escondida as li (itens da lista)
    $("#input_text").css("border-radius", "0.3rem");
    $("#ul_autoComplete").css("display", "none");

  } else{ //a condicao (A4) entra o campo de pesquisa tiver algo escrito nele
    //nesse caso eh mostrado as li (itens da lista)
    $("#input_text").css("border-radius", "0.3rem 0.3rem 0rem 0rem");
    $("#ul_autoComplete").css("display", "inline");

  }
}

function inputText_onfocusout(digitated){ //chamada quando for tirado o foco do campo de pesquisa
  //as li (itens da lista) sao escondidas
  $("#input_text").css("border-radius", "0.3rem");
  $("#ul_autoComplete").css("display", "none");

  if(digitated == ""){ //a condicao (A5) entra caso o campo de pesquisa nao tiver nada escrito nele
    //as li (itens da lista) sao removidas
    $(".results_search").remove();

  }
}

function ulAutoComplete_onclick(liClicked){ //chamada quando algum li for clicado
  //as li (itens da lista) sao escondidas
  $("#input_text").css("border-radius", "0.3rem");
  $("#ul_autoComplete").css("display", "none");

  if(liClicked != "Sem resultados"){ //a condicao (A6) entra caso o pesquisa nao tenha encontrado resultados
    //o valor do campo de pesquisa passa a ser o mesmo valor do texto do li que foi clicado
    $("#input_text").val(liClicked);
    //as li (itens da lista) sao removidas
    $(".results_search").remove();
    //adicionado os li que contenham em uma parte deles o conteudo do li inicialmente clicado
    //por exemplo: foi pesquisado "Sort", tinha 2 resultados: "Sort" e "SortOperator", o user clicou em "Sort", ao clicar novamente
    //no campo de pesquisa aparece "Sort" e "SortOperator"
    liFinder(indexInitialNodes.length, liClicked);
  }
}
