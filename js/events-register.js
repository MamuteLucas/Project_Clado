var correctPassword = true;
var correctEmail = true;

function submitCad(){
  var password = $("input[name = 'reg_password']").val(),
      confirmPassword = $("input[name = 'reg_confirmPassword']").val();

  if(correctPassword && correctEmail){
    $("form").attr({"onsubmit": "return true", "action": "php/createAccount.php"});

  }
}

function checkPassword(fPassword, sPassword){
  if(sPassword != "" && fPassword != sPassword && correctPassword){
    $("input[name = 'reg_confirmPassword']").css({border: "1px solid red", margin: "0.8rem 0 0.2rem 0"});
    $("#form_inputButton").css("margin", "0.28rem 0 0.8rem 0");
    $("#div_confirmPassword").append("<small id='small_senha'>As senhas são diferentes!</small>");
    correctPassword = false;

  } else if(sPassword == fPassword){
    correctPassword = true;
    $("#small_senha").remove();
    $("input[name = 'reg_confirmPassword']").removeAttr("style");
    $("#form_inputButton").removeAttr("style");
  }
}

$(function(){
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
          $("input[name = 'reg_email']").css({"border-color": "red", margin: "0.8rem 0 0.2rem 0"});
          $("input[name = 'reg_password']").css("margin", "0.28rem 0 0.8rem 0");
          $("#div_confirmEmail").append("<small id='small_email'>E-mail já cadastrado!</small>");

          correctEmail = false;
        }
      });
    }
  }).on("keyup", function(){
    correctEmail = true;

    $("#small_email").remove();
    $("input[name = 'reg_email']").removeAttr("style");
    $("input[name = 'reg_password']").removeAttr("style");
  });
});
