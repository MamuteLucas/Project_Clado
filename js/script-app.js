var savedRoot = null;

function saveNewRoot(notSavedRoot){
  delete notSavedRoot.x;
  delete notSavedRoot.x0;
  delete notSavedRoot.y;
  delete notSavedRoot.y0;
  delete notSavedRoot.depth;
  delete notSavedRoot.id;
  delUnwatedKeysDiagram(notSavedRoot);
  savedRoot = getDiagram(notSavedRoot);

  $.post("php/readCurrentDiagram.php", function(data){
    if(data !== savedRoot){
      animate();
    } else{
      depress();
    }
  });
}

function saveDiagram(){
  $.post("php/writeNewDiagram.php", {modifiedDiagram: savedRoot});

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

function getDiagram(diagram){
  var cache = [];
  var newDiagram = JSON.stringify(diagram, function(key, value){
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

  return newDiagram;
}

function animate(){
  $('.anime').addClass('anime-start');
}

function depress(){
  $('.anime-start').removeClass('anime-start');
}
