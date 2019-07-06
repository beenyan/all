<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/jquery-ui.css">
  <link rel="stylesheet" href="css/main.css">
  <title>登入</title>
</head>
<body>
  <div id="login-container">
    <form action="" class="login-form">
      <div>
        <label for="lg-account">帳號</label>
        <input type="text" id="lg-account" name="account">
      </div>
      <div>
        <label for="lg-password">密碼</label>
        <input type="password" id="lg-password" name="password">
      </div>
      <div class="captcha-container">
        <div class="cc-drop-box"></div>
        <div class="cc-drag-box"></div>
        <button type="button" class="cc-reset button">刷新驗證碼</button>
        <input type="hidden" name="captcha" id="lg-captcha">
      </div>
      <input type="submit" value="確定" class="button">
      <input type="reset" value="重置" class="button">
    </form>
    <a href="index.php" class="button">回首頁</a>
  </div>
  <script src="js/jquery-3.3.1.js"></script>
  <script src="js/jquery-ui.js"></script>
  <script src="js/main.js"></script>
  <script>
    captcha();
    $(".cc-reset").on('click', captcha);
  </script>
</body>
</html>