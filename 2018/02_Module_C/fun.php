
<?php
  $db = mysqli_connect("localhost","admin","1234","2018c01");
  mysqli_query($db,"SET NAMES UTF8");
  $c = $_GET["c"];
  if ($c == 0){
    $name = $_POST["name"];
    $time = $_POST["time"];
    $score = $_POST["score"];
    mysqli_query($db,"INSERT INTO `shootgame`(`name`, `time`, `score`) VALUES ('$name','$time','$score')");
  }
  else if ($c == 1){
    $cc = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `shootgame` ORDER BY `shootgame`.`id` DESC"))[0];
    $all = mysqli_query($db,"SELECT * FROM `shootgame` ORDER BY `shootgame`.`score` DESC, `shootgame`.`time` DESC");
    $arr = array();
    $i = 1;
    $val = 0;
    while ($row = mysqli_fetch_array($all)){
      if (!empty($object)){
        if ($row[3] != $object["score"] || $row[2] != $object["time"]){
          $i++;
        }
      }
      if ($row[0] == $cc){
        $val = 1;
      }
      else {
        $val = 0;
      }
      $object = [
        'id' => $i,
        'name' => $row[1],
        'time' => $row[2],
        'score' => $row[3],
        'val' => $val,
      ];
      array_push($arr,$object);
    };
    echo json_encode($arr);
  }