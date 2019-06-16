<?php
  $db = mysqli_connect("localhost","admin","1234","2017e01");
  mysqli_query($db,"SET NAMES UTF8");
  $i = $_POST["object"];
  $title = $i["title"];
  $one = $i["one"];
  $two = $i["two"];
  $three = $i["three"]; 
  $four = $i["four"];
  $ans = $i["ans"]; 
  $mean = $i["mean"];
  $id = $i["id"];
  mysqli_query($db,"UPDATE `select` SET `title`='$title',`one`='$one',`two`='$two',`three`='$three',`four`='$four',`ans`='$ans',`mean`='$mean' WHERE `id` = $id");