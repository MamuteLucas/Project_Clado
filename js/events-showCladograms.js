$(function(){
  $(".button_cladograms").not("#button_addCladogram").on("click", function(){
    window.location = "cladograma.php?clado_id="+$(this).val();
  });

  $("#button_addCladogram").on("click", function(){
    window.location = "home.php?pag=criar";
  });
});
