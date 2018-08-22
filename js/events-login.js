var correctInfo = true;

function submitLogin(){
  var email = $("input[name = 'login_email']").val(),
      password = $("input[name = 'login_password']").val();

  $.post("php/doLogin.php", {"email": email, "password": password}, function(numRows){
    if(numRows == 1){
      window.location = "home.php";
    } else if(numRows == 0 && correctInfo){
      correctInfo = false;
      $("#div_confirmPassword").append("<small id='small_login'>E-mail ou senha incorretos!</small>");
    }
  });
}
