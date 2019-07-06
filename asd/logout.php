<?php
  session_start();
  file_put_contents('record.ini', file_get_contents('record.ini').$_SESSION['user']['account'].'於'.date('Y/m/d H:i:s')."登出成功!\r\n");
  session_destroy();
  header('Location: index.php');
