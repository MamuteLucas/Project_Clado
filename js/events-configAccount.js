var correctOldPassword = true,
    correctNewPassword = true,
    correctEmail = true,
    correctName = true,
    requiredPassword = false,
    errorInputNull = false;

function submitConfig(){
  if(requiredPassword){
    if($("input[name = 'config_newPassword']").val() != "" &&
       $("input[name = 'config_confirmNewPassword']").val() != "" &&
       $("input[name = 'config_oldPassword']").val() != "" &&
       $("input[name = 'config_name']").val() != "" &&
       $("input[name = 'config_email']").val() != ""){
         if(correctOldPassword && correctNewPassword && correctEmail && correctName){
           $("form").attr({"onsubmit": "return true", "action": "php/saveAccount.php"});

         }
       } else if(!errorInputNull){
         $("#small_newPassword").remove();
         $("#input_confirmNewPassword").append("<p class='smallp' id='small_error'>Preencha os campos restantes!</p>");
         errorInputNull = true;
       }

  } else{
    if($("input[name = 'config_name']").val() != "" && $("input[name = 'config_email']").val() != ""){
      if(correctOldPassword && correctNewPassword && correctEmail){
        $("form").attr({"onsubmit": "return true", "action": "php/saveAccount.php"});

      }

    } else if(!errorInputNull){
      $("#small_newPassword").remove();
      $("#input_confirmNewPassword").append("<p class='smallp' id='small_error'>Preencha os campos restantes!</p>");
      errorInputNull = true;

    }
  }

}

function changeRequired(){
  if($("input[name = 'config_newPassword']").val() != "" ||
     $("input[name = 'config_confirmNewPassword']").val() != "" ||
     $("input[name = 'config_oldPassword']").val() != ""){

       $("input[name = 'config_newPassword']").prop("required", true);
       $("input[name = 'config_confirmNewPassword']").prop("required", true);
       $("input[name = 'config_oldPassword']").prop("required", true);

       requiredPassword = true;

  } else{
    $("input[name = 'config_newPassword']").removeAttr("required");
    $("input[name = 'config_confirmNewPassword']").removeAttr("required");
    $("input[name = 'config_oldPassword']").removeAttr("required");

    requiredPassword = false;

  }
}


$(function(){
  $("input[name = 'config_name']").on("keyup", function(){
    var name = $(this).val();

    if(name.search(/[^a-z ]/i) != -1 && correctName){
      $("input[name = 'config_name']").css({border: "1px solid red"});
      $("#input_name").append("<p class='smallp' id='small_name'>Nome inválido!</p>");
      correctName = false;
    } else if(name.search(/[^a-z ]/i) == -1 && !correctName){
      correctName = true;
      $("#small_name").remove();

    }
  });

  $("#div_password").on("keyup", function(){
    var fPassword = $("input[name = 'config_newPassword']").val(),
        sPassword = $("input[name = 'config_confirmNewPassword']").val();

    if(sPassword != "" && fPassword != sPassword && correctNewPassword){
      $("#small_error").remove();
      $("input[name = 'config_confirmNewPassword']").css({border: "1px solid red"});
      $("#input_confirmNewPassword").append("<p class='smallp' id='small_newPassword'>As senhas são diferentes!</p>");
      correctNewPassword = false;
      errorInputNull = false;

    } else if(sPassword == fPassword){
      correctNewPassword = true;
      $("#small_newPassword").remove();
      $("input[name = 'config_confirmNewPassword']").removeAttr("style");
    }
  });

  $("input[name = 'config_newPassword']").on("blur", function(){
    changeRequired();
  });

  $("input[name = 'config_confirmNewPassword']").on("blur", function(){
    changeRequired();
  });

  $("input[name = 'config_email']").on("blur", function(){
    var email = $(this).val();

    if(email != ""){
      $.post("php/checkEmail.php", {"email": email}, function(existingEmail){
        if(existingEmail != "" && existingEmail != email && correctEmail){
          $("input[name = 'config_email']").css({"border-color": "red"});
          $("#input_email").append("<p class='smallp' id='small_email'>E-mail já cadastrado!</p>");
          correctEmail = false;

        }
      });
    }
  }).on("keyup", function(){

    correctEmail = true;

    $("#small_email").remove();
    $("input[name = 'config_email']").removeAttr("style");

  });

  $("input[name = 'config_oldPassword']").on("blur", function(){
    changeRequired();

    if($(this).val() != ""){
      $.post("php/checkPassword.php", {"password": $(this).val()}, function(correctPassword){
        if(correctPassword != "" && correctOldPassword){
          $("input[name = 'config_oldPassword']").css({"border-color": "red"});
          $("#input_oldPassword").append("<p class='smallp' id='small_oldPassword'>Senha invalida!</p>");

          correctOldPassword = false;
        }

      });
    }
  }).on("keyup", function(){
    correctOldPassword = true;

    $("#small_oldPassword").remove();
    $("input[name = 'config_oldPassword']").removeAttr("style");
  });
});
