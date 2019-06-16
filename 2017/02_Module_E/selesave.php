<?php
  $db = mysqli_connect("localhost","admin","1234","2017e01");
  mysqli_query($db,"SET NAMES UTF8");
  $i = $_POST["json"];
  $title = $i["title"];
  $one = $i["one"];
  $oneimg = $i["oneimg"];
  $two = $i["two"];
  $twoimg = $i["twoimg"];
  $three = $i["three"]; 
  $threeimg = $i["threeimg"]; 
  $four = $i["four"];
  $fourimg = $i["fourimg"]; 
  $ans = $i["ans"]; 
  $mean = $i["mean"]; 
  mysqli_query($db,"INSERT INTO `select`(`title`, `one`, `oneimg`, `two`, `twoimg`, `three`, `threeimg`, `four`, `fourimg`, `type`, `ans`, `mean`) VALUES ('$title','$one','$oneimg','$two','$twoimg','$three','$threeimg','$four','$fourimg','閒置中','$ans','$mean')");