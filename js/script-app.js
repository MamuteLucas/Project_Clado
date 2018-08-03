var savedRoot = null;

function saveNewRoot(notSavedRoot){
  //a var savedRoot se torna uma copia do objeto notSavedRoot, na qual agora pode ser manipulado sem causar travamentos
  //pois nao se trata mais de uma referencia ao mesmo local da memoria
  savedRoot = JSON.parse(turnDiagramInText(notSavedRoot));

  animate();
}

//funcao que 'salva' o novo diagrama
function saveDiagram(){
  //aqui sao deletas as chaves da primeira camada do diagrama
  delete savedRoot.x;
  delete savedRoot.x0;
  delete savedRoot.y;
  delete savedRoot.y0;
  delete savedRoot.depth;
  delete savedRoot.id;
  //e aqui as posteriores
  delUnwatedKeysDiagram(savedRoot);

  //var savedRoot recebe o valor da var manipulableDiagram retornada pela funcao turnDiagramInText()
  savedRoot = turnDiagramInText(savedRoot);

  //a linha abaixo envia (assincronamente) os dados que devem ser escritos no arquivo .json
  $.post("php/writeNewDiagram.php", {modifiedDiagram: savedRoot});

  depress();
}

//funcao deleta as chaves nao desejadas do diagrama
function delUnwatedKeysDiagram(diagram){
  if(diagram["children"] != null){
    diagram = diagram["children"];
    for(var i = 0; i < diagram.length; i++){
        delete diagram[i].x;
        delete diagram[i].x0;
        delete diagram[i].y;
        delete diagram[i].y0;
        delete diagram[i].depth;
        delete diagram[i].id;
    }

    for(var i = 0; i < diagram.length; i++){
      delUnwatedKeysDiagram(diagram[i]);
    }
  }
}

//funcao constroi e retorna o novo diagrama
function turnDiagramInText(diagram){
  var cache = [];
  var manipulableDiagram = JSON.stringify(diagram, function(key, value){
    if(typeof value === 'object' && value !== null){
      if(cache.indexOf(value) !== -1){
        //Duplicate reference found
        try{
          //If this value does not reference a parent it can be deduped
          return JSON.parse(JSON.stringify(value));
        } catch(error){
          //discard key if value cannot be deduped
          return;
        }
      }
      //Store value in our collection
      cache.push(value);
    }
    return value;
  });

  cache = null; //Enable garbage collection

  return manipulableDiagram;
}

//funcao que adiciona a classe anime-start
function animate(){
  $('.anime').addClass('anime-start');
}

//funcao que remove a classe anime-start
function depress(){
  $('.anime-start').removeClass('anime-start');
}
