function addFilo(newFilo_name, newFilo_category, user_creator, modifiedFilo){
  try{
    modifiedFilo.children[modifiedFilo.children.length] = {
      "name": newFilo_name,
      "filo": newFilo_category,
      "creator": user_creator,
      "size": 0
    };

  } catch(error){
    modifiedFilo.children = [{
      "name": newFilo_name,
      "filo": newFilo_category,
      "creator": user_creator,
      "size": 0
    }];

  }
}
