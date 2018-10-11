function addFilo(newFilo_name, user_creator, filo_id, modifiedFilo){
  try{
    modifiedFilo.children[modifiedFilo.children.length] = {
      "id": filo_id,
      "name": newFilo_name,
      "creator": user_creator,
      "size": 100
    };

  } catch(inCaseOfError){
    modifiedFilo.children = [{
      "id": filo_id,
      "name": newFilo_name,
      "creator": user_creator,
      "size": 100
    }];

  }

  var child = modifiedFilo.children;

  for(var i = 0; i < child.length; i++){
    if(child[i].name == newFilo_name){
      return child[i];

    }

  }

}
