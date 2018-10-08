$(function(){
  var clado_id = null;
  var width = $(window).width(),
      height = $(window).height();

  $(".button_cladograms").not("#button_addCladogram").on("click", function(){
    window.location = "cladograma.php?clado_id="+$(this).val();
  });

  $("#button_addCladogram").on("click", function(){
    window.location = "home.php?pag=criar";
  });

  function setPositionShareDelete(){
    $(".span_share_delete").each(function(){
      var x_btnCladograms = $(this)[0].children[0].offsetLeft,
          y_btnCladograms = $(this)[0].children[0].offsetTop,
          share_btn = $(this)[0].children[1].id,
          delete_btn = $(this)[0].children[2].id;
          
      $("#"+share_btn).css({"top": y_btnCladograms + 430, "left": x_btnCladograms + 122 - 35});
      $("#"+delete_btn).css({"top": y_btnCladograms + 430, "left": x_btnCladograms + 122});
  
    });
  }

  $(window).on('resize', function(){
    if($(window).width() != width || $(window).height() != height) {
      width = $(window).width();
      height = $(window).height();

      setPositionShareDelete();
    }
  });

  setPositionShareDelete();

  $(".button_share").on("click", function(){
    clado_id = $(this)[0].id;
    clado_id = clado_id[6];

    $("#alert_share").removeAttr("style");
    $("#alert_share").css("padding", "0.2rem");
    
    $.post("php/shareCladogram.php", {"clado_id": clado_id}, function(token){
      $("#input_copycat").val("http://localhost/project_clado/home.php?pag=criar&token="+token);
    });

    $("#btn_copycat").on("click", function(){
      $("#input_copycat").select();
      document.execCommand('copy');

    });

    setTimeout(function(){
      $("#alert_share").alert('close');
    }, 15000);
  });

  

  $(".button_delete").on("click", function(){
    clado_id = $(this)[0].id;
    clado_id = clado_id[7];

    $(".div_confirmDelete").css("display", "inline");

  });

  $("#div_confirmDelete_shadow, #btn_cancelDelete").on("click", function(){
    $(".div_confirmDelete").removeAttr("style");

  });

  $("#btn_confirmDelete").on("click", function(){
    $.post("php/deleteCladogram.php", {"clado_id": clado_id});

    $(".div_confirmDelete").removeAttr("style");

    $("#span_sd_"+clado_id).remove();

    setPositionShareDelete();
  });
});
