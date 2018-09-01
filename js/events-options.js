function addFilo(newFilo, modifiedFilo){
  try{
    modifiedFilo.children[modifiedFilo.children.length] = {"name": newFilo, "filo": "dominio", "size": 0};

  } catch(error){
    modifiedFilo.children = [{"name": newFilo, "filo": "dominio", "size": 0}];

  }
}
