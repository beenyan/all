<?php 
  $db = mysqli_connect("localhost","admin","1234","temp");
  mysqli_query($db,"SET NAMES UTF8");
  $c = $_GET["c"];
  if (!empty($_POST["object"])) $i = $_POST["object"];
  if ($c == 0){
    $title = $i["title"];
    $mean = $i["mean"];
    $a0 = $i["a0"];
    $a1 = $i["a1"];
    $start = $i["start"];
    $end = $i["end"];
    mysqli_query($db,"INSERT INTO `temp`(`title`, `mean`, `a0`, `a1`, `start`, `end`) VALUES ('$title','$mean','$a0','$a1','$start','$end')");
  }
  else if ($c == 1){
    $all = mysqli_query($db,"SELECT * FROM `temp`");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$()";
    };
  }
  else if ($c == 2){
    $start = $_POST["start"];
    $end = $_POST["end"];
    $id = $_POST["id"];
    $left = $_POST["left"];
    mysqli_query($db,"UPDATE `temp` SET `start`='$start',`end`='$end',`offleft`='$left' WHERE `id` = $id");
  }
  else if ($c == 3){
    $id = $_POST["id"];
    $row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `temp` WHERE `id` = $id"));
    echo $row[1].";".$row[2];
  }
  else if ($c == 4){
    $title = $i["title"];
    $mean = $i["mean"];
    $a0 = $i["a0"];
    $a1 = $i["a1"];
    $start = $i["start"];
    $end = $i["end"];
    $id = $i["id"];
    mysqli_query($db,"UPDATE `temp` SET `title`='$title',`mean`='$mean',`a0`='$a0',`a1`='$a1',`start`='$start',`end`='$end' WHERE `id` = $id");
  }
  else if ($c == 5){
    $id = $_POST["id"];
    mysqli_query($db,"DELETE FROM `temp` WHERE `id` = $id");
  }