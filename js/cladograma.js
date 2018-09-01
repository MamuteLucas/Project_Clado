var savedRoot = null
    clado_name = null;

function saveNewRoot(notSavedRoot, initialDiagram, cladogram){
  clado_name = cladogram;
  //a var savedRoot se torna uma copia do objeto notSavedRoot, na qual agora pode ser manipulado sem causar travamentos
  //pois nao se trata mais de uma referencia ao mesmo local da memoria
  savedRoot = JSON.parse(turnDiagramInText(notSavedRoot));

  savedRoot = prepareDiagram(savedRoot);

  //o diagrama inicial eh comparado com o diagrama salvo para decidir de ira mostrar ou tirar o botao Salvar
  if(savedRoot != initialDiagram){
    animate();
  } else{
    depress();
  }
}

//funcao prepara o diagrama para ser salvo
function prepareDiagram(diagram){
  //aqui sao deletas as chaves da primeira camada do diagrama
  //delete diagram.parent;
  delete diagram.x;
  delete diagram.x0;
  delete diagram.y;
  delete diagram.y0;
  delete diagram.depth;
  delete diagram.id;
  //e aqui as posteriores
  delUnwatedKeysDiagram(diagram);

  //var savedRoot recebe o valor da var manipulableDiagram retornada pela funcao turnDiagramInText()
  diagram = turnDiagramInText(diagram);

  return diagram;
}

//funcao que 'salva' o novo diagrama
function saveDiagram(){
  //a linha abaixo envia (assincronamente) os dados que devem ser escritos no arquivo .json para o script PHP
  $.post("php/writeNewDiagram.php", {"modifiedDiagram": savedRoot, "cladogram": clado_name});
  //var initialDiagram recebe o valor do novo diagrama
  initialDiagram = savedRoot;

  depress();
}

//funcao deleta as chaves nao desejadas do diagrama
function delUnwatedKeysDiagram(diagram){
  if(diagram["children"] != null){
    diagram = diagram["children"];
    for(var i = 0; i < diagram.length; i++){
        //delete diagram[i].parent;
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

//funcao tranforma o objeto diagrama em texto
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

function searchNode(quest, diagram){
  diagram = JSON.parse(turnDiagramInText(diagram));

}

function getNodes(diagram, nodes){
  try{
    for(var i = 0; i < diagram.children.length; i++){
      var child = diagram.children[i];

      nodes[child.name] = child;

      if(child.children){
        getNodes(child, nodes);
      }
    }

    return nodes;
  } catch(e){
    //error

  }
}

function getIndexNodes(diagram, indexNodes){
  try{
    for(var i = 0; i < diagram.children.length; i++){
      var child = diagram.children[i];

      indexNodes.push(child.name);

      if(child.children){
        getIndexNodes(child, indexNodes);
      }
    }

    return indexNodes;
  } catch(e){
    //error

  }
}

//funcao que adiciona a classe anime-start
function animate(){
  $(".anime").addClass("anime-visibility");
  setTimeout(function(){
    $(".anime").addClass("anime-start");
  }, 1);
}

//funcao que remove a classe anime-start
function depress(){
  $(".anime").removeClass("anime-start");
  setTimeout(function(){
    $(".anime").removeClass("anime-visibility");
  }, 400);
}
