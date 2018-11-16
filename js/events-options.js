function addFilo(newFilo_name, newFilo_category, user_creator, modifiedFilo){
  try{
    modifiedFilo.children[modifiedFilo.children.length] = {
      "name": newFilo_name,
      "category": newFilo_category,
      "creator": user_creator,
      "editor": "",
      "size": 100
    };

  } catch(inCaseOfError){
    modifiedFilo.children = [{
      "name": newFilo_name,
      "category": newFilo_category,
      "creator": user_creator,
      "editor": "",
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
