<?php
  $db = mysqli_connect("localhost","admin","1234","2015d01");
  mysqli_query($db,"SET NAMES UTF8");
  $c = $_GET["c"];
  if (!empty($_POST["object"])) $i = $_POST["object"];
  if ($c == 0){
    $account = $i["account"];
    $password = $i["password"];
    $name = $i["name"];
    $body = $i["body"];
    if ($row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `log_up` WHERE `account` LIKE '$account'"))){
      echo 1;
      return false;
    };
    mysqli_query($db,"INSERT INTO `log_up`(`account`, `password`, `name`, `body`, `do`) VALUES ('$account','$password','$name','$body','1')");
  }
  else if ($c == 1){
    $account = $_POST["account"];
    $password = $_POST["password"];
    if ($row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `log_up` WHERE `account` LIKE '$account'"))){
      if ($row[2] == $password){
        if ($row["do"] == 2){
          echo 3;
        }
        else{
          echo 4;
        }
      }
      else{
        echo 2;
      }
    }
    else {
      echo 1;
    };
  }
  else if ($c == 2){
    $name = $i["name"];
    $writer = $i["writer"];
    $mean = $i["mean"];
    $type = $i["type"];
    $date = $i["date"];
    $img = $i["img"];
    $total = $i["total"]; 
    if ($row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `book` WHERE `name` LIKE '$name'"))){
      echo 1;
      return false;
    };
    mysqli_query($db,"INSERT INTO `book`(`img`, `name`, `writer`, `mean`, `style`, `date`, `total`) VALUES ('$img','$name','$writer','$mean','$type','$date','$total')");
  }
  else if ($c == 3){
    $all = mysqli_query($db,"SELECT * FROM `book`");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$(/)";
    };
  }
  else if ($c == 4){
    $all = mysqli_query($db,"SELECT * FROM `sele`");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$(/)";
    };
  }
  else if ($c == 5){
    $wh = $_POST["wh"];
    $val = $_POST["val"];
    $all = mysqli_query($db,"SELECT * FROM `book` WHERE `$wh` LIKE '%$val%'");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$(/)";
    };
  }
  else if ($c == 6){
    $wh = $_POST["wh"];
    $min = $_POST["min"];
    $max = $_POST["max"];
    $all = mysqli_query($db,"SELECT * FROM `book` WHERE `date` BETWEEN $min AND $max");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$(/)";
    };
  }
  else if ($c == 7){
    $account = $_POST["account"];
    $id = $_POST["id"];
    $date = $_POST["date"];
    //此書已借閱
    if ($row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `take_book` WHERE `people` LIKE '$account' AND `bookid` = $id AND `type` = 0"))){
      echo "此書你已借閱;0";
      return false;
    };
    //借閱數超過3本
    $all = mysqli_query($db,"SELECT * FROM `take_book` WHERE `people` LIKE '$account' AND `type` = 0");
    if (mysqli_num_rows($all) >= 3){
      echo "借閱數超過3本;0";
      return false;
    };
    //此書已無庫存
    $all = mysqli_query($db,"SELECT * FROM `take_book` WHERE `type` = 0 AND `bookid` = $id");
    $num = mysqli_num_rows($all);
    $bookhave = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `book` WHERE `id` = $id"))["total"];
    if ($num == $bookhave){
      echo "此書已無庫存;0";
      return false;
    };
    //成功借閱
    mysqli_query($db,"INSERT INTO `take_book`(`bookid`, `date`, `type`,`people`) VALUES ('$id','$date',0,'$account')");
    echo "借閱成功。;1";
  }
  else if ($c == 8){
    $account = $_POST["account"];
    $all = mysqli_query($db,"SELECT * FROM `take_book` WHERE `people` LIKE '$account' ORDER BY `type` ASC, `date` DESC");
    while ($row = mysqli_fetch_array($all)){
      $row[1] = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `book` WHERE `id` = $row[1]"))[2];
      echo json_encode($row)."$(/)";
    };
  }
  else if ($c == 9){
    $id = $_POST["id"];
    mysqli_query($db,"UPDATE `take_book` SET `type`='1' WHERE `id` = $id");
  }