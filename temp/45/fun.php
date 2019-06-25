<?php
  $db = mysqli_connect("localhost","admin","1234","45");
  mysqli_query($db,"SET NAMES UTF8");
  $c = $_GET["c"];
  if (!empty($_POST["object"])){
    $i = $_POST["object"];
  };
  if ($c == 0){
    $account = $_POST["account"];
    if ($row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `login` WHERE `account` LIKE '$account'"))){
      if ($row["point"] == "" || $row["ans"] == ""){
        echo "此帳號沒有密碼提示";
      }
      else {
        echo "$row[3];$row[4]";
      }
    }
    else echo "無此帳號";
  }
  else if ($c == 1){
    $all = mysqli_query($db,"SELECT * FROM `login`");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$(/)";
    };
  }
  else if ($c == 2){
    $account = $i["account"];
    $password = $i["password"];
    $point = $i["point"];
    $ans = $i["ans"];
    mysqli_query($db,"INSERT INTO `login`(`account`, `password`, `point`, `ans`) VALUES ('$account','$password','$point','$ans')");
  }
  else if ($c == 3){
    $id = $i["id"];
    $account = $i["account"];
    $password = $i["password"];
    $point = $i["point"];
    $ans = $i["ans"];
    mysqli_query($db,"UPDATE `login` SET `account`='$account',`password`='$password',`point`='$point',`ans`='$ans' WHERE `id` = $id");
  }
  else if ($c == 4){
    $id = $_POST["id"];
    mysqli_query($db,"DELETE FROM `login` WHERE `id` = $id");
  }
  else if ($c == 5){
    $all = mysqli_query($db,"SELECT * FROM `floor`");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$(/)";
    };
  }
  else if ($c == 6){
    $name = $_POST["name"];
    mysqli_query($db,"INSERT INTO `floor`(`name`) VALUES ('$name')");
  }