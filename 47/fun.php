<?php
  $db = mysqli_connect("localhost","admin","1234","47");
  mysqli_query($db,"SET NAMES UTF8");
  $c = $_GET["c"];
  if (!empty($_POST["object"])) $i = $_POST["object"];
  if ($c == 0){
    $mealid = $i["mealid"];
    $date = $i["date"];
    $time = $i["time"];
    $mealname = $i["mealname"];
    $mealnum = $i["mealnum"];
    $desk = $i["desk"];
    $tablenum = $i["tablenum"];
    $name = $i["name"];
    $phone = $i["phone"];
    $email = $i["email"];
    $mean = $i["mean"];
    $allmoney = $i["allmoney"];
    $deposit = $i["deposit"];
    mysqli_query($db,"INSERT INTO `meal`(`mealid`, `date`, `time`, `mealname`, `mealnum`, `desk`, `tablenum`, `name`, `phone`, `email`, `mean`, `allmoney`, `deposit`) VALUES ('$mealid','$date','$time','$mealname','$mealnum','$desk','$tablenum','$name','$phone','$email','$mean','$allmoney','$deposit')");
    echo $mealid;
  }
  else if ($c == 1){
    $date = $_POST["date"];
    $all = mysqli_query($db,"SELECT * FROM `meal` WHERE `date` LIKE '$date'");
    echo mysqli_num_rows($all);
  }
  else if ($c == 2){
    $first = $_POST["first"];
    $last = $_POST["last"];
    $all = mysqli_query($db,"SELECT * FROM `meal` WHERE `date` BETWEEN $first AND $last");
    while ($row = mysqli_fetch_array($all)){
      echo $row["tablenum"].";".$row["time"].";".$row["date"]."$()";
    };
  }