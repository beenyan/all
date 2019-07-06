<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/jquery-ui.css">
  <link rel="stylesheet" href="css/main.css">
  <title>首頁</title>
</head>
<body>
  <div class="main">
    <p class="permission-text"></p>
    <ul class="main-li">
      <li><a href="" class="button"></a></li>
      <li><a href="outsideisgarbage/calendar.php" class="button">日工作計劃表</a></li>
    </ul>
  </div>
  <script src="js/jquery-3.3.1.js"></script>
  <script src="js/jquery-ui.js"></script>
  <script src="js/main.js"></script>
  <script>
    Ajx('login', 'isLogin').done(function (data) {
      data = JSON.parse(data);
      if(data) {
        if(data.permission > 1) {
          let btn = $("<li>");
          btn.append($("<a>").attr('href', 'manager.php').text("後臺管理系統").button());
          $(".main-li > li:eq(0)").after(btn);
          $(".permission-text").text("管理者專區");
        } else {
          $(".permission-text").text("一般會員專區");
        }
        $(".main-li > li:eq(0) > a").attr('href', 'logout.php').text("登出");
      } else {
        $(".main-li > li:eq(0) > a").attr('href', 'login.php').text("登入");
      }
    });
  </script>
</body>
</html>