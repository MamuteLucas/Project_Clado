$(function(){
  $(".button_cladograms").not("#button_addCladogram").on("click", function(){
    window.location = "cladograma.php?clado_id="+$(this).val();
  });

  $("#button_addCladogram").on("click", function(){
    window.location = "home.php?pag=criar";
  });

  $(".span_share_delete").each(function(){
    try{
      var x_btnCladograms = $(this)[0].children[1].offsetLeft,
        y_btnCladograms = $(this)[0].children[1].offsetTop,
        share_btn = $(this)[0].children[1].id,
        delete_btn = $(this)[0].children[2].id;
        
      $("#"+share_btn).css({"top": y_btnCladograms + 450, "left": x_btnCladograms - 190});
      $("#"+delete_btn).css({"top": y_btnCladograms + 450, "left": x_btnCladograms - 155});
    } catch(e){
      var x_btnCladograms = $(this)[0].children[1].offsetLeft,
        y_btnCladograms = $(this)[0].children[1].offsetTop,
        delete_btn = $(this)[0].children[1].id;
        
      $("#"+delete_btn).css({"top": y_btnCladograms + 450, "left": x_btnCladograms - 175});
    }

  });

  $(".button_share").on("click", function(){
    console.log($(this));
  });

  $(".button_delete").on("click", function(){
    var id = $(this)[0].id;
        id = id[7];
    
    $.post("php/deleteCladogram.php", {"clado_id": id});
  });
});
