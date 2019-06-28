<?php
  $db = mysqli_connect("localhost","admin","1234","2016c01");
  mysqli_query($db,"SET NAMES UTF8");
  $c = $_GET["c"];
  if ($c == 0){
    $name = $_POST["name"];
    $time = $_POST["time"];
    $line = $_POST["line"];
    $difficult = $_POST["difficult"];
    mysqli_query($db,"INSERT INTO `rlsblock`(`name`, `line`, `time`, `difficult`) VALUES ('$name','$line','$time','$difficult')");
  }
  else if ($c == 1){
    $all = mysqli_query($db,"SELECT * FROM `rlsblock` WHERE `difficult` = 0 ORDER BY `rlsblock`.`line` DESC, `rlsblock`.`time` DESC, `rlsblock`.`id` ASC");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$(/)";
    };
    $row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `rlsblock` ORDER BY `id` DESC"));
    echo $row["id"];
  }
  else if ($c == 2){
    $all = mysqli_query($db,"SELECT * FROM `rlsblock` WHERE `difficult` = 1 ORDER BY `rlsblock`.`line` DESC, `rlsblock`.`time` DESC, `rlsblock`.`id` ASC");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$(/)";
    };
    $row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `rlsblock` ORDER BY `id` DESC"));
    echo $row["id"];
  }
  else if ($c == 3){
    $diff = $_POST["diff"];
    $row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `rlsblock` WHERE `difficult` = $diff ORDER BY `line` DESC"));
    echo $row["line"];
  }