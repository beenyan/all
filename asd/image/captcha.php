<?php
  session_start();
  header("content-type: image/png");
  define('DIC', '23456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz'); // 57
  $img = imagecreate(35, 35);
  imagecolorallocate($img, 255, 255, 255);
  $_SESSION['captcha'][$_GET['index'] ?? -1] = DIC[mt_rand(0, 56)];
  imagestring($img, 5, 13, 10, $_SESSION['captcha'][$_GET['index'] ?? -1], imagecolorallocate($img, 0, 0, 0));
  imagepng($img);
  imagedestroy($img);
