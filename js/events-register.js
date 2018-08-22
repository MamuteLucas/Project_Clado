var correctPassword = true,
    correctEmail = true,
    errorInputNull = false,
    correctName = true;

function submitCad(){
  var name = $("input[name = 'reg_name']").val(),
      email = $("input[name = 'reg_email']").val(),
      password = $("input[name = 'reg_password']").val(),
      confirmPassword = $("input[name = 'reg_confirmPassword']").val();

  if(name != "" && email != "" && password != "" && confirmPassword != ""){
    if(correctPassword && correctEmail && correctName){
      $("form").attr({"onsubmit": "return true", "action": "php/createAccount.php"});

    }
  } else if(!errorInputNull){
    $("#small_password").remove();
    $("#div_confirmPassword").append("<small id='small_errorRegister'>Preencha os campos restantes!</small>");
    errorInputNull = true;
  }
}

function checkPassword(fPassword, sPassword){
  if(sPassword != "" && fPassword != sPassword && correctPassword){
    $("input[name = 'reg_confirmPassword']").css({border: "1px solid red"});
    $("#div_confirmPassword").append("<small id='small_password'>As senhas são diferentes!</small>");
    correctPassword = false;

    if(errorInputNull){
      errorInputNull = false;
      $("#small_errorRegister").remove();
    }

  } else if(sPassword == fPassword){
    correctPassword = true;
    $("#small_password").remove();
    $("input[name = 'reg_confirmPassword']").removeAttr("style");
  }
}

$(function(){
  $("input[name = 'reg_name']").on("keyup", function(){
    var name = $(this).val();

    if(name.search(/[^a-z ]/i) != -1 && correctName){
      $("#div_name").append("<small id='small_name'>Nome inválido!</small>");
      correctName = false;
    } else if(name.search(/[^a-z ]/i) == -1 && !correctName){
      correctName = true;
      $("#small_name").remove();

    }

  });

  $("input[name = 'reg_confirmPassword']").on("keyup", function(){
    var firstPassword = $("input[name = 'reg_password']").val();
        secondPassword = $(this).val();

    checkPassword(firstPassword, secondPassword);
  });

  $("input[name = 'reg_password']").on("keyup", function(){
    var firstPassword = $(this).val();
        secondPassword = $("input[name = 'reg_confirmPassword']").val();

    checkPassword(firstPassword, secondPassword);
  });

  $("input[name = 'reg_email']").on("blur", function(){
    if($(this).val() != ""){
      $.post("php/checkEmail.php", {"email": $(this).val()}, function(existingEmail){
        if(existingEmail != "" && correctEmail){
          $("input[name = 'reg_email']").css({"border-color": "red"});
          $("#div_confirmEmail").append("<small id='small_email'>E-mail já cadastrado!</small>");

          correctEmail = false;
        }
      });
    }
  }).on("keyup", function(){
    correctEmail = true;

    $("#small_email").remove();
    $("input[name = 'reg_email']").removeAttr("style");
  });
});
