<?php
  session_start();
  $db=mysqli_connect("localhost","admin","1234","temp");
  mysqli_query($db,"SET NAMES UTF8");
  if (!empty($_POST["object"])){
    $i = $_POST["object"];
  }
  $call = $_GET["call"];
  if ($call == 1){
    $all = mysqli_query($db,"SELECT * FROM `login`");
    while ($row=mysqli_fetch_array($all)){
      echo json_encode($row)."$(*/)"; //陣列轉字串
    };
  }
  else if ($call == 2){
    $account = $i["account"];
    $name = $i["name"];
    $password = $i["password"];
    $do = $i["do"];
    mysqli_query($db,"INSERT INTO `login`(`account`, `name`, `password`, `do`) VALUES ('$account','$name','$password','$do')");
  }
  else if ($call == 3){
    $account = $i["account"];
    $name = $i["name"];
    $password = $i["password"];
    $do = $i["do"];
    $id = $i["id"];
    $row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `login` WHERE `id` = $id"));
    if ($row["do"]>2){
      return false;
    }
    mysqli_query($db,"UPDATE `login` SET `account`='$account',`name`='$name',`password`='$password',`do`='$do' WHERE `id` = $id");
  }
  else if ($call == 4){
    $id = $_POST["id"];
    $row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `login` WHERE `id` = $id"));
    if ($row["do"]>2){
      return false;
    }
    mysqli_query($db,"DELETE FROM `login`WHERE `id` = $id");
  }
  else if ($call == 5){
    $account = $_POST["account"];
    $all = mysqli_query($db,"SELECT * FROM `login` WHERE `account` LIKE '%$account%'");
    while ($row=mysqli_fetch_array($all)){
      echo json_encode($row)."$(*/)"; //陣列轉字串
    };
  }
  else if ($call == 6){
    $all = mysqli_query($db,"SELECT * FROM `log`");
    while ($row=mysqli_fetch_array($all)){
      echo json_encode($row)."$(*/)"; //陣列轉字串
    };
  }
  else if ($call == 7){
    $row=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `log` ORDER BY `log`.`id` DESC"));
    $date = date("Y/m/d h:i:sa");
    mysqli_query($db,"INSERT INTO `log`(`name`, `time`, `do`, `success`) VALUES ('$row[0]','$date','登出','成功');");
  }
  else if ($call == 8){
    $nn = "";
    $mm = "";
    $sort= $_POST["sort"];
    $account = $_POST["account"];
    if ($sort == 10){
      $nn = "id";
      $mm = "ASC";
    }
    else if ($sort == 11){
      $nn = "id";
      $mm = "DESC";
    }
    else if ($sort == 20){
      $nn = "account";
      $mm = "ASC";
    }
    else if ($sort == 21){
      $nn = "account";
      $mm = "DESC";
    }
    else if ($sort == 30){
      $nn = "name";
      $mm = "ASC";
    }
    else if ($sort == 31){
      $nn = "name";
      $mm = "DESC";
    }
    else if ($sort == 40){
      $nn = "password";
      $mm = "ASC";
    }
    else if ($sort == 41){
      $nn = "password";
      $mm = "DESC";
    }
    else if ($sort == 50){
      $nn = "do";
      $mm = "ASC";
    }
    else if ($sort == 51){
      $nn = "do";
      $mm = "DESC";
    }
    $all = mysqli_query($db,"SELECT * FROM `login` WHERE `account` LIKE '%$account%' ORDER BY `$nn` $mm");
    while ($row = mysqli_fetch_array($all)){
      echo json_encode($row)."$(*/)"; //陣列轉字串
    };
  }