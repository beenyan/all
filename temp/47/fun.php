<?php
  $db = mysqli_connect("localhost","admin","1234","temp");
  mysqli_query($db,"SET NAMES UTF8");
  $c = $_GET["c"];
  if ($c == 0){
    $src = $_POST["src"];
    mysqli_query($db,"INSERT INTO `47`(`img`) VALUES ('$src')");
  }
  else if ($c == 1){
    $all = mysqli_query($db,"SELECT * FROM `47`");
    while ($row = mysqli_fetch_array($all)){
      echo $row["img"]."$(())";
    };
  }
  else if ($c == 2){
    $im=imagecreate(60,20);
    $bg=imagecolorallocate($im,255,255,0);
    $txt=imagecolorallocate($im,255,0,255);
    imagestring($im,20,0,0,"111",$txt);
    imagepng($im);
  }