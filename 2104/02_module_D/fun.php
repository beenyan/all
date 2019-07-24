<?php
  /*$fw = fopen("login.txt","w");
  $write = "";
  for ($i = 0 ; $i < 80 ; $i++){
    $write = $write."r00".$i.",".rand(15,75).",".rand(0,1).",".rand(0,5).",".rand(0,3).",".rand(150,190).",".rand(40,150).",".rand(0,6).",".rand(40,600).","."20".rand(10,16)."/".rand(1,12)."/".rand(1,30).",".rand(0,4).",".rand(1000,99999)."\n";
  }
  fwrite($fw,$write);*/
  $db = mysqli_connect("localhost","admin","1234","2014d01");
  mysqli_query($db,"SET NAMES UTF8");
  $c = $_GET["c"];
  if (!empty($_POST["object"])) $i = $_POST["object"];
  if ($c == 0){
    mysqli_query($db,"DELETE FROM `login`");
    mysqli_query($db,"ALTER TABLE `login` auto_increment = 1");
  }
  else if ($c == 1){
    $arr = $_POST["arr"];
    mysqli_query($db,"INSERT INTO `login`(`name`, `year`, `sex`, `learn`, `home`, `height`, `weight`, `item`, `km`, `date`, `pleasure`, `money`) VALUES ('$arr[0]','$arr[1]','$arr[2]','$arr[3]','$arr[4]','$arr[5]','$arr[6]','$arr[7]','$arr[8]','$arr[9]','$arr[10]','$arr[11]')");
  }
  else if ($c == 2){
    $all = mysqli_query($db,"SELECT * FROM `login`");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$()";
    }
  }
  else if ($c == 3){
    $id = $_POST["id"];
    mysqli_query($db,"DELETE FROM `login` WHERE `id` = $id");
  }
  else if ($c == 4){
    $mean = $_POST["mean"];
    $all = mysqli_query($db,"SELECT * FROM `login` WHERE `name` LIKE '%$mean%' OR  `learn` LIKE '%$mean%' OR `sex` LIKE '%$mean%' OR `home` LIKE '%$mean%'");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$()";
    }
  }
  else if ($c == 5){
    $wh = $_POST["wh"];
    $all = mysqli_query($db,"SELECT * FROM `login`");
    while ($row = mysqli_fetch_array($all)){
      echo $row[$wh].";";
    }
  }
  else if ($c == 6){
    $wh = $_POST["wh"];
  }
  else if ($c == 7){
  }