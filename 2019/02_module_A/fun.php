<?php
  $db = mysqli_connect("localhost","admin","1234","2018c01");
  mysqli_query($db,"SET NAMES UTF8");
  //mysqli_query($db,"");
  $c = $_GET["c"];
  if ($c == 0){
    $js = $_POST["js"];
    $keys = [$js["time"],$js["lines"],$js["score"],$js["difficult"]];
    mysqli_query($db,"INSERT INTO `results`(`time`, `lines`, `score`, `difficult`) VALUES ('$keys[0]','$keys[1]','$keys[2]','$keys[3]')");
  }
  else if ($c == 1){
    $id = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `results` ORDER BY `results`.`id` DESC"))[0];
    $num = 0;
    $arr = array();
    $diff = $_POST["difficult"];
    $all = mysqli_query($db,"SELECT * FROM `results` WHERE `difficult` LIKE '$diff' ORDER BY `results`.`score` DESC, `results`.`lines` DESC, `results`.`time` DESC");
    while ($row = mysqli_fetch_array($all)){
      array_push($arr,$row);
    };
    $obj = [
      "results" => $arr,
      "current_id" => $id,
    ];
    echo json_encode($obj);
  };