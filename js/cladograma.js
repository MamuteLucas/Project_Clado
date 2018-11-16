var savedRoot = null
    clado_name = null;

function saveNewRoot(notSavedRoot, initialDiagram, cladogram){
  clado_name = cladogram;
  savedRoot = JSON.parse(turnDiagramInText(notSavedRoot));

  savedRoot = prepareDiagram(savedRoot);

  if(savedRoot != initialDiagram){
    animate();
  } else{
    depress();
  }
}


function prepareDiagram(diagram){
  delete diagram.x;
  delete diagram.x0;
  delete diagram.y;
  delete diagram.y0;
  delete diagram.depth;
  delete diagram.id;

  delUnwatedKeysDiagram(diagram);

  diagram = turnDiagramInText(diagram);

  return diagram;
}


function saveDiagram(diagram, _actions, _user_logged, _clado_id){
  $.post("php/saveActions.php", {"actions": _actions, "user_logged": _user_logged, "clado_id": _clado_id}, function(e){
    console.log(e);
  });
  
  $.post("php/writeNewDiagram.php", {"modifiedDiagram": savedRoot, "cladogram": clado_name});

  initialDiagram = savedRoot;

  initialNodes = getNodes(diagram, new Array());
  indexInitialNodes = getIndexNodes(diagram, new Array());

  depress();
}

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

function turnDiagramInText(diagram){
  var cache = [];
  var manipulableDiagram = JSON.stringify(diagram, function(key, value){
    if(typeof value === 'object' && value !== null){
      if(cache.indexOf(value) !== -1){
        try{
          return JSON.parse(JSON.stringify(value));

        } catch(error){
          return;

        }
      }

      cache.push(value);
    }
    return value;
  });

  cache = null;

  return manipulableDiagram;
}

function searchNode(diagram){
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

    indexNodes.sort();

    return indexNodes;
  } catch(e){
    //error

  }
}

function animate(){
  $(".anime").addClass("anime-visibility");
  setTimeout(function(){
    $(".anime").addClass("anime-start");
  }, 1);
}

function depress(){
  $(".anime").removeClass("anime-start");
  setTimeout(function(){
    $(".anime").removeClass("anime-visibility");
  }, 400);
}
