<?php
  session_start();
  $im = imagecreate(80,30);
  $bgc = imagecolorallocate($im , 0 , 0 , 0); //Manual - PHP
  $cc = imagecolorallocate ($im , 255 ,255,255 );
  $x = "0123456789";
  $_SESSION["word"]=$x[rand(0,9)].$x[rand(0,9)].$x[rand(0,9)].$x[rand(0,9)];
  imagestring($im,100,20,5,$_SESSION["word"],$cc);
  imagepng($im);
