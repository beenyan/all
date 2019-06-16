<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="js/jquery-3.4.1.js"></script>
  <link rel="stylesheet" href="js/jquery-ui.css">
  <script src="js/jquery-ui.js"></script>
  <link rel="stylesheet" src="js/jquery-ui.min.css">
  <script src="js/jquery-ui.min.js"></script>
  <link rel="stylesheet" href="main.css">
  <title>互動考試</title>
</head>

<body>
  <div id="background">
    <div id="loginf">
      <input type="button" value="學生登入" class="loginb button" id="loginbA">
      <input type="button" value="老師登入" class="loginb button" id="loginbB">
    </div>
    <div id="dialog0" class="dialog">
      <h3>學生登入</h3>
      <hr style="border-color: blue;margin: 0 0 40px 0">
      <strong>使用者代號：</strong><input type="text" class="value" maxlength="12" id="number"><br><br>
      <strong>試卷編號：<select class="dialog0"></select><br><br>
      <input type="button" value="login" class="button" style="font-size: 200%" id="loginA">
      <h1 class="miss" style="display:none;color: red">登入成功</h1>
    </div>
    <div id="dialog1" class="dialog">
      <h3>老師登入</h3>
      <hr style="border-color: blue;margin: 0 0 40px 0">
      <strong>帳號：</strong><input type="text" class="value" maxlength="15" id="account"><br><br>
      <strong>密碼：</strong><input type="text" class="value" maxlength="15" id="password"><br><br>
      <input type="button" value="login" class="button" style="font-size: 200%" id="loginB">
      <h1 class="miss" style="color: red"></h1>
    </div>
  </div>
</body>
<script>
  $(".dialog").dialog({
    width:800,
    height:700,
    resizable:false,
    autoOpen:false,
  });
  $("#loginbA").click(function(){
    $("#dialog0").dialog("open");
    $(".dialog0:eq(0)").empty();
    $.post({
      async:false,
      url : "fun.php?call=17",
      success : function(e){
        let list = e.split(",");
        list.pop();
        for (let i = 0 ; i < list.length ; i++){
          $(".dialog0:eq(0)").append(`
            <option value="${list[i]}">${list[i]}</option>
          `)
        };
      },
    });
  });
  $("#loginbB").click(function(){
    $("#dialog1").dialog("open");
  });
  $("#loginA").click(function(){
    if ($("#number").val() == ""){
      return false;
    }
    else{
      $.post({
        async:false,
        url : "fun.php?call=18",
        data : {id :$(".dialog0 :selected").val(),name:$("#number").val()},
        success:function(e){
          if (e == "cant"){
            alert("此考卷證在考試");
            return false;
          }
          location.href="st.php?id=" + $(".dialog0 :selected").val();
        },
      });
    }
  });
  $("#loginB").click(function(){
    $("#dialog1").find(".value").each(function(){
      if ($(this).val() == ""){
        $(this).css("border","2px inset rgb(255, 0, 0)");
      }
      else {
        $(this).css("border","2px inset rgb(0, 0, 0)");
      };
    });
    if ($("#account").val() == "" || $("#password").val() == ""){
      return false;
    };
    let json = {
      name : $("#account").val(),
      password : $("#password").val()
    };
    $.post({
      async : false,
      url : "tcck.php",
      data : {json:json},
      success:function(e){
        $(".miss").fadeIn(1);
        $(".miss").html(e);
        $(".miss").fadeOut(1500);
        if (e == "成功登入"){
          location.href="tc.php";
        };
      },
    });
  });
</script>
<script src="js/main.js"></script>
<script src="js/function.js"></script>
</html>