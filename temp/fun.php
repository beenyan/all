<?php
  $db = mysqli_connect("localhost","admin","1234","temp");
  mysqli_query($db,"SET NAMES UTF8");
  $c = $_GET["c"];
  if ($c == 0){
    $i = $_POST["object"];
    $name = $i["name"];
    $mean = $i["mean"];
    $date = $i["date"];
    $money = $i["money"];
    $loca = $i["loca"];
    $image = $i["image"];
    $type = $i["type"];
    mysqli_query($db,"INSERT INTO `power`(`name`, `mean`, `date`, `money`, `loca`, `image`, `type`) VALUES ('$name','$mean','$date','$money','$loca','$image','$type')");
  }
  else if ($c == 1){
    $wh = $_POST["wh"];
    $val = $_POST["val"];
    $all = mysqli_query($db,"SELECT * FROM `power` WHERE `$wh` LIKE '%$val%'");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$(*/)";
    };
  }
  else if ($c == 2){
    $min = $_POST["min"];
    $max = $_POST["max"];
    $all = mysqli_query($db,"SELECT * FROM `power` WHERE `money` BETWEEN $min AND $max");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$(*/)";
    };
  }
  else if ($c == 3){
    $i = $_POST["object"];
    $name = $i["name"];
    $mean = $i["mean"];
    $money = $i["money"];
    $loca = $i["loca"];
    $id  = $i["id"];
    mysqli_query($db,"UPDATE `power` SET `name`='$name',`mean`='$mean',`money`='$money',`loca`='$loca' WHERE `id` = $id");
  }
?>